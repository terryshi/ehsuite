Ext.ns("DocFolderSharedView");var DocFolderSharedView=function(){var n;var j=new DocPrivilegeView();var p=new Ext.tree.TreePanel({region:"west",id:"leftDocFolderSharedPanel",title:"文件夹目录",collapsible:true,split:true,width:180,height:800,tbar:new Ext.Toolbar({items:[{xtype:"button",iconCls:"btn-refresh",text:"刷新",handler:function(){p.root.reload();}},{xtype:"button",text:"展开",iconCls:"btn-expand",handler:function(){p.expandAll();}},{xtype:"button",text:"收起",iconCls:"btn-collapse",handler:function(){p.collapseAll();}}]}),loader:new Ext.tree.TreeLoader({url:__ctxPath+"/document/treeDocFolder.do"}),root:new Ext.tree.AsyncTreeNode({expanded:true}),rootVisible:false,listeners:{"click":function(b){if(b!=null){j.setFolderId(b.id);var a=Ext.getCmp("DocPrivilegeView");if(b.id==0){a.setTitle("文件夹授权");}else{a.setTitle("文件夹["+b.text+"]授权情况");}var c=Ext.getCmp("DocPrivilegeGrid");var d=c.getStore();d.url=__ctxPath+"/document/listDocPrivilege.do";d.baseParams={"Q_docFolder.folderId_L_EQ":b.id};d.params={start:0,limit:25};d.reload();}}}});function q(b,a){n=new Ext.tree.TreeNode({id:b.id,text:b.text});m.showAt(a.getXY());}if(isGranted("_DocFolderSharedManage")){p.on("contextmenu",q,p);}var m=new Ext.menu.Menu({tbar:new Ext.Toolbar({items:[{text:"刷新",handler:function(){alert("refresh");}}]}),id:"DocFolderTreeMenu",items:[{text:"新建目录",scope:this,iconCls:"btn-add",handler:k},{text:"修改目录",scope:this,iconCls:"btn-edit",handler:l},{text:"删除目录",scope:this,iconCls:"btn-delete",handler:o}]});function k(b){var a=n.id;new DocFolderForm({folderId:null,parentId:a,isShared:1}).show();}function l(){var a=n.id;new DocFolderForm({folderId:a,parentId:null,isShared:null}).show();}function o(){var a=n.id;Ext.Msg.confirm("删除操作","删除目录会将该目录的权限删除，你确定删除该目录吗?",function(b){if(b=="yes"){Ext.Ajax.request({url:__ctxPath+"/document/removeDocFolder.do",params:{folderId:a},method:"post",success:function(d,e){var c=Ext.util.JSON.decode(d.responseText);if(c.success==false){Ext.ux.Toast.msg("操作信息",c.message);}else{Ext.ux.Toast.msg("操作信息","成功删除目录！");p.root.reload();}},failure:function(d,c){Ext.MessageBox.show({title:"操作信息",msg:"信息保存出错，请联系管理员！",buttons:Ext.MessageBox.OK,icon:"ext-mb-error"});}});}});}var r=new Ext.Panel({id:"DocFolderSharedView",title:"公共文件夹管理",iconCls:"menu-public-fol",layout:"border",height:800,items:[p,j.getView()]});return r;};