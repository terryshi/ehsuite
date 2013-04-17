ArchTemplateForm=Ext.extend(Ext.Window,{formPanel:null,constructor:function(b){if(b==null){b={};}Ext.apply(this,b);this.initComponents();ArchTemplateForm.superclass.constructor.call(this,{id:"ArchTemplateFormWin",layout:"fit",items:this.formPanel,modal:true,height:180,width:560,title:"公文模板详细信息",iconCls:"menu-archive-template",buttonAlign:"center",buttons:this.buttons});},initComponents:function(){this.formPanel=new Ext.FormPanel({layout:"form",bodyStyle:"padding:10px 10px 10px 10px",border:false,url:__ctxPath+"/archive/saveArchTemplate.do",id:"ArchTemplateForm",defaults:{anchor:"98%,98%"},defaultType:"textfield",items:[{name:"archTemplate.templateId",id:"templateId",xtype:"hidden",value:this.templateId==null?"":this.templateId},{xtype:"compositefield",fieldLabel:"所属类型",items:[{name:"archTemplate.archivesType.typeName",xtype:"textfield",width:250,value:this.typeName?this.typeName:null,readOnly:true,allowBlank:false},{xtype:"button",text:"选择类型",iconCls:"btn-select",scope:this,handler:function(){var a=this.formPanel;new GlobalTypeSelector({catKey:"ARC_TEM_TYPE",isSingle:true,callback:function(e,f){a.getCmpByName("archTemplate.archivesType.proTypeId").setValue(e);a.getCmpByName("archTemplate.archivesType.typeName").setValue(f);}}).show();}}]},{fieldLabel:"模板名称",name:"archTemplate.tempName",id:"tempName",allowBlank:false},{xtype:"container",layout:"column",style:"padding-left:0px;margin-left:0px;",defaults:{border:false},items:[{width:280,height:36,style:"padding-left:0px;",layout:"form",items:{xtype:"textfield",fieldLabel:"模板文件",name:"archTemplate.tempPath",readOnly:true,id:"tempPath",anchor:"98%,98%"}},{xtype:"button",text:"上传模板",iconCls:"btn-upload",handler:function(){var a=App.createUploadDialog({file_cat:"archive",callback:function(e){for(var f=0;f<e.length;f++){Ext.getCmp("fileId").setValue(e[f].fileId);Ext.getCmp("tempPath").setValue(e[f].filePath);}}});a.show();}},{xtype:"button",text:"在线编辑",iconCls:"btn-edit-online",handler:function(){var a=Ext.getCmp("tempPath").getValue();new OfficeTemplateView(null,a,false,function(f,e){Ext.getCmp("fileId").setValue(f);Ext.getCmp("tempPath").setValue(e);});}}]},{xtype:"hidden",name:"archTemplate.fileId",id:"fileId"},{xtype:"hidden",name:"archTemplate.archivesType.proTypeId",id:"proTypeId",value:this.typeId?this.typeId:null}]});if(this.templateId!=null&&this.templateId!="undefined"){var b=this.formPanel;this.formPanel.getForm().load({deferredRender:false,url:__ctxPath+"/archive/getArchTemplate.do?templateId="+this.templateId,waitMsg:"正在载入数据...",success:function(g,f){var a=f.result;if(a){var h=a.data.archivesType;if(h!=null){b.getCmpByName("archTemplate.archivesType.typeName").setValue(h.typeName);b.getCmpByName("archTemplate.archivesType.proTypeId").setValue(h.typeId);}}},failure:function(a,d){}});}this.buttons=[{text:"保存",iconCls:"btn-save",handler:this.save.createCallback(this.formPanel,this)},{text:"重置",iconCls:"btn-reset",handler:this.reset.createCallback(this.formPanel)},{text:"取消",iconCls:"btn-cancel",handler:this.cancel.createCallback(this)}];},reset:function(b){b.getForm().reset();},cancel:function(b){b.close();},save:function(d,c){if(d.getForm().isValid()){d.getForm().submit({method:"POST",waitMsg:"正在提交数据...",success:function(f,a){Ext.ux.Toast.msg("操作信息","成功保存信息！");var b=Ext.getCmp("ArchTemplateGrid");if(b!=null){b.getStore().reload();}c.close();},failure:function(b,a){Ext.MessageBox.show({title:"操作信息",msg:"信息保存出错，请联系管理员！",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});c.close();}});}}});