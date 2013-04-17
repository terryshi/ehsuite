ProcessNextForm=Ext.extend(Ext.Panel,{constructor:function(f){Ext.applyIf(this,f);var e=false;Ext.Ajax.request({params:{taskId:this.taskId},async:false,scope:this,url:__ctxPath+"/flow/checkTask.do",success:function(b,a){var c=Ext.util.JSON.decode(b.responseText);if(c.assigned!=undefined){if(!c.assigned){Ext.ux.Toast.msg("操作信息","该任务已经被其他用户锁定执行！");e=true;}if(c.assigned){Ext.ux.Toast.msg("操作信息","该任务已经成功锁定!");}}}});if(e){var d=Ext.getCmp("TaskPanelView");if(d!=null&&d!=undefined){d.getUpdater().update(__ctxPath+"/flow/displayTask.do");}ProcessNextForm.superclass.constructor.call(null);return;}this.assignTasks=new Array();this.assignUserIds=new Array();this.formPanel=new Ext.FormPanel({border:false,bodyStyle:"padding:8px",autoHeight:true,autoLoad:{url:__ctxPath+"/flow/getProcessActivity.do?taskId="+this.taskId,nocache:true,params:{activityName:this.activityName},scope:this,callback:this.getFormHtmlCallback}});this.flowdetailPanel=new Ext.Panel({border:false,autoHeight:true,autoLoad:{url:__ctxPath+"/flow/processRunDetail.do?taskId="+this.taskId,nocache:true}});this.userJumpPanel=new Ext.form.FieldSet({title:"选择下一任务执行人",collapsed:true,autoHeight:true,collapsed:false,collapsible:true,layout:"form"});this.jumpPanel=new Ext.Panel({border:false,bodyStyle:"padding:8px",layout:"form",items:[this.userJumpPanel]});this.toolbar=new Ext.Toolbar({items:[" "," ",{xtype:"checkbox",boxLabel:"自由跳转",scope:this,handler:this.freeJump},"-",{xtype:"button",text:"执行下一步",scope:this,iconCls:"btn-transition",handler:this.nextStep},"-",{xtype:"checkbox",boxLabel:"发送邮件",scope:this,handler:function(b,a){if(a){this.sendMail=true;}else{this.sendMail=false;}}},{xtype:"checkbox",boxLabel:"发送短信",scope:this,handler:function(b,a){if(a){this.sendMsg=true;}else{this.sendMsg=false;}}},"->",{text:"流程示意图",iconCls:"btn-flow-chart",scope:this,handler:this.showFlowImage}]});this.loadJumpTrans.call(this);ProcessNextForm.superclass.constructor.call(this,{tbar:this.toolbar,id:"ProcessNextForm_"+this.taskId,iconCls:"btn-approvalTask",title:this.activityName+"--待办事项",layout:"form",bodyStyle:"padding:5px",items:[this.jumpPanel,this.formPanel,this.flowdetailPanel]});},loadJumpTrans:function(){Ext.Ajax.request({url:__ctxPath+"/flow/transProcessActivity.do",params:{taskId:this.taskId},scope:this,success:function(g,j){var f=Ext.decode(g.responseText);if(f.preTaskName!=undefined&&f.preTaskName!=""){this.toolbar.insert(3,new Ext.Toolbar.Separator());this.toolbar.insert(3,new Ext.Button({text:"驳回",iconCls:"btn-back",scope:this,handler:this.backFlow}));this.unAddBack=true;this.preTaskName=f.preTaskName;}var h=[];for(var i=0;i<f.data.length;i++){h.push({boxLabel:f.data[i].destination,name:"jumpPath_"+this.taskId,inputValue:f.data[i].name,destType:f.data[i].destType,destName:f.data[i].destination,checked:i==0?true:false});}this.jumpRadioGroup=new Ext.form.RadioGroup({listeners:{scope:this,"change":this.jumpRadioCheck},fieldLabel:"执行路径",items:h});this.jumpPanel.insert(0,this.jumpRadioGroup);this.jumpPanel.doLayout();this.jumpRadioCheck.call(this);if(f.isSignTask){this.addSignVoteOpinion.call(this);}}});},addSignVoteOpinion:function(){this.voteRadioGroup=new Ext.form.RadioGroup({columns:[100,100,100],vertical:true,items:[{xtype:"radio",name:"signVoteType",boxLabel:"同意",inputValue:1,checked:true},{name:"signVoteType",xtype:"radio",boxLabel:"拒绝",inputValue:2},{xtype:"radio",name:"signVoteType",boxLabel:"弃权",inputValue:0}]});this.voteCmpField=new Ext.form.CompositeField({width:540,autoHeight:true,fieldLabel:"会签投票意见",items:[this.voteRadioGroup]});this.voteListPanel=new Ext.Panel({border:false,autoHeight:true,autoLoad:{url:__ctxPath+"/flow/signListProcessActivity.do?taskId="+this.taskId,nocache:true}});this.voteSignFieldSet=new Ext.form.FieldSet({title:"会签情况",autoHeight:true,layout:"form",items:[this.voteListPanel,this.voteCmpField]});},jumpRadioCheck:function(c,d){if(!c){c=this.jumpRadioGroup;}if(!d){d=c.getValue();}this.getTaskUsers.call(this,d.destName,d.destType);},getTaskUsers:function(d,c){if("decision"==c||"fork"==c||"join"==c){this.userJumpPanel.removeAll();this.userJumpPanel.show();this.genForkDecUserAssign.call(this,d);}else{if(c.indexOf("end")!=-1){this.userJumpPanel.removeAll();this.userJumpPanel.hide();}else{this.userJumpPanel.removeAll();this.userJumpPanel.show();this.userJumpPanel.add(this.getSingleUserPanel.call(this,d));}}this.jumpPanel.doLayout();},getSingleUserPanel:function(d){this.flowAssignName=new Ext.form.TextArea({width:400,height:40,name:"flowAssignName"});var c=new Ext.form.CompositeField({xtype:"compositefield",fieldLabel:"执行人",anchor:"92%,92%",items:[this.flowAssignName,{xtype:"button",scope:this,text:"...",iconCls:"btn-users",handler:function(){var a=this.flowUserFieldPanel;UserSelector.getView({callback:function(b,f){this.flowAssignName.setValue(f);this.assignTasks=[d];this.assignUserIds=[b];},scope:this}).show();}}]});Ext.Ajax.request({url:__ctxPath+"/flow/usersProcessActivity.do",scope:this,params:{taskId:this.taskId,activityName:d},success:function(b,a){var f=Ext.decode(b.responseText);this.flowAssignName.setValue(f.userNames);this.assignTasks=[d];this.assignUserIds=[f.userIds];}});return c;},genForkDecUserAssign:function(b){Ext.Ajax.request({url:__ctxPath+"/flow/outerTransProcessActivity.do?taskId="+this.taskId,params:{nodeName:b},scope:this,success:function(f,a){var g=Ext.decode(f.responseText);for(var h=0;h<g.length;h++){this.userJumpPanel.add(this.genUserFieldSel.call(this,g[h]),h);}this.userJumpPanel.doLayout();}});},genUserFieldSel:function(i,f){var j=i[1];this.assignTasks[f]=j;this.assignUserIds[f]=i[3];var g=new Ext.form.TextArea({allowBlank:false,width:400,height:40,value:i[4]});var h=new Ext.form.CompositeField({anchor:"92%,92%",bodyStyle:"background-color:white;padding:0 0 0 0",fieldLabel:j,items:[g,{xtype:"button",text:"...",iconCls:"btn-users",scope:this,handler:function(){UserSelector.getView({scope:this,callback:function(d,a){g.setValue(a);var c=this.assignTasks.length;for(var b=c-1;b>=0;b--){if(this.assignTasks[b]==j){c=b;break;}}this.assignTasks[c]=j;this.assignUserIds[c]=d;}}).show();}}]});return h;},getFlowAssignId:function(){var f="";var g="";var h="";for(var e=0;e<this.assignTasks.length;e++){if(e>0){g+=":";h+=":";}g+=this.assignTasks[e];h+=this.assignUserIds[e];}if(g!=""){f=g+"|"+h;}return f;},nextStep:function(){var L=true;if(this.formExtPanel!=null&&this.formExtPanel.validate){L=this.formExtPanel.validate.call(this.formExtPanel,this);}L=$validForm.call(this);if(!L){return;}var P="";var V="";var af=null;if(this.isFreeJump){P=this.freeTransCombo.getValue();var ab=this.freeTransCombo.getStore();for(var i=0;i<ab.getCount();i++){var K=ab.getAt(i).data;if(K.signalName==P){V=K.destName;break;}}}else{var ak=this.jumpRadioGroup.getValue();P=ak.getGroupValue();V=ak.destName;}if(V==""){Ext.ux.Toast.msg("操作信息","请选择要跳转的目标任务！");return;}if(this.voteRadioGroup){af=this.voteRadioGroup.getValue().getGroupValue();}var aj=this.formPanel.getForm();var ae=this.officePanel;if(ae){var T=null;if(this.fileId!=""&&this.fileId!=undefined){T=ae.saveDoc({docName:"ProcessDocument",fileId:this.fileId,doctype:"doc"});}else{T=ae.saveDoc({docName:"ProcessDocument",doctype:"doc"});}if(T&&T.success){var N=T.fileId;this.hiddenF.setValue(N);}}var ac="";if(this.formExtPanel!=null&&this.formExtPanel.getFlowAssignId){ac=this.formExtPanel.getFlowAssignId.call(this.formExtPanel,this);}else{ac=this.getFlowAssignId.call(this);}var Z={useTemplate:this.useTemplate,signVoteType:af,flowAssignId:ac,taskId:this.taskId,signalName:P,destName:V,sendMsg:this.sendMsg,sendMail:this.sendMail};if(this.detailGrids){var ad=this.detailGrids.keys;for(var J=0;J<ad.length;J++){var X=[];var U=this.detailGrids.get(ad[J]);var ab=U.getStore();for(var i=0;i<ab.getCount();i++){var ai=ab.getAt(i);var R=HT.encode(ai.data);X.push(R);}Z[ad[J]+"details"]=Ext.encode(X);}}var d=aj.getEl().dom;var ag=d.getElementsByTagName("form");var Q=[];var W=new Ext.util.MixedCollection();for(var i=0;i<ag.length;i++){var ah=ag[i].getAttribute("belongName");var j=ag[i].getAttribute("pkName");var Y=ag[i].getAttribute("pkValue");var S=Ext.Ajax.serializeForm(ag[i]);var M=Ext.urlDecode(S);if(j&&Y){M[j]=Y;}var O=HT.encode(M);var al=W.get(ah);if(!al){var X=[];X.push(O);W.add(ah,X);}else{al.push(O);}}for(var i=0;i<W.keys.length;i++){var aa=W.keys[i];Z[aa+"details"]=Ext.encode(W.get(aa));}if(aj.isValid()){aj.submit({url:__ctxPath+"/flow/nextProcessActivity.do",method:"post",waitMsg:"正在提交处理，请稍等",scope:this,params:Z,success:function(e,b){Ext.ux.Toast.msg("操作信息","成功保存！");AppUtil.removeTab("ProcessNextForm_"+this.taskId);var a=Ext.getCmp("MyTaskGrid");var c=Ext.getCmp("TaskPanelView");if(c!=null){c.getUpdater().update(__ctxPath+"/flow/displayTask.do");}if(a!=null){a.getStore().reload();}if(ae){ae.closeDoc();}},failure:function(b,a){Ext.ux.Toast.msg("操作信息","操作出错，请联系管理员！");}});}},freeJump:function(d,c){if(c){this.isFreeJump=true;this.jumpPanel.remove(this.jumpRadioGroup);this.freeTransCombo=new Ext.form.ComboBox({fieldLabel:"跳转任务",xtype:"combo",allowBlank:false,editable:false,lazyInit:false,triggerAction:"all",listeners:{scope:this,select:function(a,j,i){var h=j.data.destName;var b=j.data.destType;this.getTaskUsers.call(this,h,b);}},store:new Ext.data.ArrayStore({autoLoad:true,url:__ctxPath+"/flow/freeTransProcessActivity.do?taskId="+this.taskId,fields:["signalName","destName","destType"]}),displayField:"destName",valueField:"signalName"});this.jumpPanel.insert(0,this.freeTransCombo);this.jumpPanel.doLayout();}else{this.isFreeJump=false;this.jumpPanel.remove(this.freeTransCombo);this.loadJumpTrans.call(this);}},backFlow:function(){Ext.Msg.confirm("信息确认","您确认要回退所选记录吗？",function(b){if(b=="yes"){this.formPanel.getForm().submit({url:__ctxPath+"/flow/nextProcessActivity.do",scope:this,params:{useTemplate:this.useTemplate,taskId:this.taskId,destName:this.preTaskName,back:"true"},success:function(a,d){Ext.ux.Toast.msg("操作信息","成功回退！");AppUtil.removeTab("ProcessNextForm_"+this.taskId);},failture:function(a,d){Ext.ux.Toast.msg("操作信息","回退失败！");}});}},this);},getFormHtmlCallback:function(){if(this.voteSignFieldSet){this.formPanel.add(this.voteSignFieldSet);}this.formPanel.add(new Ext.form.TextArea({name:"comments",anchor:"70%,70%",fieldLabel:"审批意见"}));var formExt=document.getElementById("formTaskExt"+this.taskId);if(formExt!=null){this.useTemplate=true;var valExt=formExt.value;valExt=valExt.replace("Ext.form.FormPanel","Ext.Panel");this.formExtPanel=eval("new ("+valExt+")();");if(this.formExtPanel.afterLoad){this.formExtPanel.afterLoad.call(this.formExtPanel,this);}this.formPanel.add(this.formExtPanel);this.formPanel.doLayout();return;}this.formPanel.doLayout();try{var json=document.getElementById("entity_"+this.taskId);var rights=document.getElementById("rightstask_"+this.taskId);var name,type,value,xtype;var callback=function(){var entityJson=null;if(json!=null&&json.value){entityJson=Ext.decode(json.value);}var rightJson=null;if(rights!=null){rightJson=Ext.decode(rights.value);}$converDetail.call(this,entityJson,rightJson);};$ImportSimpleJs([__ctxPath+"/js/core/ntkoffice/NtkOfficePanel.js",__ctxPath+"/js/selector/SealSelector.js",__ctxPath+"/js/selector/PaintTemplateSelector.js"],callback,this);}catch(e){}},showFlowImage:function(){var b=new Ext.Window({autoScroll:true,iconCls:"btn-flow-chart",bodyStyle:"background-color:white",maximizable:true,title:"流程示意图",width:600,height:500,modal:true,layout:"fit",html:'<img src="'+__ctxPath+"/jbpmImage?taskId="+this.taskId+"&rand="+Math.random()+'"/>'});b.show();}});