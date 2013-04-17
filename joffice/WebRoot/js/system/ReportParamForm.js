var ReportParamForm=function(d,e){this.paramId=e;this.reportId=d;var f=new Ext.Window({id:"ReportParamFormWin",title:name+"详细信息",width:500,height:250,modal:true,layout:"form",plain:true,bodyStyle:"padding:5px;",items:[this.MainForm()]});f.show();};ReportParamForm.prototype.MainForm=function(){var f={};var e=new Ext.FormPanel({url:__ctxPath+"/system/saveReportParam.do",layout:"form",id:"ReportParamForm",frame:true,defaults:{width:400,anchor:"98%,98%"},formId:"ReportParamFormId",defaultType:"textfield",buttonAlign:"center",items:[{name:"reportParam.paramId",id:"paramId",xtype:"hidden",value:this.paramId==null?"":this.paramId},{xtype:"hidden",name:"reportParam.reportId",value:this.reportId},{xtype:"hidden",name:"reportParam.paramTypeStr",id:"paramTypeStr"},{fieldLabel:"参数名称",name:"reportParam.paramName",id:"paramName",allowBlank:false},{fieldLabel:"参数Key",name:"reportParam.paramKey",id:"paramKey",allowBlank:false},{fieldLabel:"类型",hiddenName:"reportParam.paramType",id:"paramType",xtype:"combo",mode:"local",allowBlank:false,editable:false,triggerAction:"all",store:[["textfield","文件输入框(textfield)"],["datefield","日期输入框(datefield)"],["datetimefield","时间输入框(datetimefield)"],["numberfield","数字输入框(numberfield)"],["combo","下拉框(combo)"],["diccombo","数据字典(diccombo)"]],value:"textfield",listeners:{select:function(b,o,n){var a=b.value;var p=Ext.getCmp("ReportParamForm");p.remove("defaultVal");switch(a){case"datefield":f={};Ext.apply(f,{fieldLabel:"缺省值",name:"reportParam.defaultVal",id:"defaultVal",xtype:"datefield",format:"Y-m-d",allowBlank:true});p.findById("paramTypeStr").setValue(Ext.encode(f));p.add(f);break;case"datetimefield":f={};Ext.apply(f,{fieldLabel:"缺省值",name:"reportParam.defaultVal",id:"defaultVal",xtype:"datetimefield",format:"Y-m-d H:i:s",allowBlank:true});p.findById("paramTypeStr").setValue(Ext.encode(f));p.add(f);break;case"numberfield":f={};Ext.apply(f,{fieldLabel:"缺省值",name:"reportParam.defaultVal",id:"defaultVal",xtype:"numberfield",allowBlank:true});p.findById("paramTypeStr").setValue(Ext.encode(f));p.add(f);break;case"combo":var m=new Ext.Panel({id:"ReportParamForm.comboContainer",layout:"form",buttonAlign:"center",buttons:[{text:"确定",iconCls:"btn-save",handler:function(){var j=Ext.getCmp("ReportParamForm.comboContainer").findById("comboStore");if(!j){Ext.getCmp("ReportParamFormWin").remove("ReportParamForm.comboContainer");p.show();return;}var i=j.getXType();if(i=="editorgrid"){var u=[];var w=j.getStore();w.each(function(q){u.push([q.data["value"],q.data["text"]]);});f={};Ext.apply(f,{xtype:"combo",fieldLabel:"缺省值",store:{xtype:"arraystore",fields:["value","text"],data:u},valueField:"value",displayField:"text",typeAhead:true,mode:"local",triggerAction:"all",forceSelection:true,hiddenName:"reportParam.defaultVal",id:"defaultVal"});p.findById("paramTypeStr").setValue(Ext.encode(f));p.add(new Ext.form.ComboBox(f));}else{if(i=="form"){var v=j.findById("url").getValue();var h=j.findById("root").getValue();var g=j.findById("value").getValue();var x=j.findById("text").getValue();var k=[g,x];f={};Ext.apply(f,{xtype:"combo",fieldLabel:"缺省值",store:{xtype:"jsonstore",autoLoad:true,root:h,url:__ctxPath+v,fields:k},valueField:g,displayField:x,typeAhead:true,mode:"local",triggerAction:"all",forceSelection:true,hiddenName:"reportParam.defaultVal",id:"defaultVal"});p.findById("paramTypeStr").setValue(Ext.encode(f));p.add(new Ext.form.ComboBox(f));}}Ext.getCmp("ReportParamFormWin").remove("ReportParamForm.comboContainer");p.show();}},{text:"取消",iconCls:"btn-cancel",handler:function(){Ext.getCmp("ReportParamFormWin").remove("ReportParamForm.comboContainer");p.show();}}]});var l=new Ext.FormPanel({layout:"form",frame:true,defaults:{anchor:"98%,98%"},modal:true,defaultType:"textfield",items:[{fieldLabel:"数据来源",xtype:"combo",store:new Ext.data.ArrayStore({fields:["value","text"],data:[["ArrayStore","静态数据(ArrayStore)"],["JsonStore","动态数据(JsonStore)"]]}),valueField:"value",displayField:"text",typeAhead:true,mode:"local",triggerAction:"all",forceSelection:true,emptyText:"--数据来源--",listeners:{select:function(u,i,h){Ext.getCmp("ReportParamForm.comboContainer").remove("comboStore");var x=u.value;if(x=="ArrayStore"){var j=[["",""],["",""]];var w=new Ext.data.ArrayStore({fields:[{name:"value"},{name:"text"}]});w.loadData(j);var k=new Ext.grid.CheckboxSelectionModel();var v=new Ext.grid.EditorGridPanel({id:"comboStore",autoScroll:true,stripeRows:true,height:120,tbar:new Ext.Toolbar({height:25,bodyStyle:"text-align:left",items:[{iconCls:"btn-add",text:"添加",handler:function(){var s=Ext.getCmp("comboStore");var A=s.getStore();var q=s.getColumnModel();var r=new A.recordType();r.data={};var B=A.fields.keys;for(var t=0;t<B.length;t++){r.data[B[t]]="";}r.markDirty();s.stopEditing();A.insert(0,r);}},{iconCls:"btn-del",text:"删除",handler:function(){var q=Ext.getCmp("comboStore");q.stopEditing();var s=q.getSelectionModel().getSelections();if(s.length==0){Ext.ux.Toast.msg("信息","请选择要删除的记录！");return;}for(var r=0;r<s.length;r++){q.getStore().remove(s[r]);}}}]}),store:w,trackMouseOver:true,disableSelection:false,loadMask:true,clicksToEdit:1,cm:new Ext.grid.ColumnModel({columns:[k,{header:"值域",dataIndex:"value",editor:new Ext.form.TextField({allowBlank:false})},{header:"显示域",dataIndex:"text",editor:new Ext.form.TextField({allowBlank:false})}],defaults:{sortable:true,menuDisabled:false}}),sm:k,viewConfig:{forceFit:true,autoFill:true}}).show();m.add(v);m.doLayout();}else{if(x=="JsonStore"){var g=new Ext.FormPanel({id:"comboStore",layout:"form",frame:true,defaults:{anchor:"98%,98%"},modal:true,defaultType:"textfield",items:[{fieldLabel:"请求URL",id:"url",xtype:"textfield",allowBlank:false},{fieldLabel:"root",id:"root",xtype:"textfield",allowBlank:false},{fieldLabel:"值域字段",id:"value",xtype:"textfield",allowBlank:false},{fieldLabel:"显示域字段",id:"text",xtype:"textfield",allowBlank:false}]}).show();m.add(g);m.doLayout();}}}}}]});m.add(l);m.doLayout();Ext.getCmp("ReportParamFormWin").add(m);p.hide();Ext.getCmp("ReportParamFormWin").doLayout();break;case"diccombo":var c=new Ext.FormPanel({layout:"form",id:"ReportParamForm.prototype.diccomboForm",frame:true,defaults:{width:400,anchor:"98%,98%"},modal:true,defaultType:"textfield",buttonAlign:"center",items:[{fieldLabel:"数据字典名称(itemName)",id:"itemName",width:200,xtype:"textfield",allowBlank:false}],buttons:[{text:"确定",iconCls:"btn-save",handler:function(){var g=Ext.getCmp("itemName").getValue();f={};Ext.apply(f,{xtype:"diccombo",fieldLabel:"缺省值",name:"reportParam.defaultVal",id:"defaultVal",mode:"local",itemName:g,displayField:"itemValue",valueField:"itemValue"});p.findById("paramTypeStr").setValue(Ext.encode(f));p.add(new DicCombo(f));Ext.getCmp("ReportParamFormWin").remove("ReportParamForm.prototype.diccomboForm");p.show();}},{text:"取消",iconCls:"btn-cancel",handler:function(){Ext.getCmp("ReportParamFormWin").remove("ReportParamForm.prototype.diccomboForm");p.show();}}]}).show();Ext.getCmp("ReportParamFormWin").add(c);p.hide();Ext.getCmp("ReportParamFormWin").doLayout();break;default:f={};Ext.apply(f,{fieldLabel:"缺省值",name:"reportParam.defaultVal",id:"defaultVal",xtype:"textfield",allowBlank:true});p.findById("paramTypeStr").setValue(Ext.encode(f));p.add(f);}p.doLayout(true);}}},{fieldLabel:"系列号",name:"reportParam.sn",id:"sn",xtype:"numberfield",allowBlank:false},{fieldLabel:"缺省值",name:"reportParam.defaultVal",id:"defaultVal",allowBlank:true}],buttons:[{text:"保存",iconCls:"btn-save",handler:function(){var b=Ext.getCmp("ReportParamForm");if(b.getForm().isValid()){var a=b.findById("paramTypeStr").getValue();if(a==""){a={};Ext.apply(a,{fieldLabel:"缺省值",name:"reportParam.defaultVal",id:"defaultVal",xtype:"textfield",allowBlank:true});b.findById("paramTypeStr").setValue(Ext.encode(a));}b.getForm().submit({method:"post",waitMsg:"正在提交数据...",success:function(h,c){Ext.ux.Toast.msg("操作信息","成功保存信息！");Ext.getCmp("ReportParamGrid").getStore().reload();Ext.getCmp("ReportParamFormWin").close();},failure:function(h,c){Ext.MessageBox.show({title:"操作信息",msg:"信息保存出错，请联系管理员！",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});Ext.getCmp("ReportParamFormWin").close();}});}}},{text:"取消",iconCls:"btn-cancel",handler:function(){Ext.getCmp("ReportParamFormWin").close();}}]});if(this.paramId!=null&&this.paramId!="undefined"){var d=this.paramId;e.on("afterrender",function(a){a.getForm().load({deferredRender:false,url:__ctxPath+"/system/getReportParam.do?paramId="+d,waitMsg:"正在载入数据...",success:function(s,p){var q=p.result.data.paramType;var c=p.result.data.defaultVal;var o=p.result.data.paramTypeStr;var t=Ext.getCmp("ReportParamForm");if(o!==null&&o!=""&&o!=undefined){t.remove("defaultVal");switch(q){case"combo":var r=new Ext.form.ComboBox(Ext.decode(o));r.setValue(c);t.add(r);break;case"diccombo":var n=new DicCombo(Ext.decode(o));n.setValue(c);t.add(n);break;default:var b=Ext.decode(o);Ext.apply(b,{value:c});t.add(b);}t.doLayout(true);}},failure:function(c,b){}});});}return e;};