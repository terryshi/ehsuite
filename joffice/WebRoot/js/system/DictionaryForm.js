DictionaryForm=Ext.extend(Ext.Window,{formPanel:null,constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();DictionaryForm.superclass.constructor.call(this,{layout:"fit",id:"DictionaryFormWin",iconCls:"menu-dictionary",items:this.formPanel,title:"字典详细信息",width:380,height:220,modal:true,buttonAlign:"center",buttons:this.buttons});},initUIComponents:function(){this.formPanel=new Ext.FormPanel({url:__ctxPath+"/system/saveDictionary.do",layout:"form",id:"DictionaryForm",bodyStyle:"padding:5px",border:false,formId:"DictionaryFormId",defaultType:"textfield",defaults:{anchor:"98%,98%"},items:[{name:"dictionary.dicId",id:"dicId",xtype:"hidden",value:this.dicId==null?"":this.dicId},{xtype:"hidden",value:this.parentId,name:"parentId"},{xtype:"hidden",id:"itemName",name:"dictionary.itemName",value:this.typeName},{xtype:"hidden",id:"sn",name:"dictionary.sn",value:0},{fieldLabel:"所属分类",xtype:"label",text:this.typeName},{fieldLabel:"数值",name:"dictionary.itemValue",id:"itemValue"},{fieldLabel:"备注",name:"dictionary.descp",id:"descp",xtype:"textarea"}]});if(this.dicId!=null&&this.dicId!="undefined"){this.formPanel.getForm().load({deferredRender:false,url:__ctxPath+"/system/getDictionary.do?dicId="+this.dicId,waitMsg:"正在载入数据...",success:function(d,c){},failure:function(d,c){}});}this.buttons=[{text:"保存",iconCls:"btn-save",handler:this.save.createCallback(this.formPanel,this)},{text:"重置",iconCls:"btn-reset",handler:this.reset.createCallback(this.formPanel)},{text:"取消",iconCls:"btn-cancel",handler:this.cancel.createCallback(this)}];},reset:function(b){b.getForm().reset();},cancel:function(b){b.close();},save:function(e,d){var f=d.callback;if(e.getForm().isValid()){e.getForm().submit({method:"POST",waitMsg:"正在提交数据...",success:function(b,a){Ext.ux.Toast.msg("操作信息","成功保存信息！");if(d.callback){d.callback.call(this);}d.close();},failure:function(b,a){Ext.MessageBox.show({title:"操作信息",msg:"信息保存出错，请联系管理员！",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});d.close();}});}}});