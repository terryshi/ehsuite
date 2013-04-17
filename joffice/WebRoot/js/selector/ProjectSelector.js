var ProjectSelector={getView:function(k,m){var l=null;if(m){var l=new Ext.grid.CheckboxSelectionModel({singleSelect:true});}else{l=new Ext.grid.CheckboxSelectionModel();}var i=new Ext.grid.ColumnModel({columns:[l,new Ext.grid.RowNumberer(),{header:"projectId",dataIndex:"projectId",hidden:true},{header:"项目编号",dataIndex:"projectNo",width:60},{header:"项目名称",dataIndex:"projectName",width:60},{header:"所属客户",dataIndex:"customer",width:60,renderer:function(a){return a.customerName;}},{header:"联系人",dataIndex:"fullname",width:60},{header:"项目描述",dataIndex:"reqDesc",hidden:true}]});var p=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/customer/listProject.do"}),reader:new Ext.data.JsonReader({root:"result",totalProperty:"totalCounts",id:"projectId",fields:[{name:"projectId",type:"int"},"projectNo","projectName","customer","fullname","reqDesc"]}),remoteSort:true});var o=new Ext.grid.GridPanel({id:"ProjectSelectorGrid",width:400,height:300,region:"center",title:"项目列表",store:p,shim:true,trackMouseOver:true,disableSelection:false,loadMask:true,cm:i,sm:l,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},bbar:new HT.PagingBar({store:p})});p.load({params:{start:0,limit:25}});var j=new Ext.FormPanel({width:400,region:"north",id:"ProjectForm",height:40,frame:false,border:false,layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label",margins:{top:0,right:4,bottom:4,left:4}},items:[{text:"查询条件:"},{text:"项目编号"},{xtype:"textfield",width:80,name:"Q_projectNo_S_LK"},{text:"项目名称"},{xtype:"textfield",width:80,name:"Q_projectName_S_LK"},{xtype:"button",text:"查询",iconCls:"search",handler:function(){var b=Ext.getCmp("ProjectForm");var a=Ext.getCmp("ProjectSelectorGrid");if(b.getForm().isValid()){b.getForm().submit({waitMsg:"正在提交查询",url:__ctxPath+"/customer/listProject.do",success:function(d,c){var e=Ext.util.JSON.decode(c.response.responseText);a.getStore().loadData(e);}});}}}]});var n=new Ext.Window({title:"项目选择器",iconCls:"menu-project",width:430,height:380,layout:"border",border:false,items:[j,o],modal:true,buttonAlign:"center",buttons:[{iconCls:"btn-ok",text:"确定",handler:function(){var f=Ext.getCmp("ProjectSelectorGrid");var e=f.getSelectionModel().getSelections();var b="";var c="";var d="";for(var a=0;a<e.length;a++){if(a>0){b+=",";c+=",";d+=",";}b+=e[a].data.projectId;c+=e[a].data.projectName;d+=e[a].data.projectNo;}if(k!=null){k.call(this,b,c,d);}n.close();}},{text:"取消",iconCls:"btn-cancel",handler:function(){n.close();}}]});return n;}};