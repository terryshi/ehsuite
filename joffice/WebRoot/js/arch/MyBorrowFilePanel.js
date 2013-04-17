MyBorrowFilePanel=Ext.extend(Ext.Panel,{constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();MyBorrowFilePanel.superclass.constructor.call(this,{buttonAlign:"center",region:"center",layout:"card",activeItem:0,border:false,defaults:{anchor:"98%,98%"},items:[this.fileTypePanel,this.fileListPanel],listeners:{"afterlayout":function(a){}}});},initUIComponents:function(){this.returnButton=new Ext.Button({text:"返回",iconCls:"btn-reset",scope:this,handler:this.activeItem_0});this.fileListPanel=new MyBorrowFileListPanel({borrowNum:this.borrowNum,forceLayout:true,frame:false,height:400,border:false,defaults:{anchor:"96%,96%"}});this.fileListPanel.searchPanel.addButton(this.returnButton);this.fileTypePanel=new MyBorrowFileTypePanel({forceLayout:true,height:200,border:true,defaults:{anchor:"96%,96%"}}).show();this.fileTypePanel.store.on("beforeload",function(b){if(this.recordId){b.baseParams={"Q_borrowRecord.recordId_L_EQ":this.recordId,start:0,limit:25};}else{return false;}},this);this.fileTypePanel.store.load();this.fileTypePanel.rowActions.on("action",this.onRowAction,this);},rowClick:function(e,f,h){var g=this.id;e.getSelectionModel().each(function(a){Ext.getCmp(g).activeItem_1(a);});},activeItem_1:function(e){var f=this.id;if(e.data.listType=="全宗"){this.getLayout().setActiveItem(1);this.fileListPanel.reset();this.fileListPanel.afNo.readOnly=true;this.fileListPanel.rollNo.readOnly=false;this.fileListPanel.afNo.setEditable(false),this.fileListPanel.rollNo.setEditable(true),this.fileListPanel.afNo.setValue(e.data.archFond.archFondId);this.fileListPanel.rollNo.getStore().load({params:{"Q_archFond.archFondId_L_EQ":e.data.archFond.archFondId}});this.fileListPanel.rollNo.setValue("");var d=this.fileListPanel.leftPanel.findByType("treepanel")[0];d.loader=new Ext.tree.TreeLoader({baseParams:{"Q_archFondId_L_EQ":e.data.archFond.archFondId},dataUrl:__ctxPath+"/arch/listRollTreeArchFond.do?sno="+new Date(),requestMethod:"GET"});d.root.reload();this.fileListPanel.search();Ext.getCmp(f).setTitle("借阅清单>>全宗号:"+e.data.archFond.afNo);Ext.getCmp(f).doLayout();}else{if(e.data.listType=="案卷"){this.getLayout().setActiveItem(1);this.fileListPanel.reset();this.fileListPanel.afNo.readOnly=true;this.fileListPanel.rollNo.readOnly=true;this.fileListPanel.afNo.setEditable(false),this.fileListPanel.rollNo.setEditable(false),this.fileListPanel.afNo.setValue(e.data.archFond.archFondId);this.fileListPanel.rollNo.getStore().load();this.fileListPanel.rollNo.setValue(e.data.archRoll.rollNo);var d=this.fileListPanel.leftPanel.findByType("treepanel")[0];d.loader=new Ext.tree.TreeLoader({baseParams:{"Q_archFondId_L_EQ":e.data.archFond.archFondId,"Q_rollNo_S_LK":e.data.archRoll.rollNo},dataUrl:__ctxPath+"/arch/listRollTreeArchFond.do?sno="+new Date(),requestMethod:"POST"});d.root.reload();this.fileListPanel.search();Ext.getCmp(f).setTitle("借阅清单>>案卷号:"+e.data.archRoll.rollNo);Ext.getCmp(f).doLayout();}else{if(e.data.listType=="文件"){new MyBorrowFileViewWindow({rollFileId:e.data.rollFile.rollFileId}).show();}}}this.doLayout(true,true);},activeItem_0:function(){this.getLayout().setActiveItem(0);if(this.showFlag){if(this.showFlag=="check"){Ext.getCmp(this.id).setTitle("借阅清单");}else{if(this.showFlag=="view"){Ext.getCmp(this.id).setTitle("我的借阅>>编号："+this.borrowNum);}}}Ext.getCmp(this.id).doLayout();},viewFile:function(b){Ext.Ajax.request({url:__ctxPath+"/arch/listRollFileList.do",method:"POST",success:function(a,g){var f=Ext.decode(a.responseText);var h=[];for(i=0;i<f.result.length;i++){h.push({fileName:f.result[i].fileAttach.fileName,filePath:f.result[i].fileAttach.filePath});}new ViewFileWindow({viewConfig:h,startIndex:0}).show();},failure:function(a,d){},params:{"Q_rollFile.rollFileId_L_EQ":b.data.rollFile.rollFileId,dir:"ASC",sort:"sn"}});},onRowAction:function(k,g,j,h,f){switch(j){case"btn-showDetail":this.activeItem_1(g);break;case"btn-readdocument":this.viewFile.call(this,g);break;default:break;}}});