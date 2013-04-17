Ext.ns("PersonalWorkPlanView");PersonalWorkPlanView=Ext.extend(Ext.Panel,{searchFormPanel:null,gridPanel:null,constructor:function(b){Ext.applyIf(this,b);this.initUI();PersonalWorkPlanView.superclass.constructor.call(this,{id:"PersonalWorkPlanView",title:"我的计划列表",iconCls:"menu-myplan",region:"center",layout:"border",keys:{key:Ext.EventObject.ENTER,scope:this,fn:this.search},items:[this.leftPanel,this.centerPanel]});},initUI:function(){this.leftPanel=new Ext.Panel({region:"west",title:"分类管理",layout:"anchor",collapsible:true,split:true,width:200,items:[{xtype:"treePanelEditor",id:"PersonalPlanTypeTree",split:true,border:false,height:380,autoScroll:true,url:__ctxPath+"/system/pwTreeGlobalType.do?catKey=PWP",onclick:function(a){var b=a.id;var g=Ext.getCmp("PersonalWorkPlanGrid");if(g!=null){var h=g.getStore();h.url=__ctxPath+"/task/personalWorkPlan.do";if(b!=0){h.baseParams={"Q_globalType.proTypeId_L_EQ":b};}else{h.baseParams={"Q_globalType.proTypeId_L_EQ":null};}h.reload();}},contextMenuItems:[{text:"新建分类",scope:this,iconCls:"btn-add",handler:function(){var f=Ext.getCmp("PersonalPlanTypeTree");var a=f.selectedNode.id;var b=new PersonalPlanTypeForm({parentId:a,catKey:"PWP",callback:function(){Ext.getCmp("PersonalPlanTypeTree").root.reload();Ext.getCmp("PersonalWorkPlanGrid").getStore().reload();}});b.show();}},{text:"修改分类",scope:this,iconCls:"btn-edit",handler:function(){var b=Ext.getCmp("PersonalPlanTypeTree");var f=b.selectedNode.id;var a=new PersonalPlanTypeForm({proTypeId:f,callback:function(){Ext.getCmp("PersonalPlanTypeTree").root.reload();Ext.getCmp("PersonalWorkPlanGrid").getStore().reload();}});a.show();}},{text:"删除分类",scope:this,iconCls:"btn-del",handler:function(){var a=Ext.getCmp("PersonalPlanTypeTree");var b=a.selectedNode.id;Ext.Msg.confirm("信息确认","您确认要删除所选分类吗？",function(f){if(f=="yes"){Ext.Ajax.request({url:__ctxPath+"/system/multiDelGlobalType.do",params:{ids:b},method:"POST",success:function(h,e){Ext.ux.Toast.msg("操作信息","成功删除该分类！");Ext.getCmp("PersonalWorkPlanGrid").getStore().reload();Ext.getCmp("PersonalPlanTypeTree").root.reload();},failure:function(h,e){Ext.ux.Toast.msg("操作信息","操作出错，请联系管理员！");}});}});}}]}]});this.searchFormPanel=new Ext.FormPanel({height:40,region:"north",frame:false,border:false,id:"PersonalWorkPlanSearchForm",layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label",margins:{top:0,right:4,bottom:4,left:4}},items:[{text:"请输入查询条件:"},{text:"计划名称"},{xtype:"textfield",name:"Q_planName_S_LK"},{text:"计划类型"},{xtype:"textfield",hiddenName:"Q_globalType.proTypeId_L_EQ",xtype:"combo",editable:false,triggerAction:"all",displayField:"name",valueField:"id",mode:"local",store:new Ext.data.SimpleStore({autoLoad:true,baseParams:{catKey:"PWP"},url:__ctxPath+"/system/comboGlobalType.do",fields:["id","name"]})},{xtype:"button",text:"查询",iconCls:"search",scope:this,handler:this.search},{iconCls:"reset",xtype:"button",text:"重置",scope:this,handler:function(){var a=this.searchFormPanel;a.getForm().reset();}}]});var c=new Ext.grid.CheckboxSelectionModel();var d=new Ext.grid.ColumnModel({columns:[c,new Ext.grid.RowNumberer(),{header:"planId",dataIndex:"planId",hidden:true},{header:"标识",dataIndex:"icon",renderer:function(a){return'<div class="'+a+'"></div>';}},{header:"计划名称",dataIndex:"planName"},{header:"开始日期",dataIndex:"startTime"},{header:"结束日期",dataIndex:"endTime"},{header:"计划类型",dataIndex:"globalType",renderer:function(a){if(a!=null){return a.typeName;}}},{header:"创建人",dataIndex:"userName"},{header:"负责人",dataIndex:"principal"},{header:"是否生效",dataIndex:"startTime",renderer:function(b,l,p,a,m){var k=new Date(getDateFromFormat(b,"yyyy-MM-dd H:mm:ss"));var n=new Date(getDateFromFormat(p.data.endTime,"yyyy-MM-dd H:mm:ss"));var o=new Date();if(k>o){return'<a style="color:blue;">未生效</a>';}else{if(k<=o&&n>=o){return'<a style="color:green;">已生效</a>';}else{if(n<o){return'<a style="color:red;">已失效</a>';}}}}}],defaults:{sortable:true,menuDisabled:false,width:100}});this.store=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/task/personalWorkPlan.do"}),reader:new Ext.data.JsonReader({root:"result",totalProperty:"totalCounts",id:"id",fields:[{name:"planId",type:"int"},"planName","planContent","startTime","endTime","globalType",{name:"userName",mapping:"appUser.fullname"},"principal","note","status","isPersonal","icon"]}),remoteSort:true});this.store.setDefaultSort("planId","desc");this.store.load({params:{start:0,limit:25}});this.topbar=new Ext.Toolbar({items:[{xtype:"button",text:"添加个人计划",iconCls:"btn-add",handler:this.createRecord},{xtype:"button",text:"编辑个人计划",iconCls:"btn-edit",scope:this,handler:this.editRecord},{xtype:"button",text:"删除",iconCls:"btn-del",scope:this,handler:this.delRecord}]});this.gridPanel=new Ext.grid.GridPanel({region:"center",id:"PersonalWorkPlanGrid",tbar:this.topbar,store:this.store,trackMouseOver:true,disableSelection:false,loadMask:true,cm:d,sm:c,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},bbar:new HT.PagingBar({store:this.store})});this.gridPanel.addListener("rowdblclick",this.rowdblclickaction);this.centerPanel=new Ext.Panel({layout:"border",region:"center",items:[this.searchFormPanel,this.gridPanel]});},search:function(){var d=this.searchFormPanel;var c=this.gridPanel;if(d.getForm().isValid()){$search({searchPanel:d,gridPanel:c});}},rowdblclickaction:function(d,e,f){d.getSelectionModel().each(function(a){new PersonalWorkPlanForm({planId:a.data.planId}).show();});},createRecord:function(){new PersonalWorkPlanForm().show();},editRecord:function(){var d=this.gridPanel.getSelectionModel().getSelections();if(d.length==0){Ext.ux.Toast.msg("操作信息","请选择要编辑的记录");return;}else{if(d.length>1){Ext.ux.Toast.msg("操作信息","只可以编辑一条记录");return;}}var c=d[0];new PersonalWorkPlanForm({planId:c.data.planId}).show();},delRecord:function(){$delGridRs({url:__ctxPath+"/task/multiDelWorkPlan.do",grid:this.gridPanel,idName:"planId"});}});