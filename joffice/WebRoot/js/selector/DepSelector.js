var DepSelector={getView:function(k,m){var n=new Ext.tree.TreePanel({title:"部门信息显示",region:"west",width:180,height:300,split:true,collapsible:true,autoScroll:true,bbar:new Ext.Toolbar({items:[{xtype:"button",iconCls:"btn-refresh",text:"刷新",handler:function(){n.root.reload();}},{xtype:"button",text:"展开",iconCls:"btn-expand",handler:function(){n.expandAll();}},{xtype:"button",text:"收起",iconCls:"btn-collapse",handler:function(){n.collapseAll();}}]}),loader:new Ext.tree.TreeLoader({url:__ctxPath+"/system/listDepartment.do"}),root:new Ext.tree.AsyncTreeNode({expanded:true}),rootVisible:false,listeners:{"click":function(b){if(b!=null){var a=Ext.getCmp("DepSelectorGrid");var c=a.getStore();c.proxy.conn.url=__ctxPath+"/system/selectDepartment.do";c.baseParams={depId:b.id};c.load({params:{start:0,limit:12}});}}}});var l=null;if(m){var l=new Ext.grid.CheckboxSelectionModel({singleSelect:true});}else{l=new Ext.grid.CheckboxSelectionModel();}var j=new Ext.grid.ColumnModel({columns:[l,new Ext.grid.RowNumberer(),{header:"depId",dataIndex:"depId",hidden:true},{header:"部门名称",dataIndex:"depName",renderer:function(a,b,d){var f="";var e=d.data.depLevel;if(e!=null&&!isNaN(e)){for(var c=2;c<=e;c++){f+='<img src="'+__ctxPath+'/images/system/down.gif"/>';}}f+=a;return f;},width:60}]});var i=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/system/selectDepartment.do"}),reader:new Ext.data.JsonReader({root:"result",totalProperty:"totalCounts",id:"depId",fields:[{name:"depId",type:"int"},"depName",{name:"depLevel",type:"int"}]}),remoteSort:true});var p=new Ext.grid.GridPanel({id:"DepSelectorGrid",width:400,height:300,region:"center",title:"部门列表",store:i,shim:true,trackMouseOver:true,disableSelection:false,loadMask:true,cm:j,sm:l,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},bbar:new HT.PagingBar({store:i})});i.load({params:{start:0,limit:25}});var o=new Ext.Window({title:"部门选择器",iconCls:"menu-department",width:630,height:380,layout:"border",border:false,items:[n,p],modal:true,buttonAlign:"center",buttons:[{iconCls:"btn-ok",text:"确定",handler:function(){var c=Ext.getCmp("DepSelectorGrid");var b=c.getSelectionModel().getSelections();var a="";var e="";for(var d=0;d<b.length;d++){if(d>0){a+=",";e+=",";}a+=b[d].data.depId;e+=b[d].data.depName;}if(k!=null){k.call(this,a,e);}o.close();}},{text:"取消",iconCls:"btn-cancel",handler:function(){o.close();}}]});return o;}};