var UserSubForm=function(d){this.subId=d;var e=this.setup();var f=new Ext.Window({id:"UserSubFormWin",title:"选择添加的下属",iconCls:"btn-mail_recipient",width:600,height:200,modal:true,layout:"fit",maximizable:true,buttonAlign:"center",items:[this.setup()],buttons:[{text:"保存",iconCls:"btn-save",handler:function(){var a=Ext.getCmp("UserSubForm");if(a.getForm().isValid()){a.getForm().submit({method:"post",waitMsg:"正在提交数据...",success:function(c,b){Ext.ux.Toast.msg("操作信息","成功保存信息！");Ext.getCmp("UserSubGrid").getStore().reload();f.close();},failure:function(c,b){Ext.MessageBox.show({title:"操作信息",msg:"信息保存出错，请联系管理员！",buttons:Ext.MessageBox.OK,icon:"ext-mb-error"});f.close();}});}}},{text:"取消",iconCls:"btn-cancel",handler:function(){f.close();}}]});f.show();};UserSubForm.prototype.setup=function(){var b=new Ext.FormPanel({url:__ctxPath+"/system/saveUserSub.do",layout:"form",id:"UserSubForm",border:false,bodyStyle:"padding:5px;",formId:"UserSubFormId",items:[{name:"userSub.subId",id:"subId",xtype:"hidden",value:this.subId==null?"":this.subId},{xtype:"hidden",name:"subUserIds",id:"subUserIds"},{xtype:"compositefield",fieldLabel:"下属",items:[{name:"subUsers",id:"subUsers",xtype:"textarea",readOnly:true,editable:false,allowBlank:false,width:300,height:120},{xtype:"button",text:"选择下属",iconCls:"btn-user-sel",handler:function(){UserSubSelector.getView(function(d,a){Ext.getCmp("subUserIds").setValue(d);Ext.getCmp("subUsers").setValue(a);}).show();}},{xtype:"button",text:"清除",iconCls:"btn-reseted",handler:function(){Ext.getCmp("subUserIds").setValue("");Ext.getCmp("subUsers").setValue("");}}]}]});if(this.subId!=null&&this.subId!="undefined"){b.getForm().load({deferredRender:false,url:__ctxPath+"/system/getUserSub.do?subId="+this.subId,waitMsg:"正在载入数据...",success:function(a,d){},failure:function(a,d){Ext.ux.Toast.msg("编辑","载入失败");}});}return b;};