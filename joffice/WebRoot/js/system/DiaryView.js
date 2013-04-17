Ext.ns("DiaryView");var DiaryView=function(){return new Ext.Panel({id:"DiaryView",title:"我的日志列表",iconCls:"menu-diary",layout:"border",region:"center",autoScroll:true,items:[new Ext.FormPanel({region:"north",height:40,id:"DiarySearchForm",frame:false,border:false,layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label",margins:{top:0,right:4,bottom:4,left:4}},items:[{text:"请输入查询条件:"},{text:"日期从："},{xtype:"datefield",fieldLabel:"日期从：",format:"Y-m-d",width:90,name:"Q_dayTime_D_GE"},{text:"到"},{xtype:"datefield",format:"Y-m-d",width:90,name:"Q_dayTime_D_LE"},{text:"关键字"},{xtype:"textfield",width:100,name:"Q_content_S_LK"},{text:"日志类型"},{xtype:"combo",width:90,hiddenName:"Q_diaryType_SN_EQ",mode:"local",editable:false,triggerAction:"all",store:[["0","个人日志"],["1","工作日志"]]},{xtype:"button",text:"查询",iconCls:"search",handler:function(){var d=Ext.getCmp("DiarySearchForm");var c=Ext.getCmp("DiaryGrid");if(d.getForm().isValid()){$search({searchPanel:d,gridPanel:c});}}},{xtype:"button",text:"重置",iconCls:"search",handler:function(){var b=Ext.getCmp("DiarySearchForm");b.getForm().reset();}}]}),this.setup()]});};DiaryView.prototype.setup=function(){return this.grid();};DiaryView.prototype.grid=function(){var g=new Ext.grid.CheckboxSelectionModel();var f=new Ext.grid.ColumnModel({columns:[g,new Ext.grid.RowNumberer(),{header:"diaryId",dataIndex:"diaryId",hidden:true},{header:"日期",dataIndex:"dayTime"},{header:"日志类型",dataIndex:"diaryType",renderer:function(a){return a=="0"?"个人日志":"工作日志";}},{header:"日志内容",dataIndex:"content",renderer:function(a){return a.substring(0,20);}},{header:"管理",dataIndex:"diaryId",width:100,renderer:function(d,l,n,a,m){var b=n.data.diaryId;var c='<button title="删除" value=" " class="btn-del" onclick="DiaryView.remove('+b+')">&nbsp;</button>';c+='<button title="编辑" value=" " class="btn-edit" onclick="DiaryView.edit('+b+')"></button>';return c;}}],defaults:{sortable:true,menuDisabled:false,width:100}});var e=this.store();e.load({params:{start:0,limit:10}});var h=new Ext.grid.GridPanel({id:"DiaryGrid",tbar:this.topbar(),store:e,trackMouseOver:true,disableSelection:false,loadMask:true,region:"center",cm:f,sm:g,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},bbar:new HT.PagingBar({store:e})});h.addListener("rowdblclick",function(b,c,a){b.getSelectionModel().each(function(d){DiaryView.edit(d.data.diaryId);});});return h;};DiaryView.prototype.store=function(){var b=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/system/listDiary.do"}),reader:new Ext.data.JsonReader({root:"result",totalProperty:"totalCounts",id:"id",fields:[{name:"diaryId",type:"int"},"dayTime","content","diaryType"]}),remoteSort:true});b.setDefaultSort("diaryId","desc");return b;};DiaryView.prototype.topbar=function(){var b=new Ext.Toolbar({id:"DiaryFootBar",height:30,bodyStyle:"text-align:left",items:[{iconCls:"btn-add",text:"添加日志",xtype:"button",handler:function(){var a=Ext.getCmp("DiaryForm");new DiaryForm();}},{iconCls:"btn-del",text:"删除日志",xtype:"button",handler:function(){var g=Ext.getCmp("DiaryGrid");var a=g.getSelectionModel().getSelections();if(a.length==0){Ext.ux.Toast.msg("信息","请选择要删除的记录！");return;}var f=Array();for(var h=0;h<a.length;h++){f.push(a[h].data.diaryId);}DiaryView.remove(f);}}]});return b;};DiaryView.remove=function(c){var d=Ext.getCmp("DiaryGrid");Ext.Msg.confirm("信息确认","您确认要删除该记录吗？",function(a){if(a=="yes"){Ext.Ajax.request({url:__ctxPath+"/system/multiDelDiary.do",params:{ids:c},method:"post",success:function(){Ext.ux.Toast.msg("信息提示","成功删除所选记录！");d.getStore().reload({params:{start:0,limit:10}});}});}});};DiaryView.edit=function(b){new DiaryForm(b);};