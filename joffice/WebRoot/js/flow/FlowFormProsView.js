FlowFormProsView=Ext.extend(Ext.Panel,{constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();FlowFormProsView.superclass.constructor.call(this,{id:"FlowFormProsView",title:"流程表单查询",region:"center",layout:"border",items:[this.leftPanel,this.proPanel]});},typeId:0,initUIComponents:function(){this.leftPanel=new Ext.Panel({layout:"fit",region:"west",collapsible:true,split:true,width:200,title:"流程分类树",items:[new htsoft.ux.TreePanelEditor({border:false,autoScroll:true,url:__ctxPath+"/system/flowTreeGlobalType.do?catKey=FLOW",onclick:function(c){this.typeId=c.id;var d=Ext.getCmp("FlowFormProsView").QueryForms;d.store.proxy.conn.url=__ctxPath+"/flow/queryFormsFlowFormQuery.do?typeId="+c.id;d.store.load({params:{start:0,limit:25}});}})]});this.QueryForms=new FlowFormQueryForms({}).show();this.QueryForms.gridPanel.addListener("rowdblclick",this.QueryForms_rowClick,this);this.QueryForms.rowActions.on("action",this.QueryForms_onRowAction,this);this.proPanel=new Ext.Panel({title:"流程表单",layout:"border",region:"center",autoScroll:true,items:[this.QueryForms]});},showForms:function(c){var d=Ext.getCmp("centerTabPanel");d.remove(this.QueryView,true);this.QueryView=d.add(new FlowFormQueryView({defId:c.data.defId,name:c.data.name,description:c.data.description,deployId:c.data.deployId}));d.activate(this.QueryView);},activeEntity:function(c){var d=Ext.getCmp("centerTabPanel");d.remove(this.QueryEntity,true);this.QueryEntity=d.add(new FlowFormQueryEntity({tableKey:c.data.tableKey,tableId:c.data.tableId,title:c.data.tableName}));d.activate(this.QueryEntity);},QueryForms_rowClick:function(h,e,g){var f=h.getStore().getAt(e);this.activeEntity.call(this,f);},QueryForms_onRowAction:function(j,g,i,h,f){switch(i){case"btn-showDetail":this.activeEntity.call(this,g);break;default:break;}}});