ProHandleCompForm=Ext.extend(Ext.Window,{constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();ProHandleCompForm.superclass.constructor.call(this,{id:"ProHandleCompFormWin",layout:"fit",items:this.formPanel,modal:true,height:400,width:500,maximizable:true,title:"[ProHandleComp]详细信息",buttonAlign:"center",buttons:[{text:"保存",iconCls:"btn-save",scope:this,handler:this.save},{text:"重置",iconCls:"btn-reset",scope:this,handler:this.reset},{text:"取消",iconCls:"btn-cancel",scope:this,handler:this.cancel}]});},initUIComponents:function(){this.formPanel=new Ext.FormPanel({layout:"form",bodyStyle:"padding:10px",border:false,autoScroll:true,defaults:{anchor:"96%,96%"},defaultType:"textfield",items:[{name:"proHandleComp.handleId",xtype:"hidden",value:this.handleId==null?"":this.handleId},{fieldLabel:"deployId",name:"proHandleComp.deployId",allowBlank:false,maxLength:128},{fieldLabel:"activityName",name:"proHandleComp.activityName",maxLength:128},{fieldLabel:"tranName",name:"proHandleComp.tranName",maxLength:128},{fieldLabel:"eventName",name:"proHandleComp.eventName",maxLength:128},{fieldLabel:"eventLevel",name:"proHandleComp.eventLevel",xtype:"numberfield"},{fieldLabel:"exeCode",name:"proHandleComp.exeCode",xtype:"textarea",maxLength:4000},{fieldLabel:"handleType",name:"proHandleComp.handleType",xtype:"numberfield"}]});if(this.handleId!=null&&this.handleId!="undefined"){this.formPanel.loadData({url:__ctxPath+"/flow/getProHandleComp.do?handleId="+this.handleId,root:"data",preName:"proHandleComp"});}},reset:function(){this.formPanel.getForm().reset();},cancel:function(){this.close();},save:function(){$postForm({formPanel:this.formPanel,scope:this,url:__ctxPath+"/flow/saveProHandleComp.do",callback:function(e,f){var d=Ext.getCmp("ProHandleCompGrid");if(d!=null){d.getStore().reload();}this.close();}});}});