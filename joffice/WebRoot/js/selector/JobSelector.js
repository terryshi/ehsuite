var JobSelector={getView:function(g,e){var f=this.initUIComponent(e);var h=new Ext.Window({id:"jobSelectorWin",title:"职位选择器",iconCls:"menu-job",layout:"fit",region:"center",maximizable:true,modal:true,width:600,minWidth:400,height:425,minHeight:425,items:[f],buttonAlign:"center",buttons:[{text:"确定",iconCls:"btn-ok",handler:function(){var c="";var a="";if(e==null||e==true){var b=Ext.getCmp("jobSelectorJobTreePanel").getSelectionModel().getSelectedNode();if(b!=null&&b.id>0){c=b.id;a=b.text;}}else{var i=Ext.getCmp("JobSelectorEditorGridPanel").getStore();for(var d=0;d<i.getCount();d++){c+=i.getAt(d).data.jobId+",";a+=i.getAt(d).data.jobName+",";}c=c.substring(0,c.length-1);a=a.substring(0,a.length-1);}if(g!=null){g.call(this,c,a);}h.close();},scope:this},{text:"取消",iconCls:"btn-cancel",handler:function(){h.close();}}]});return h;},initUIComponent:function(m){var n=m!=null&&m==true?"center":"west";var i=new Ext.tree.TreePanel({id:"jobSelectorJobTreePanel",layout:"form",region:n,width:200,collapsible:true,autoScroll:true,split:true,title:"岗位信息列表",tbar:new Ext.Toolbar({defaultType:"button",items:[{text:"刷新",iconCls:"btn-refresh",handler:function(){Ext.getCmp("jobSelectorJobTreePanel").root.reload();}},{text:"展开",iconCls:"btn-expand",handler:function(){Ext.getCmp("jobSelectorJobTreePanel").expandAll();}},{text:"收起",iconCls:"btn-collapse",handler:function(){Ext.getCmp("jobSelectorJobTreePanel").collapseAll();}}]}),loader:new Ext.tree.TreeLoader({url:__ctxPath+"/hrm/treeLoadJob.do"}),root:new Ext.tree.AsyncTreeNode({expanded:true}),rootVisible:false,listeners:{"dblclick":this.nodeDBClick}});var j=new Ext.grid.CheckboxSelectionModel();var k=new Ext.grid.EditorGridPanel({id:"JobSelectorEditorGridPanel",title:"已选中的职位列表",layout:"form",region:"center",width:"100%",autoWidth:true,height:"100%",autoHeight:true,border:false,autoScroll:true,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},store:new Ext.data.ArrayStore({fields:["jobId","jobName"]}),trackMouseOver:true,sm:j,columns:[j,new Ext.grid.RowNumberer(),{header:"jobId",dataIndex:"jobId",hidden:true},{header:"职位名称",dataIndex:"jobName",anchor:"90%"}]});k.addListener("dblclick",function(c,a){var c=Ext.getCmp("JobSelectorEditorGridPanel");var b=c.getSelectionModel().getSelections();var e=c.getStore();for(var d=0;d<b.length;d++){c.stopEditing();e.remove(b[d]);}});var l=new Ext.Panel({layout:"border",region:"center",width:"100%",height:"100%",border:false,autoScroll:true,items:[new Ext.Panel({region:"west",frame:true,width:40,layout:{type:"vbox",pack:"center",align:"stretch"},defaultType:"button",items:[{iconCls:"add-all",text:"",scope:this,handler:this.addAll},{iconCls:"rem-all",text:"",scope:this,handler:this.removeAll}]}),{region:"center",autoScroll:true,items:[k]}]});var h=new Ext.Panel({layout:"border",region:"center",autoScroll:true,border:false,anchor:"98%,98%",items:[i]});if(m!=null&&m==false){h.add(l);h.doLayout();}return h;},nodeDBClick:function(m){if(m!=null&&m.id>0){var n=Ext.getCmp("JobSelectorEditorGridPanel");var i=n.getStore();var k=n.getSelectionModel().getSelections();var p=false;for(var o=0;o<i.getCount();o++){if(i.getAt(o).data.jobId==m.id){p=true;break;}}if(!p){var l={jobId:m.id,jobName:m.text};var j=new i.recordType(l);n.stopEditing();i.add(j);}}},addAll:function(){var j=Ext.getCmp("jobSelectorJobTreePanel");var n=Ext.getCmp("JobSelectorEditorGridPanel");var l=j.getSelectionModel().getSelectedNode();if(l!=null&&l.id>0){var p=n.getStore();var k=true;for(var o=0;o<p.getCount();o++){if(p.getAt(o).data.jobId==l.id){k=false;break;}}if(k){var m={jobId:l.id,jobName:l.text};var i=new p.recordType(m);n.stopEditing();p.add(i);}}},removeAll:function(){var h=Ext.getCmp("JobSelectorEditorGridPanel");var g=h.getSelectionModel().getSelections();var f=h.getStore();for(var e=0;e<g.length;e++){h.stopEditing();f.remove(g[e]);}}};