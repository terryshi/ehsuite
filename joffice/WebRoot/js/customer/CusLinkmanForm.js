CusLinkmanForm=Ext.extend(Ext.Window,{formPanel:null,constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();CusLinkmanForm.superclass.constructor.call(this,{layout:"fit",id:"CusLinkmanFormWin",iconCls:"menu-cusLinkman",title:"联系人详细信息",width:500,height:410,minWidth:499,minHeight:409,items:this.formPanel,maximizable:true,border:false,modal:true,plain:true,buttonAlign:"center",buttons:this.buttons});},initUIComponents:function(){this.formPanel=new Ext.FormPanel({url:__ctxPath+"/customer/saveCusLinkman.do",layout:"form",bodyStyle:"padding:5px;",id:"CusLinkmanForm",frame:false,defaults:{widht:400,anchor:"100%,100%"},formId:"CusLinkmanFormId",defaultType:"textfield",items:[{name:"cusLinkman.linkmanId",id:"linkmanId",xtype:"hidden",value:this.linkmanId==null?"":this.linkmanId},{name:"cusLinkman.customerId",id:"customerId",xtype:"hidden",value:this.customerName==null?"":this.customerName},{xtype:"compositefield",fieldLabel:"所属客户*",items:[{xtype:"textfield",width:220,readOnly:true,name:"customerName",id:"customerName"},{xtype:"button",name:"custoemrSelect",id:"customerSelectButton",text:"选择客户",iconCls:"btn-mail_recipient",handler:function(){CustomerSelector.getView(function(c,d){Ext.getCmp("customerId").setValue(c);Ext.getCmp("customerName").setValue(d);},true).show();}}]},{fieldLabel:'姓名<a style="color:red;">*</a>',name:"cusLinkman.fullname",id:"fullname",allowBlank:false,blankText:"联系人姓名不能为空!"},{fieldLabel:'性别<a style="color:red;">*</a>',hiddenName:"cusLinkman.sex",id:"sex",xtype:"combo",mode:"local",editable:false,triggerAction:"all",store:[["1","先生"],["0","女士"]],value:1},{fieldLabel:'手机<a style="color:red;">*</a>',xtype:"numberfield",name:"cusLinkman.mobile",id:"mobile",allowBlank:false,blankText:"联系人手机不能为空!"},{fieldLabel:'主要联系人<a style="color:red;">*</a>',hiddenName:"cusLinkman.isPrimary",id:"isPrimary",xtype:"combo",mode:"local",editable:false,triggerAction:"all",store:[["1","是(每个客户只能有一个主要联系人)"],["0","否"]],value:0},{fieldLabel:"职位",name:"cusLinkman.position",id:"position"},{xtype:"tabpanel",activeTab:0,defaultType:"panel",plain:true,height:180,bodyStyle:"padding : 5px;",items:[{title:"联系方式",layout:"form",defaultType:"textfield",defaults:{widht:400,anchor:"100%,100%"},items:[{fieldLabel:"Email",name:"cusLinkman.email",id:"email",vtype:"email",vtypeText:"邮箱格式不正确!"},{fieldLabel:"电话",name:"cusLinkman.phone",id:"phone"},{fieldLabel:"MSN",name:"cusLinkman.msn",id:"msn"},{fieldLabel:"QQ",xtype:"numberfield",name:"cusLinkman.qq",id:"qq"},{fieldLabel:"传真",name:"cusLinkman.fax",id:"fax"}]},{title:"扩展信息",layout:"form",defaultType:"textfield",defaults:{widht:400,anchor:"100%,100%"},items:[{fieldLabel:"邮编",xtype:"numberfield",name:"cusLinkman.homeZip",id:"homeZip"},{fieldLabel:"家庭住址",name:"cusLinkman.homeAddress",id:"homeAddress"},{fieldLabel:"家庭电话",name:"cusLinkman.homePhone",id:"homePhone"},{fieldLabel:"生日",xtype:"datefield",format:"Y-m-d",name:"cusLinkman.birthday",id:"birthday"},{fieldLabel:"爱好",name:"cusLinkman.hobby",id:"hobby"}]},{title:"其它信息",layout:"form",defaultType:"textarea",defaults:{widht:400,anchor:"100%,100%"},items:[{fieldLabel:"备注",name:"cusLinkman.notes",id:"notes",height:126}]}]}]});if(this.linkmanId!=null&&this.linkmanId!="undefined"&&this.linkmanId!=""){this.formPanel.getForm().load({deferredRender:false,url:__ctxPath+"/customer/getCusLinkman.do?linkmanId="+this.linkmanId,waitMsg:"正在载入数据...",success:function(d,c){Ext.getCmp("customerName").setValue(c.result.data.customer.customerName);},failure:function(d,c){Ext.ux.Toast.msg("编辑","载入失败");}});}this.buttons=[{text:"保存",iconCls:"btn-save",handler:function(){var b=Ext.getCmp("CusLinkmanForm");if(b.getForm().isValid()){b.getForm().submit({method:"post",waitMsg:"正在提交数据...",success:function(g,f){Ext.ux.Toast.msg("操作信息","成功保存信息！");var a=Ext.getCmp("CusLinkmanGrid");var h=Ext.getCmp("ManageLinkmanGrid");if(a!=null){a.getStore().reload();}if(h!=null){h.getStore().reload();}Ext.getCmp("CusLinkmanFormWin").close();},failure:function(a,d){Ext.MessageBox.show({title:"操作信息",msg:d.result.msg,buttons:Ext.MessageBox.OK,icon:"ext-mb-error"});}});}}},{text:"取消",iconCls:"btn-cancel",handler:function(){Ext.getCmp("CusLinkmanFormWin").close();}}];}});