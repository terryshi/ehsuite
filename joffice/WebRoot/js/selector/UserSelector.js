var UserSelector={getView:function(j,k,i,g){if(typeof(j)=="object"){this.scope=j.scope;this.callback=j.callback;}else{this.scope=this;this.callback=j;}this.isSingle=(k!=null)?k:true;this.mobileFlag=(g!=null)?g:false;var h=this.initPanel(k);var l=new Ext.Window({id:"UserSelectorWin",title:"选择用户",iconCls:"menu-appuser",width:640,minWidth:640,height:480,minHeight:480,layout:"fit",border:false,maximizable:true,resizable:true,modal:true,items:[h],buttonAlign:"center",buttons:[{text:"确认",iconCls:"btn-ok",scope:this,handler:this.submit},{text:"关闭",iconCls:"btn-cancel",scope:this,handler:this.close}]});if(i){l.addButton(new Ext.Button({text:"发起人",iconCls:"menu-subuser",scope:this,handler:function(){this.callback.call(this,"__start","[发起人]");l.close();}}));}return l;},initPanel:function(v){var r=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/system/selectAppUser.do"}),reader:new Ext.data.JsonReader({root:"result",totalProperty:"totalCounts",id:"id",fields:[{name:"userId",type:"int"},"fullname","title","mobile"]}),remoteSort:true});r.setDefaultSort("id","desc");r.load({params:{start:0,limit:12}});var x=null;if(v){x=new Ext.grid.CheckboxSelectionModel({singleSelect:true});}else{x=new Ext.grid.CheckboxSelectionModel();}var q=new Ext.grid.ColumnModel({columns:[x,new Ext.grid.RowNumberer(),{header:"用户名",dataIndex:"fullname",renderer:function(c,b,d){var a=d.data.title;if(a==1){return'<img src="'+__ctxPath+'/images/flag/man.png"/>&nbsp;'+c;}else{return'<img src="'+__ctxPath+'/images/flag/women.png"/>&nbsp;'+c;}},width:60}],defaults:{sortable:true,menuDisabled:true,width:120},listeners:{hiddenchange:function(c,b,a){saveConfig(b,a);}}});var w=new Ext.tree.TreePanel({id:"treePanels",autoScroll:true,title:"按部门分类 ",iconCls:"dep-user",loader:new Ext.tree.TreeLoader({url:__ctxPath+"/system/listDepartment.do"}),root:new Ext.tree.AsyncTreeNode({expanded:true}),rootVisible:false,listeners:{"click":this.clickNode}});var o=new Ext.tree.TreePanel({id:"rolePanel",autoScroll:true,iconCls:"role-user",title:"按角色分类 ",loader:new Ext.tree.TreeLoader({url:__ctxPath+"/system/treeAppRole.do"}),root:new Ext.tree.AsyncTreeNode({expanded:true}),rootVisible:false,listeners:{"click":this.clickRoleNode}});var u=new Ext.Panel({id:"onlinePanel",autoScroll:true,iconCls:"online-user",title:"在线人员  ",listeners:{"expand":this.clickOnlinePanel}});var p=new Ext.grid.EditorGridPanel({title:"用户列表",autoScroll:true,id:"contactGrid",region:"center",height:380,autoWidth:false,store:r,shim:true,trackMouseOver:true,disableSelection:false,loadMask:true,cm:q,sm:x,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},bbar:new HT.PagingBar({store:r,pageSize:12})});p.on("rowdblclick",function(f,j,k){var i=Ext.getCmp("contactGrid");var d=Ext.getCmp("selectedUserGrid");var h=d.getStore();var c=i.getSelectionModel().getSelections();for(var a=0;a<c.length;a++){var n=c[a].data.userId;var g=c[a].data.fullname;var l=false;for(var b=0;b<h.getCount();b++){if(h.getAt(b).data.userId==n){l=true;break;}}if(!l){var e={userId:n,fullname:g};var m=new h.recordType(e);d.stopEditing();h.add(m);}}});var y=new Ext.FormPanel({id:"userSelectorSearchPanel",height:38,region:"north",layout:"hbox",bodyStyle:"padding:6px 2px 2px 2px",layoutConfigs:{align:"middle"},keys:{key:Ext.EventObject.ENTER,scope:this,fn:this.search},defaultType:"label",defaults:{margins:"0 0 0 4"},items:[{text:"用户姓名"},{xtype:"textfield",name:"Q_fullname_S_LK",width:260,maxLength:256},{xtype:"button",text:"查询",iconCls:"btn-search",scope:this,handler:this.search}]});var s=new Ext.grid.CheckboxSelectionModel();var z=new Ext.grid.EditorGridPanel({id:"selectedUserGrid",title:"已选用户",layout:"form",region:"center",width:"100%",autoWidth:true,height:"100%",autoHeight:true,autoScroll:true,border:false,store:new Ext.data.ArrayStore({fields:["userId","fullname"]}),trackMouseOver:true,sm:s,columns:[s,new Ext.grid.RowNumberer(),{header:"用户名",dataIndex:"fullname"}]});z.addListener("rowdblclick",function(c,a){var c=Ext.getCmp("selectedUserGrid");var e=c.getStore();var b=c.getSelectionModel().getSelections();for(var d=0;d<b.length;d++){c.stopEditing();e.remove(b[d]);}});var t=new Ext.Panel({layout:"border",region:"east",width:"200",height:"100%",border:false,autoScroll:true,items:[new Ext.Panel({region:"west",frame:true,width:40,layout:{type:"vbox",pack:"center",align:"stretch"},defaultType:"button",items:[{iconCls:"add-all",text:"",scope:this,handler:this.addAll},{iconCls:"rem-all",text:"",scope:this,handler:this.removeAll}]}),{region:"center",autoScroll:true,items:[z]}]});var A=new Ext.Panel({layout:"accordion",region:"west",width:200,split:true,header:false,collapsible:true,items:[w,o,u]});var B=new Ext.Panel({id:"contactPanel",layout:"border",region:"center",border:false,anchor:"100%,100%",items:[y,A,p]});if(v!=null&&v==false){B.add(t);B.doLayout();}return B;},clickNode:function(d){if(d!=null){var f=Ext.getCmp("contactGrid");var e=f.getStore();e.proxy.conn.url=__ctxPath+"/system/selectAppUser.do";e.baseParams={depId:d.id};e.load({params:{start:0,limit:12}});}},clickRoleNode:function(d){if(d!=null){var f=Ext.getCmp("contactGrid");var e=f.getStore();e.baseParams={roleId:d.id};e.proxy.conn.url=__ctxPath+"/system/findAppUser.do";e.load({params:{start:0,limit:12}});}},clickOnlinePanel:function(){var c=Ext.getCmp("contactGrid");var d=c.getStore();d.proxy.conn.url=__ctxPath+"/system/onlineAppUser.do";d.load({params:{start:0,limit:200}});},addAll:function(){var p=Ext.getCmp("contactGrid");var v=Ext.getCmp("selectedUserGrid");var o=v.getStore();var i=p.getSelectionModel().getSelections();for(var t=0;t<i.length;t++){var s=i[t].data.userId;var n=i[t].data.fullname;var q=false;for(var u=0;u<o.getCount();u++){if(o.getAt(u).data.userId==s){q=true;break;}}if(!q){var j={userId:s,fullname:n};var r=new o.recordType(j);v.stopEditing();o.add(r);}}},removeAll:function(){var h=Ext.getCmp("selectedUserGrid");var g=h.getSelectionModel().getSelections();var f=h.getStore();for(var e=0;e<g.length;e++){h.stopEditing();f.remove(g[e]);}},search:function(){var d=Ext.getCmp("userSelectorSearchPanel");var c=Ext.getCmp("contactGrid");d.getForm().submit({url:__ctxPath+"/system/listAppUser.do",method:"post",success:function(b,a){c.getStore().proxy.conn.url=__ctxPath+"/system/listAppUser.do";var f=Ext.util.JSON.decode(a.response.responseText);c.getStore().loadData(f);}});},submit:function(){var i="";var k="";if(this.isSingle==null||this.isSingle){var l=Ext.getCmp("contactGrid");var j=l.getSelectionModel().getSelections();for(var g=0;g<j.length;g++){if(g>0){i+=",";k+=",";}i+=j[g].data.userId;if(this.mobileFlag){k+=j[g].data.fullname+"("+j[g].data.mobile+")";}else{k+=j[g].data.fullname;}}}else{var h=Ext.getCmp("selectedUserGrid").getStore();for(var g=0;g<h.getCount();g++){if(g>0){i+=",";k+=",";}i+=h.getAt(g).data.userId;if(this.mobileFlag){k+=h.getAt(g).data.fullname+"("+h.getAt(g).data.mobile+")";}else{k+=h.getAt(g).data.fullname;}}}if(this.callback!=null){this.callback.call(this.scope,i,k);}Ext.getCmp("UserSelectorWin").close();},close:function(){Ext.getCmp("UserSelectorWin").close();}};