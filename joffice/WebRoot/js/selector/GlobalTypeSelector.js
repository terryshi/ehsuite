GlobalTypeSelector=Ext.extend(Ext.Window,{constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();this.buttons=[{text:"选择",iconCls:"btn-save",scope:this,handler:function(){if(this.callback){if(!this.isSingle){var f=Ext.getCmp("selectedIds").getValue();var e=Ext.getCmp("selectedTypes").getValue();this.callback.call(this,f,e);}else{var a=this.rightPanel.getSelectionModel().getSelections();if(a.length>0){this.callback.call(this,a[0].data.proTypeId,a[0].data.typeName);}}}this.close();}},{text:"取消",iconCls:"btn-cancel",scope:this,handler:function(){this.close();}}];GlobalTypeSelector.superclass.constructor.call(this,{title:b.title?b.title:"分类选择",layout:"border",height:480,width:520,buttonAlign:"center"});},initUIComponents:function(){this.leftPanel=new Ext.tree.TreePanel({title:"分类",collapsible:true,autoScroll:true,split:true,region:"west",width:140,rootVisible:false,loader:new Ext.tree.TreeLoader({url:__ctxPath+"/system/treeGlobalType.do?catKey="+this.catKey}),root:new Ext.tree.AsyncTreeNode({expanded:true}),listeners:{"click":function(a){this.selectedNode=a;var b=Ext.getCmp("proTypeCenGrid").getStore();b.baseParams={parentId:a.id};b.reload();}}});this.store=new Ext.data.JsonStore({url:__ctxPath+"/system/subGlobalType.do?catKey="+this.catKey,baseParams:{parentId:0},root:"result",remoteSort:true,fields:[{name:"proTypeId",type:"int"},"typeName","nodeKey","sn"]});this.store.load();var d={singleSelect:this.isSingle?this.isSingle:false};if(!this.isSingle){Ext.apply(d,{listeners:{"rowselect":function(j,a,b){var c=Ext.getCmp("selectedIds");var i=Ext.getCmp("selectedTypes");c.setValue(c.getValue()+b.data.proTypeId+";");i.setValue(i.getValue()+b.data.typeName+";");},"rowdeselect":function(j,a,b){var c=Ext.getCmp("selectedIds");var i=Ext.getCmp("selectedTypes");c.setValue(c.getValue().replace(b.data.proTypeId+";",""));i.setValue(i.getValue().replace(b.data.typeName+";",""));}}});}var f=new Ext.grid.CheckboxSelectionModel(d);var e=new Ext.grid.ColumnModel({columns:[f,new Ext.grid.RowNumberer(),{header:"proTypeId",dataIndex:"proTypeId",hidden:true},{header:"名称",dataIndex:"typeName",editor:new Ext.form.TextField({allowBlank:false})}],defaults:{sortable:true,menuDisabled:false}});this.rightPanel=new Ext.grid.GridPanel({region:"center",title:"分类列表",id:"proTypeCenGrid",store:this.store,sm:f,cm:e,height:450});this.items=[this.leftPanel,this.rightPanel];if(!this.isSingle){this.southPanel=new Ext.Panel({region:"south",height:38,bodyStyle:"padding:5px",border:false,layout:"form",items:[{xtype:"hidden",id:"selectedIds"},{xtype:"compositefield",fieldLabel:"选择的类型",items:[{xtype:"textfield",width:300,readOnly:true,id:"selectedTypes"},{xtype:"button",iconCls:"btn-del",text:"清除",handler:function(){Ext.getCmp("selectedIds").setValue("");Ext.getCmp("selectedTypes").setValue("");}}]}]});this.items.push(this.southPanel);}}});