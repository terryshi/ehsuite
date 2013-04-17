PaintTemplateForm=Ext.extend(Ext.Window,{constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();PaintTemplateForm.superclass.constructor.call(this,{id:"PaintTemplateFormWin",layout:"fit",items:this.formPanel,modal:true,height:200,width:500,maximizable:true,title:"模板详细信息",buttonAlign:"center",buttons:[{text:"保存",iconCls:"btn-save",scope:this,handler:this.save},{text:"重置",iconCls:"btn-reset",scope:this,handler:this.reset},{text:"取消",iconCls:"btn-cancel",scope:this,handler:this.cancel}]});},initUIComponents:function(){this.formPanel=new Ext.FormPanel({layout:"form",bodyStyle:"padding:10px",border:false,autoScroll:true,defaults:{anchor:"96%,96%"},defaultType:"textfield",items:[{name:"paintTemplate.ptemplateId",xtype:"hidden",value:this.ptemplateId==null?"":this.ptemplateId},{name:"paintTemplate.fileId",xtype:"hidden"},{fieldLabel:"模板名称",name:"paintTemplate.templateName",allowBlank:false,maxLength:64},{fieldLabel:"是否启用",name:"paintTemplate.isActivate",allowBlank:false,xtype:"hidden",value:0},{xtype:"container",layout:"column",style:"padding-left:0px;margin-left:0px;",defaults:{border:false},items:[{width:340,height:36,style:"padding-left:0px;",layout:"form",items:{xtype:"textfield",fieldLabel:"模板文件",name:"paintTemplate.path",readOnly:true,anchor:"98%,98%"}},{xtype:"button",text:"上传模板",iconCls:"btn-upload",scope:this,handler:function(){var d=this.formPanel;var c=App.createUploadDialog({permitted_extensions:["doc","docx"],file_cat:"document",callback:function(a){if(a.length>0){d.getCmpByName("paintTemplate.fileId").setValue(a[0].fileId);d.getCmpByName("paintTemplate.path").setValue(a[0].filepath);}}});c.show();}}]}]});if(this.ptemplateId!=null&&this.ptemplateId!="undefined"){this.formPanel.loadData({url:__ctxPath+"/document/getPaintTemplate.do?ptemplateId="+this.ptemplateId,root:"data",preName:"paintTemplate"});}},reset:function(){this.formPanel.getForm().reset();},cancel:function(){this.close();},save:function(){$postForm({formPanel:this.formPanel,scope:this,url:__ctxPath+"/document/savePaintTemplate.do",callback:function(e,f){var d=Ext.getCmp("PaintTemplateGrid");if(d!=null){d.getStore().reload();}this.close();}});}});