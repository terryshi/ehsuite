var BookTypeForm=function(d){this.typeId=d;var e=this.setup();var f=new Ext.Window({id:"BookTypeFormWin",title:"图书类别详细信息",iconCls:"menu-book-type",height:100,width:300,modal:true,layout:"fit",border:false,buttonAlign:"center",items:[this.setup()],buttons:[{text:"保存",iconCls:"btn-save",handler:function(){var a=Ext.getCmp("bookTypeForm");if(a.getForm().isValid()){a.getForm().submit({method:"post",waitMsg:"正在提交数据...",success:function(c,b){Ext.ux.Toast.msg("操作信息","成功保存信息！");if(Ext.getCmp("BookTypeGrid")!=null){Ext.getCmp("BookTypeGrid").getStore().reload();}if(Ext.getCmp("leftBookManagePanel")!=null){Ext.getCmp("leftBookManagePanel").root.reload();}f.close();},failure:function(c,b){Ext.MessageBox.show({title:"操作信息",msg:"信息保存出错，请联系管理员！",buttons:Ext.MessageBox.OK,icon:"ext-mb-error"});f.close();}});}}},{text:"取消",iconCls:"btn-cancel",handler:function(){f.close();}}]});f.show();};BookTypeForm.prototype.setup=function(){var b=new Ext.FormPanel({url:__ctxPath+"/admin/saveBookType.do",layout:"form",id:"bookTypeForm",bodyStyle:"padding:5px;",frame:false,defaults:{anchor:"95%,95%"},formId:"BookTypeFormId",defaultType:"textfield",items:[{name:"bookType.typeId",id:"typeId",xtype:"hidden",value:this.typeId==null?"":this.typeId},{fieldLabel:"图书类别名称",name:"bookType.typeName",id:"typeName",allowBlank:false,blankText:"图书类别不能为空"}]});if(this.typeId!=null&&this.typeId!="undefined"){b.getForm().load({deferredRender:false,url:__ctxPath+"/admin/getBookType.do?typeId="+this.typeId,method:"post",waitMsg:"正在载入数据...",success:function(a,d){},failure:function(a,d){}});}return b;};