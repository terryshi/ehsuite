MakeSealForm=Ext.extend(Ext.Window,{formPanel:null,toolbar:null,constructor:function(b){Ext.applyIf(this,b);this.initUI();MakeSealForm.superclass.constructor.call(this,{title:"在线制作电子印章",width:580,height:440,shim:false,modal:true,tbar:this.toolbar,iconCls:"menu-seal",layout:"fit",maximizable:true,buttonAlign:"center",buttons:this.buttons,items:[this.formPanel]});},initUI:function(){Ext.useShims=true;this.ekeyPanel=new NtkoSignPanel({height:200,border:true});this.formPanel=new Ext.FormPanel({layout:"form",defaults:{anchor:"98%,98%"},defaultType:"textfield",items:[this.ekeyPanel,{xtype:"hidden",name:"seal.sealId",value:this.sealId?this.sealId:""},{xtype:"hidden",name:"seal.fileId"},{xtype:"hidden",name:"seal.sealPath"},{fieldLabel:"印章名称",allowBlank:false,name:"seal.sealName"},{fieldLabel:"印章使用者",allowBlank:false,name:"seal.belongName"},{fieldLabel:"印章口令[6-32位]",inputType:"password",allowBlank:false,name:"sealPassword",minLength:6,maxLength:32},{fieldLabel:"印章序列号[只读]",allowBlank:false,name:"sealSN",readOnly:true}]});this.toolbar=new Ext.Toolbar({items:[{iconCls:"btn-add",text:"打开本地印章",scope:this,handler:this.openSign},{text:"新建",iconCls:"btn-add",scope:this,handler:this.newSign},{text:"保存",iconCls:"btn-save",scope:this,handler:this.saveSign}]});this.buttons=[{xtype:"button",text:"关闭",iconCls:"btn-cancel",scope:this,handler:function(){this.close();}}];if(this.sealId!=""&&this.sealId!=null&&this.sealId!=undefined){if(this.fileId!=""&&this.fileId!=null&&this.fileId!=undefined){var b=this.ekeyPanel.openFormURL(this.fileId,null);if(0!=b.StatusCode){this.formPanel.getCmpByName("seal.sealId").setValue("");this.fileId="";return;}this.setValue(b);}}},openSign:function(){var b=this.ekeyPanel.getEkeyObject();b.IsShowRect=false;b.OpenFromLocal("",true);if(0!=b.StatusCode){return;}this.formPanel.getCmpByName("seal.sealId").setValue("");this.fileId="";this.setValue(b);},newSign:function(){var b=this.ekeyPanel.getEkeyObject();b.IsShowRect=false;b.CreateNew();if(0!=b.StatusCode){return;}this.formPanel.getCmpByName("seal.sealId").setValue("");this.fileId="";this.setValue(b);},saveSign:function(){if(this.formPanel.getForm().isValid()){var h="";h=this.fileId?this.fileId:"";var j="";var i=this.formPanel.getCmpByName("seal.sealName").getValue();var l=this.formPanel.getCmpByName("seal.belongName").getValue();var g=this.formPanel.getCmpByName("sealPassword").getValue();var k=this.save(h,i,l,g);if(k&&k.success){h=k.fileId;j=k.filePath;this.formPanel.getCmpByName("seal.fileId").setValue(h);this.formPanel.getCmpByName("seal.sealPath").setValue(j);$postForm({formPanel:this.formPanel,scope:this,url:__ctxPath+"/document/saveSeal.do",callback:function(c,a){var b=Ext.getCmp("SealGrid");if(b!=null){b.getStore().reload();}this.close();}});}}},save:function(g,i,k,l){var h=this.ekeyPanel.save(g,i,k,l);var j=Ext.util.JSON.decode(h);if(j&&j.success){return j;}else{return{success:false};}},setValue:function(b){this.formPanel.getCmpByName("seal.sealName").setValue(b.SignName);this.formPanel.getCmpByName("seal.belongName").setValue(b.SignUser);this.formPanel.getCmpByName("sealPassword").setValue(b.Password);this.formPanel.getCmpByName("sealSN").setValue(b.SignSN);}});