Ext.ns("HolidayRecordView");var HolidayRecordView=function(){return new Ext.Panel({id:"HolidayRecordView",title:"假期设置列表",iconCls:"menu-holidayRecord",layout:"border",region:"center",autoScroll:true,keys:{key:Ext.EventObject.ENTER,fn:function(){HolidayRecordView.search();},scope:this},items:[new Ext.FormPanel({id:"HolidayRecordSearchForm",region:"north",height:40,frame:false,border:false,layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label",margins:{top:0,right:4,bottom:4,left:4}},items:[{text:"请输入查询条件:"},{text:"开始日期"},{xtype:"datefield",name:"Q_startTime_D_GT",format:"Y-m-d",editable:false},{text:"结束日期"},{xtype:"datefield",name:"Q_endTime_S_LK",format:"Y-m-d",editable:false},{text:"所属用户"},{xtype:"textfield",readOnly:true,name:"HD_fullname",id:"HD_fullname",width:80},{xtype:"button",text:"选择",iconCls:"btn-select",width:50,handler:function(){UserSelector.getView(function(h,g){var e=Ext.getCmp("Q_userId_L_EQ");var f=Ext.getCmp("HD_fullname").setValue(g);e.setValue(h);},true).show();}},{text:"全公司假期"},{xtype:"textfield",name:"Q_isAll_SN_EQ",xtype:"checkbox",inputValue:"1"},{xtype:"button",text:"查询",iconCls:"search",handler:function(){HolidayRecordView.search();}},{xtype:"button",text:"清空",iconCls:"reset",handler:function(){var b=Ext.getCmp("HolidayRecordSearchForm");b.getForm().reset();}},{xtype:"hidden",name:"Q_userId_L_EQ",id:"Q_userId_L_EQ"}]}),this.setup()]});};HolidayRecordView.prototype.setup=function(){return this.grid();};HolidayRecordView.prototype.grid=function(){var g=new Ext.grid.CheckboxSelectionModel();var f=new Ext.grid.ColumnModel({columns:[g,new Ext.grid.RowNumberer(),{header:"recordId",dataIndex:"recordId",hidden:true},{header:"开始日期",dataIndex:"startTime"},{header:"结束日期",dataIndex:"endTime"},{header:"所属用户",dataIndex:"fullname"},{header:"全公司假期",dataIndex:"isAll",renderer:function(a){if(a==1){return"是";}else{return"否";}}},{header:"管理",dataIndex:"recordId",width:50,sortable:false,renderer:function(d,l,n,a,m){var b=n.data.recordId;var c="";if(isGranted("_HolidayRecordDel")){c='<button title="删除" value=" " class="btn-del" onclick="HolidayRecordView.remove('+b+')">&nbsp;</button>';}if(isGranted("_HolidayRecordEdit")){c+='&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="HolidayRecordView.edit('+b+')">&nbsp;</button>';}return c;}}],defaults:{sortable:true,menuDisabled:true,width:100}});var e=this.store();e.load({params:{start:0,limit:25}});var h=new Ext.grid.GridPanel({id:"HolidayRecordGrid",tbar:this.topbar(),store:e,trackMouseOver:true,disableSelection:false,loadMask:true,region:"center",cm:f,sm:g,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},bbar:new HT.PagingBar({store:e})});h.addListener("rowdblclick",function(b,c,a){b.getSelectionModel().each(function(d){if(isGranted("_HolidayRecordEdit")){HolidayRecordView.edit(d.data.recordId);}});});return h;};HolidayRecordView.prototype.store=function(){var b=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/personal/listHolidayRecord.do"}),reader:new Ext.data.JsonReader({root:"result",totalProperty:"totalCounts",id:"id",fields:[{name:"recordId",type:"int"},"fullname","startTime","endTime","userId","isAll"]}),remoteSort:true});b.setDefaultSort("recordId","desc");return b;};HolidayRecordView.prototype.topbar=function(){var b=new Ext.Toolbar({id:"HolidayRecordFootBar",height:30,bodyStyle:"text-align:left",items:[]});if(isGranted("_HolidayRecordAdd")){b.add(new Ext.Button({iconCls:"btn-add",text:"添加假期设置",handler:function(){new HolidayRecordForm();}}));}if(isGranted("_HolidayRecordDel")){b.add(new Ext.Button({iconCls:"btn-del",text:"删除假期设置",handler:function(){var g=Ext.getCmp("HolidayRecordGrid");var a=g.getSelectionModel().getSelections();if(a.length==0){Ext.ux.Toast.msg("信息","请选择要删除的记录！");return;}var f=Array();for(var h=0;h<a.length;h++){f.push(a[h].data.recordId);}HolidayRecordView.remove(f);}}));}return b;};HolidayRecordView.remove=function(c){var d=Ext.getCmp("HolidayRecordGrid");Ext.Msg.confirm("信息确认","您确认要删除该记录吗？",function(a){if(a=="yes"){Ext.Ajax.request({url:__ctxPath+"/personal/multiDelHolidayRecord.do",params:{ids:c},method:"post",success:function(){Ext.ux.Toast.msg("信息提示","成功删除所选记录！");d.getStore().reload({params:{start:0,limit:25}});}});}});};HolidayRecordView.edit=function(b){new HolidayRecordForm(b);};HolidayRecordView.search=function(){var d=Ext.getCmp("HolidayRecordSearchForm");var c=Ext.getCmp("HolidayRecordGrid");if(d.getForm().isValid()){$search({searchPanel:d,gridPanel:c});}};