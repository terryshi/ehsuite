Ext.ns("ArchivesDraftWin");ArchivesDraftWin=Ext.extend(Ext.Window,{formPanel:null,constructor:function(b){Ext.applyIf(this,b);this.init();ArchivesDraftWin.superclass.constructor.call(this,{title:"发文修改",id:"ArchivesDraftWin",iconCls:"menu-archive-draft",layout:"fit",bodyStyle:"padding:2px 20px 2px 2px;",border:false,modal:true,height:530,width:800,maximizable:true,autoScroll:true,buttonAlign:"center",buttons:[{text:"保存",iconCls:"btn-save",handler:this.onSend,scope:this},{text:"关闭",iconCls:"btn-del",handler:this.closePanel,scope:this}],items:[this.formPanel]});},closePanel:function(){this.close();},onSave:function(h){if(this.formPanel.getForm().isValid()){var g=[];for(var i=0,j=this.store.getCount();i<j;i++){g.push(this.store.getAt(i).data);}var f=this.detailPanel;this.formPanel.getForm().submit({method:"POST",waitMsg:"正在提交数据...",params:{docs:Ext.encode(g)},success:function(b,a){Ext.ux.Toast.msg("操作信息","成功保存信息！");if(f!=null&&f!="undefined"){f.getUpdater().refresh();}h.close();},failure:function(b,a){Ext.MessageBox.show({title:"操作信息",msg:"信息保存出错，请联系管理员！",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});}});}},onSend:function(){this.onSave(this);},addArchiveDoc:function(){var c=this.store;var d=this;new ArchTemplateSelector({callback:function(b){var a=function(f){d.insertNewDoc(c,f);};new ArchivesDocForm({fileId:b,callback:a}).show();}}).show();},insertNewDoc:function(e,f){var d;if(e.recordType){d=new e.recordType();d.data={};d.data["docId"]=f.docId;d.data["fileId"]=f.fileId;d.data["docPath"]=f.docPath;d.data["docName"]=f.docName;d.data["curVersion"]=f.curVersion?f.curVersion:1;d.data.newRecord=true;d.commit();e.add(d);}},addNewArchiveDoc:function(){var d=this.store;var e=this;var f=function(a){e.insertNewDoc(d,a);};new ArchivesDocForm({callback:f}).show();},uploadArchiveDoc:function(){var e=this.store;var f=this;var g=function(a){for(var c=0;c<a.length;c++){var b={docId:0,fileId:a[c].fileId,docPath:a[c].filePath,docName:a[c].fileName,curVersion:1};f.insertNewDoc(e,b);}};var h=App.createUploadDialog({file_cat:"archive",callback:g});h.show();},deleteArchiveDoc:function(){var h=Ext.getCmp("archiveDocGrid");var f=h.getSelectionModel().getSelections();if(f.length==0){Ext.Msg.alert("信息","请选择要查看的文档！");return;}var g=f[0];var j=h.getStore();var i=g.data.docId;Ext.Msg.confirm("信息确认","您确认要删除所选记录吗？",function(a){if(a=="yes"){Ext.Ajax.request({url:__ctxPath+"/archive/multiDelArchivesDoc.do",params:{ids:i},method:"POST",success:function(c,b){Ext.ux.Toast.msg("操作信息","成功删除该文档附件！");j.remove(g);},failure:function(c,b){Ext.ux.Toast.msg("操作信息","操作出错，请联系管理员！");}});}});},detailArchivesDoc:function(){var r=Ext.getCmp("archiveDocGrid");var o=r.getSelectionModel().getSelections();if(o.length==0){Ext.Msg.alert("信息","请选择要查看的文档！");return;}var n=o[0];var j=n.data.docPath;var q=n.data.docId;var p=null;if(n.data.fileAttach){p=n.data.fileAttach.fileId;}else{p=n.data.fileId;}var l=r.getStore();var m=this;var k=function(a){l.remove(n);m.insertNewDoc(l,a);};new ArchivesDocForm({fileId:p,docId:q,docPath:j,callback:k}).show();},init:function(){this.store=new Ext.data.JsonStore({url:__ctxPath+"/archive/listArchivesDoc.do?archivesId="+this.archivesId,root:"result",totalProperty:"totalCounts",remoteSort:true,fields:[{name:"docId",type:"int"},"fileAttach","creator","creatorId","menderId","mender","docName","docStatus","curVersion","docPath","updatetime","createtime"]});this.store.setDefaultSort("docId","desc");if(this.archivesId!=null&&this.archivesId!=""&&this.archivesId!="undefined"){this.store.load();}this.toolbar=new Ext.Toolbar({height:30,items:[{text:"按模板在线添加",iconCls:"menu-archive-template",handler:this.addArchiveDoc,scope:this},"-",{text:"在线添加",iconCls:"btn-edit-online",handler:this.addNewArchiveDoc,scope:this},"-",{text:"上传文档",iconCls:"btn-upload",handler:this.uploadArchiveDoc,scope:this},"-",{text:"删除附件文档",iconCls:"btn-del",scope:this,handler:this.deleteArchiveDoc},"-",{text:"查看修改文档",iconCls:"menu-archive-issue-manage",scope:this,handler:this.detailArchivesDoc}]});var c=new Ext.grid.CheckboxSelectionModel({singleSelect:true});this.docGridPanel=new Ext.grid.EditorGridPanel({title:"公文正文",iconCls:"menu-attachment",border:true,id:"archiveDocGrid",autoHeight:true,store:this.store,tbar:this.toolbar,sm:c,columns:[new Ext.grid.RowNumberer(),c,{dataIndex:"docId",hidden:true},{dataIndex:"fileAttach",hidden:true,renderer:function(a){}},{dataIndex:"docStatus",hidden:true},{dataIndex:"menderId",hidden:true},{dataIndex:"creatorId",hidden:true},{dataIndex:"docName",width:150,header:"文档名称"},{dataIndex:"docPath",header:"文档路径",width:300},{dataIndex:"curVersion",header:"当前版本",renderer:function(a){return"第"+a+"版";}},{header:"管理",width:100,dataIndex:"docId",sortable:false,renderer:function(i,j,l,a,k){var b="";b+='<button title="历史版本" value=" " class="btn-archive-history" onclick="ArchivesDraftWin.attach('+i+')">&nbsp;&nbsp;</button>';return b;}}]});this.formPanel=new Ext.FormPanel({bodyStyle:"padding: 4px 8px 4px 8px",layout:"form",autoHeight:true,url:__ctxPath+"/archive/saveIssueArchives.do",items:[{name:"archives.archivesId",id:"archivesWin.archivesId",xtype:"hidden",value:this.archivesId==null?"":this.archivesId},{xtype:"compositefield",fieldLabel:"所属类型",items:[{name:"archives.typeName",xtype:"textfield",width:250,readOnly:true,allowBlank:false},{xtype:"button",text:"选择类型",iconCls:"btn-select",scope:this,handler:function(){var a=this;new GlobalTypeSelector({catKey:"ARCHIVES_TYPE",isSingle:true,callback:function(b,f){a.getCmpByName("archives.typeId").setValue(b);a.getCmpByName("archives.typeName").setValue(f);}}).show();}}]},{xtype:"fieldset",title:"发文设置",border:true,defaults:{anchor:"98%,98%"},items:[{layout:"form",border:false,items:{fieldLabel:"发文字号",name:"archives.archivesNo",id:"archivesWin.archivesNo",xtype:"textfield",allowBlank:false,anchor:"100%"}},{layout:"form",border:false,style:"padding:0px 0px 7px 0px;",defaults:{anchor:"96%,96%"},items:[{layout:"column",border:false,items:[{layout:"form",anchor:"99%",style:"padding:0px 0px 0px 0px;",border:false,items:{fieldLabel:"密级",width:200,name:"archives.privacyLevel",id:"archivesWin.privacyLevel",triggerAction:"all",lazyRender:true,allowBlank:false,emptyText:"选择密级",xtype:"combo",store:["普通","秘密","机密","绝密"]}},{layout:"form",border:false,items:{fieldLabel:"紧急程度",width:200,name:"archives.urgentLevel",id:"archivesWin.urgentLevel",triggerAction:"all",lazyRender:true,allowBlank:false,emptyText:"选择紧急程度",xtype:"combo",store:["普通","紧急","特急","特提"]}}]}]},{fieldLabel:"文件标题",name:"archives.subject",id:"archivesWin.subject",xtype:"textfield",allowBlank:false},{xtype:"container",layout:"column",style:"padding-left:0px;margin-left:0px;",height:30,defaults:{border:false},items:[{xtype:"label",text:"发文机关或部门",style:"padding:0px 0px 0px 0px;",width:105},{name:"archives.issueDep",id:"archivesWin.issueDep",xtype:"textfield",width:"70%",allowBlank:false,readOnly:true},{name:"archives.depId",id:"archivesWin.depId",xtype:"hidden"},{xtype:"button",iconCls:"menu-department",text:"选择部门",handler:function(){DepSelector.getView(function(b,a){Ext.getCmp("archivesWin.issueDep").setValue(a);Ext.getCmp("archivesWin.depId").setValue(b);},true).show();}}]},{xtype:"container",layout:"column",style:"padding:0px 0px 8px 0px;margin-left:0px;",defaults:{border:false},items:[{xtype:"label",style:"padding:0px 0px 0px 0px;",text:"接收单位或部门",width:105},{xtype:"textarea",name:"archives.recDepNames",width:"70%",readOnly:true,id:"archivesWin.recDepNames"},{xtype:"hidden",name:"archives.recDepIds",id:"archivesWin.recDepIds"},{xtype:"button",iconCls:"menu-department",text:"选择部门",handler:function(){DepSelector.getView(function(b,a){Ext.getCmp("archivesWin.recDepIds").setValue(b);Ext.getCmp("archivesWin.recDepNames").setValue(a);},false).show();}}]},{fieldLabel:"主题词",name:"archives.keywords",id:"archivesWin.keywords",xtype:"textfield"},{fieldLabel:"内容简介",name:"archives.shortContent",id:"archivesWin.shortContent",xtype:"textarea"},{fieldLabel:"公文来源",name:"archives.sources",id:"archivesWin.sources",xtype:"textfield"},{name:"archives.typeId",xtype:"hidden"}]},this.docGridPanel]});if(this.archivesId!=null&&this.archivesId!="undefined"){var d=this.formPanel;this.formPanel.loadData({root:"data",preName:"archives",url:__ctxPath+"/archive/getIssueArchives.do?archivesId="+this.archivesId,success:function(b,a){},failure:function(b,a){}});}}});ArchivesDraftWin.attach=function(k){var l=Ext.getCmp("archiveDocGrid");var n=l.getSelectionModel().getSelections();if(n.length==0){Ext.Msg.alert("信息","请选择要查看的文档！");return;}var h=n[0];var i=Ext.getCmp("ArchivesDraftWin");var m=l.getStore();var j=function(a){m.remove(h);i.insertNewDoc(m,a);};new ArchivesDocHistoryWin({docId:k,callback:j}).show();};