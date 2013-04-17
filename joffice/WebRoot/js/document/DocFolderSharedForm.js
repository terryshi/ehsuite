DocFolderSharedForm=Ext.extend(Ext.Window,{formPanel:null,constructor:function(b){Ext.applyIf(this,b);this.initUI();DocFolderSharedForm.superclass.constructor.call(this,{title:"文件夹授权",iconCls:"menu-public-fol",width:620,height:420,modal:true,layout:"fit",scope:this,buttonAlign:"center",items:this.formPanel,buttons:this.buttons});},initUI:function(){this.formPanel=new Ext.FormPanel({items:[{xtype:"hidden",name:"privilegeId"},{xtype:"hidden",name:"folderId",value:this.folderId},{xtype:"fieldset",border:false,layout:"column",items:[{xtype:"label",text:"共享人员",width:100},{xtype:"hidden",name:"userIds",id:"userIds"},{xtype:"textarea",name:"userNames",id:"userNames",width:300},{xtype:"button",text:"选择",iconCls:"btn-select",width:80,handler:function(){UserSelector.getView(function(g,k){var h=Ext.getCmp("userIds");var j=Ext.getCmp("userNames");if(h.getValue()==""){h.setValue(g);j.setValue(k);return;}var i=h.getValue().split(",");var l=j.getValue().split(",");h.setValue(uniqueArray(i.concat(g.split(","))));j.setValue(uniqueArray(l.concat(k.split(","))));}).show();}},{xtype:"button",iconCls:"btn-clear",text:"清空",handler:function(){var d=Ext.getCmp("userIds");var c=Ext.getCmp("userNames");d.setValue("");c.setValue("");},width:80}]},{xtype:"fieldset",border:false,layout:"column",items:[{xtype:"label",text:"共享部门",width:100},{name:"depIds",id:"depIds",xtype:"hidden"},{name:"depNames",id:"depNames",xtype:"textarea",width:300},{xtype:"button",text:"选择",iconCls:"btn-select",width:80,handler:function(){DepSelector.getView(function(l,j){var g=Ext.getCmp("depIds");var k=Ext.getCmp("depNames");if(g.getValue()==""){g.setValue(l);k.setValue(j);return;}var i=g.getValue().split(",");var h=k.getValue().split(",");g.setValue(uniqueArray(i.concat(l.split(","))));k.setValue(uniqueArray(h.concat(j.split(","))));}).show();}},{xtype:"button",text:"清空",iconCls:"btn-clear",handler:function(){var d=Ext.getCmp("depIds");var c=Ext.getCmp("depNames");d.setValue("");c.setValue("");},width:80}]},{xtype:"fieldset",border:false,layout:"column",items:[{xtype:"label",text:"共享角色",width:100},{xtype:"hidden",id:"roleIds",name:"roleIds"},{name:"roleNames",id:"roleNames",xtype:"textarea",width:300},{xtype:"button",text:"选择",iconCls:"btn-select",width:80,handler:function(){RoleSelector.getView(function(k,j){var h=Ext.getCmp("roleIds");var g=Ext.getCmp("roleNames");if(h.getValue()==""){h.setValue(k);g.setValue(j);return;}var i=h.getValue().split(",");var l=g.getValue().split(",");h.setValue(uniqueArray(i.concat(k.split(","))));g.setValue(uniqueArray(l.concat(j.split(","))));}).show();}},{xtype:"button",text:"清空",iconCls:"btn-clear",handler:function(){var d=Ext.getCmp("roleIds");var c=Ext.getCmp("roleNames");d.setValue("");c.setValue("");},width:80}]},{xtype:"fieldset",border:false,layout:"column",items:[{xtype:"label",text:"权限选择：",width:100},{xtype:"checkbox",name:"rightR",id:"rightR"},{xtype:"label",text:"可读",width:60},{xtype:"checkbox",name:"rightU",id:"rightU",listeners:{"check":function(){var d=Ext.getCmp("rightU");var e=Ext.getCmp("rightD");var f=Ext.getCmp("rightR");if(d.getValue()){f.setValue(true);f.disable();}else{if(!e.getValue()){f.enable();}}}}},{xtype:"label",text:"可修改",width:60},{xtype:"checkbox",name:"rightD",id:"rightD",listeners:{"check":function(){var e=Ext.getCmp("rightD");var d=Ext.getCmp("rightU");var f=Ext.getCmp("rightR");if(e.getValue()){f.setValue(true);f.disable();}else{if(!d.getValue()){f.enable();}}}}},{xtype:"label",text:"可删除",width:60}]}]});this.buttons=[{xtype:"button",text:"共享",scope:this,iconCls:"btn-ok",handler:function(){var l=this;var j=Ext.getCmp("userIds").getValue();var m=Ext.getCmp("depIds").getValue();var k=Ext.getCmp("roleIds").getValue();var n=Ext.getCmp("rightR").getValue();if(j!=""||m!=""||k!=""){if(n==true){var i=Ext.getCmp("rightR");i.enable();var h=this.grid;this.formPanel.getForm().submit({url:__ctxPath+"/document/addDocPrivilege.do",method:"post",waitMsg:"正在提交...",success:function(b,a){Ext.ux.Toast.msg("提示","保存成功！");h.getStore().reload();l.close();},failure:function(b,a){Ext.ux.Toast.msg("出错","请与管理员联系！");}});}else{Ext.ux.Toast.msg("提示","读权限为基本权限！");}}else{Ext.ux.Toast.msg("提示","请选择！");}}},{xtype:"button",iconCls:"btn-cancel",text:"关闭",scope:this,handler:function(){this.close();}}];}});