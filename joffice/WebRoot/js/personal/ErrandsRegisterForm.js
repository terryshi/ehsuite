var ErrandsRegisterForm=function(f){this.dateId=f;var e=this.setup();var d=new Ext.Window({id:"ErrandsRegisterFormWin",title:"请假单详细信息",width:400,height:250,modal:true,layout:"fit",buttonAlign:"center",items:[this.setup()],buttons:[{text:"保存",iconCls:"btn-save",handler:function(){var a=Ext.getCmp("ErrandsRegisterForm");if(a.getForm().isValid()){a.getForm().submit({method:"post",waitMsg:"正在提交数据...",success:function(c,b){Ext.ux.Toast.msg("操作信息","成功保存信息！");Ext.getCmp("ErrandsRegisterGrid").getStore().reload();d.close();},failure:function(c,b){Ext.MessageBox.show({title:"操作信息",msg:"信息保存出错，请联系管理员！",buttons:Ext.MessageBox.OK,icon:"ext-mb-error"});d.close();}});}}},{text:"取消",iconCls:"btn-cancel",handler:function(){d.close();}}]});d.show();};ErrandsRegisterForm.prototype.setup=function(){var b=new Ext.FormPanel({url:__ctxPath+"/personal/saveErrandsRegister.do",layout:"form",id:"ErrandsRegisterForm",border:false,bodyStyle:"padding:5px;",defaults:{width:400,anchor:"98%,98%"},formId:"ErrandsRegisterFormId",defaultType:"textfield",items:[{name:"errandsRegister.dateId",id:"dateId",xtype:"hidden",value:this.dateId==null?"":this.dateId},{name:"errandsRegister.flag",id:"flag",xtype:"hidden",value:1},{xtype:"hidden",name:"errandsRegister.userId",id:"userId"},{xtype:"hidden",name:"errandsRegister.status",id:"status"},{xtype:"hidden",name:"errandsRegister.approvalOption",id:"approvalOption"},{xtype:"hidden",name:"errandsRegister.approvalName",id:"approvalName"},{fieldLabel:"描述",xtype:"textarea",name:"errandsRegister.descp",allowBlank:false,id:"descp"},{fieldLabel:"开始时间",name:"errandsRegister.startTime",xtype:"datetimefield",format:"Y-m-d H:i:s",allowBlank:false,id:"startTime"},{fieldLabel:"结束时间",name:"errandsRegister.endTime",xtype:"datetimefield",format:"Y-m-d H:i:s",allowBlank:false,id:"endTime"},{fieldLabel:"审批人",hiddenName:"errandsRegister.approvalId",id:"approvalId",emptyText:"请选择审批人",xtype:"combo",mode:"local",anchor:"98%",allowBlank:false,editable:false,valueField:"id",displayField:"name",triggerAction:"all",store:new Ext.data.SimpleStore({autoLoad:true,url:__ctxPath+"/system/upUserAppUser.do",fields:["id","name"]}),listeners:{select:function(e,a,f){Ext.getCmp("approvalName").setValue(a.data.name);}}}]});if(this.dateId!=null&&this.dateId!="undefined"){b.getForm().load({deferredRender:false,url:__ctxPath+"/personal/getErrandsRegister.do?dateId="+this.dateId,waitMsg:"正在载入数据...",success:function(h,g){var a=g.result.data;var i=getDateFromFormat(a.startTime,"yyyy-MM-dd HH:mm:ss");var j=getDateFromFormat(a.endTime,"yyyy-MM-dd HH:mm:ss");Ext.getCmp("startTime").setValue(new Date(i));Ext.getCmp("endTime").setValue(new Date(j));},failure:function(a,d){Ext.ux.Toast.msg("编辑","载入失败");}});}return b;};