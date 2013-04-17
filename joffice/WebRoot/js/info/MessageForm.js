MessageForm=Ext.extend(Ext.Panel,{formPanel:null,constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();MessageForm.superclass.constructor.call(this,{id:"MessageForm",flex:1,layout:"form",autoScroll:true,border:false,items:[this.formPanel]});},initUIComponents:function(){this.formPanel=new Ext.FormPanel({id:"mFormPanel",title:"发送信息",iconCls:"btn-sendM",frame:true,draggable:true,border:false,style:"margin-top:10%;margin-left:20%;",width:460,height:260,defaultType:"textarea",url:__ctxPath+"/info/sendShortMessage.do",method:"post",reader:new Ext.data.JsonReader({root:"data",id:"messageId"},[{name:"userId",mapping:"senderId"},{name:"userFullname",mapping:"sender"}]),defaults:{allowBlank:false,selectOnFocus:true,msgTarget:"side"},modal:true,layout:"form",plain:true,scope:this,buttonAlign:"center",items:[{xtype:"hidden",name:"userId",id:"userId"},{xtype:"fieldset",style:"padding:0px",border:false,hight:70,layout:"column",items:[{xtype:"label",text:"收信人:",width:50},{xtype:"textarea",name:"userFullname",id:"userFullname",allowBlank:false,readOnly:true,width:290,height:50},{xtype:"container",border:true,width:100,heigth:30,items:[{xtype:"button",iconCls:"btn-mail_recipient",text:"添加联系人 ",width:80,handler:function(){UserSelector.getView(function(k,m){var p=Ext.getCmp("userId");var i=Ext.getCmp("userFullname");if(p.getValue()!=""&&i.getValue()!=""){var n=(p.getValue()+",").concat(k);var j=(i.getValue()+",").concat(m);var o=uniqueArray(n.split(","));var l=uniqueArray(j.split(","));p.setValue(o.toString());i.setValue(l.toString());}else{p.setValue(k);i.setValue(m);}}).show();}},{xtype:"button",text:"清除联系人",iconCls:"btn-del",width:80,handler:function(){var d=Ext.getCmp("userFullname");var c=Ext.getCmp("userId");d.reset();c.reset();}}]}]},{xtype:"fieldset",border:false,style:"padding:0px",layout:"column",height:140,items:[{xtype:"label",text:"内容:",width:50},{id:"sendContent",xtype:"textarea",name:"content",width:380,height:120,autoScroll:true,allowBlank:false}]}],buttons:[{text:"发送",iconCls:"btn-mail_send",handler:this.send},{text:"重置",iconCls:"reset",handler:this.reset}]});},send:function(){var b=Ext.getCmp("mFormPanel");if(b.getForm().isValid()){b.getForm().submit({waitMsg:"正在 发送信息",success:function(a,d){var a=Ext.getCmp("mFormPanel");Ext.ux.Toast.msg("操作信息","信息发送成功！");a.getForm().reset();}});}},reset:function(){var b=Ext.getCmp("mFormPanel");b.getForm().reset();}});