ProcessNodeSetting=Ext.extend(Ext.Window,{constructor:function(b){Ext.applyIf(this,b);this.initUI();ProcessNodeSetting.superclass.constructor.call(this,{title:"流程节点干预设置-"+this.activityName,width:670,height:480,maximizable:true,modal:true,layout:"border",items:[this.tabPanel],buttonAlign:"center",buttons:[{text:"保存",iconCls:"btn-save",scope:this,handler:this.save},{text:"取消",iconCls:"btn-cancel",scope:this,handler:this.close}]});},initUI:function(){this.startPanel=new Ext.Panel({title:"节点开始事件代码",bodyStyle:"padding:8px",layout:"form",items:[{xtype:"textarea",fieldLabel:"事件代码",name:"startExeCode",anchor:"100%,100%",height:350}]});this.endPanel=new Ext.Panel({title:"节点结束事件代码",layout:"form",bodyStyle:"padding:8px",items:[{xtype:"textarea",fieldLabel:"事件代码",name:"endExeCode",anchor:"100%,100%",height:350}]});this.tabPanel=new Ext.TabPanel({region:"center",activeTab:0,items:[this.startPanel,this.endPanel]});var b=false;if(this.nodeType=="decision"){this.decisionPanel=new Ext.Panel({title:"分支条件设置代码",layout:"form",bodyStyle:"padding:8px",items:[{xtype:"textarea",fieldLabel:"分支条件代码",name:"decisionExeCode",anchor:"100%,100%",height:350},{xtype:"label",text:"通过设置tranTo值来决定分支跳转，若投票分支决定，可以使用decisionType变量（其有两值：refuse,pass）"}]});this.tabPanel.add(this.decisionPanel);this.tabPanel.doLayout();b=true;}Ext.Ajax.request({url:__ctxPath+"/flow/getCodeProHandleComp.do",params:{defId:this.defId,activityName:this.activityName,includeDecision:b},scope:this,success:function(e,f){var a=Ext.decode(e.responseText);if(a!=null){if(a.startExeCode){this.startPanel.getCmpByName("startExeCode").setValue(a.startExeCode);}if(a.endExeCode){this.endPanel.getCmpByName("endExeCode").setValue(a.endExeCode);}if(this.decisionPanel&&a.decisionExeCode){this.decisionPanel.getCmpByName("decisionExeCode").setValue(a.decisionExeCode);}}},failture:function(d,a){}});},save:function(){var f=this.startPanel.getCmpByName("startExeCode").getValue();var d=this.endPanel.getCmpByName("endExeCode").getValue();var e="";if(this.decisionPanel){e=this.decisionPanel.getCmpByName("decisionExeCode").getValue();}Ext.Ajax.request({url:__ctxPath+"/flow/saveCodeProHandleComp.do",params:{defId:this.defId,activityName:this.activityName,nodeType:this.nodeType,startExeCode:f,endExeCode:d,decisionExeCode:e},scope:this,success:function(a,b){Ext.ux.Toast.msg("操作信息","成功保存设置！");this.close();}});}});