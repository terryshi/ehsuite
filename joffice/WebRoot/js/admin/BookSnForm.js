var BookSnForm=function(e){this.bookSnId=e;var d=this.setup();var f=new Ext.Window({id:"BookSnFormWin",title:"图书Sn详细信息",width:500,height:420,modal:true,layout:"anchor",plain:true,bodyStyle:"padding:5px;",buttonAlign:"center",items:[this.setup()],buttons:[{text:"保存",handler:function(){var a=Ext.getCmp("BookSnForm");if(a.getForm().isValid()){a.getForm().submit({method:"post",waitMsg:"正在提交数据...",success:function(c,b){Ext.ux.Toast.msg("操作信息","成功保存信息！");Ext.getCmp("BookSnGrid").getStore().reload();f.close();},failure:function(c,b){Ext.MessageBox.show({title:"操作信息",msg:"信息保存出错，请联系管理员！",buttons:Ext.MessageBox.OK,icon:"ext-mb-error"});f.close();}});}}},{text:"取消",handler:function(){f.close();}}]});f.show();};BookSnForm.prototype.setup=function(){var b=new Ext.FormPanel({url:__ctxPath+"/admin/saveBookSn.do",layout:"form",id:"BookSnForm",frame:true,defaults:{widht:400,anchor:"100%,100%"},formId:"BookSnFormId",defaultType:"textfield",items:[{name:"bookSn.bookSnId",id:"bookSnId",xtype:"hidden",value:this.bookSnId==null?"":this.bookSnId},{fieldLabel:"图书ID",name:"bookSn.book.bookId",id:"bookId",allowBlank:false,blankText:"图书ID不能为空"},{fieldLabel:"图书SN号",name:"bookSn.bookSN",id:"bookSN",allowBlank:false,blankText:"图书SN不能为空"},{xtype:"label",text:"借阅状态:"},{hiddenName:"bookSn.status",id:"status",xtype:"combo",mode:"local",editable:false,triggerAction:"all",emptyText:"请选择",store:[["0","未借出"],["1","已借出"],["2","预订"],["3","注销"]]}]});if(this.bookSnId!=null&&this.bookSnId!="undefined"){b.getForm().load({deferredRender:false,url:__ctxPath+"/admin/getBookSn.do?bookSnId="+this.bookSnId,method:"post",waitMsg:"正在载入数据...",success:function(a,d){},failure:function(a,d){}});}return b;};