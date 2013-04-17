Ext.ns("DepreTypeView");DepreTypeView=Ext.extend(Ext.Panel,{searchPanel:null,gridPanel:null,store:null,topbar:null,constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();DepreTypeView.superclass.constructor.call(this,{id:"DepreTypeView",title:"折算类型列表",iconCls:"menu-depre-type",region:"center",layout:"border",items:[this.searchPanel,this.gridPanel]});},initUIComponents:function(){this.searchPanel=new Ext.FormPanel({id:"DepreTypeSearchForm",height:40,region:"north",frame:false,border:false,layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label",margins:{top:0,right:4,bottom:4,left:4}},keys:{key:Ext.EventObject.ENTER,fn:this.search,scope:this},items:[{text:"请输入查询条件:"},{text:"类型名称"},{xtype:"textfield",name:"Q_typeName_S_LK"},{text:"折算类型"},{xtype:"textfield",hiddenName:"Q_calMethod_SN_EQ",xtype:"combo",allowBlank:false,mode:"local",editable:false,triggerAction:"all",store:[["1","平均年限法"],["2","工作量法"],["3","双倍余额递减法"],["4","年数总和法"]]},{xtype:"button",text:"查询",iconCls:"search",handler:this.search,scope:this},{xtype:"button",text:"清空",iconCls:"reset",handler:this.clear,scope:this}]});this.store=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/admin/listDepreType.do"}),reader:new Ext.data.JsonReader({root:"result",totalProperty:"totalCounts",id:"id",fields:[{name:"depreTypeId",type:"int"},"typeName","deprePeriod","typeDesc","calMethod"]}),remoteSort:true});this.store.setDefaultSort("depreTypeId","desc");this.store.load({params:{start:0,limit:25}});var c=new Ext.grid.CheckboxSelectionModel();var d=new Ext.grid.ColumnModel({columns:[c,new Ext.grid.RowNumberer(),{header:"depreTypeId",dataIndex:"depreTypeId",hidden:true},{header:"分类名称",dataIndex:"typeName"},{header:"折旧周期(月)",dataIndex:"deprePeriod"},{header:"折旧方法",dataIndex:"calMethod",renderer:function(a){if(a=="1"){return"平均年限法";}if(a=="2"){return"工作量法";}if(a=="3"){return"双倍余额递减法";}if(a=="4"){return"年数总和法";}}},{header:"方法描述",dataIndex:"typeDesc"},{header:"管理",dataIndex:"depreTypeId",width:50,sortable:false,renderer:function(k,l,n,a,m){var b=n.data.depreTypeId;var j="";if(isGranted("_DepreTypeDel")){j='<button title="删除" value=" " class="btn-del" onclick="DepreTypeView.remove('+b+')">&nbsp;</button>';}if(isGranted("_DepreTypeEdit")){j+='&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="DepreTypeView.edit('+b+')">&nbsp;</button>';}return j;}}],defaults:{sortable:true,menuDisabled:true,width:100}});this.topbar=new Ext.Toolbar({id:"DepreTypeFootBar",height:30,bodyStyle:"text-align:left",items:[]});if(isGranted("_DepreTypeAdd")){this.topbar.add(new Ext.Button({iconCls:"btn-add",text:"添加折旧类型",handler:function(){new DepreTypeForm().show();}}));}if(isGranted("_DepreTypeDel")){this.topbar.add(new Ext.Button({iconCls:"btn-del",text:"删除折旧类型",handler:function(){var b=Ext.getCmp("DepreTypeGrid");var h=b.getSelectionModel().getSelections();if(h.length==0){Ext.ux.Toast.msg("信息","请选择要删除的记录！");return;}var a=Array();for(var g=0;g<h.length;g++){a.push(h[g].data.depreTypeId);}DepreTypeView.remove(a);}}));}this.gridPanel=new Ext.grid.GridPanel({id:"DepreTypeGrid",tbar:this.topbar,region:"center",store:this.store,trackMouseOver:true,disableSelection:false,loadMask:true,cm:d,sm:c,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},bbar:new HT.PagingBar({store:this.store})});this.gridPanel.addListener("rowdblclick",function(b,e,a){b.getSelectionModel().each(function(f){if(isGranted("_DepreTypeEdit")){DepreTypeView.edit(f.data.depreTypeId);}});});},search:function(){var d=Ext.getCmp("DepreTypeSearchForm");var c=Ext.getCmp("DepreTypeGrid");if(d.getForm().isValid()){$search({searchPanel:d,gridPanel:c});}},clear:function(){Ext.getCmp("DepreTypeSearchForm").getForm().reset();}});DepreTypeView.remove=function(c){var d=Ext.getCmp("DepreTypeGrid");Ext.Msg.confirm("信息确认","您确认要删除该记录吗？",function(a){if(a=="yes"){Ext.Ajax.request({url:__ctxPath+"/admin/multiDelDepreType.do",params:{ids:c},method:"post",success:function(h,b){var g=Ext.util.JSON.decode(h.responseText);if(g.success==false){Ext.ux.Toast.msg("信息提示",g.message);}else{Ext.ux.Toast.msg("信息提示","成功删除所选记录！");d.getStore().reload({params:{start:0,limit:25}});}}});}});};DepreTypeView.edit=function(b){new DepreTypeForm({depreTypeId:b}).show();};