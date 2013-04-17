Ext.ns("CarForm");CarForm=Ext.extend(Ext.Window,{formPanel:null,constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();CarForm.superclass.constructor.call(this,{layout:"fit",id:"CarFormWin",title:"车辆详细信息",iconCls:"menu-car",width:830,height:450,minWidth:829,minHeight:449,maximizable:true,items:this.formPanel,border:false,modal:true,plain:true,buttonAlign:"center",buttons:this.buttons,keys:{key:Ext.EventObject.ENTER,fn:this.save,scope:this}});},initUIComponents:function(){this.formPanel=new Ext.FormPanel({url:__ctxPath+"/admin/saveCar.do",layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{margins:"0 5 0 0"},anchor:"100%",id:"CarForm",frame:false,formId:"CarFormId",items:[{xtype:"panel",title:"基本信息",layout:"form",frame:false,height:360,bodyStyle:"padding:5px;",labelWidth:100,defaults:{anchor:"100%,100%"},defaultType:"textfield",items:[{name:"car.carId",id:"carId",xtype:"hidden",value:this.carId==null?"":this.carId},{name:"car.cartImage",id:"cartImage",xtype:"hidden"},{fieldLabel:"车牌号码",name:"car.carNo",id:"carNo",allowBlank:false,xtype:"textfield"},{fieldLabel:"车辆类型",name:"car.carType",id:"carType",xtype:"combo",mode:"local",editable:true,allowBlank:false,triggerAction:"all",store:[["1","轿车"],["2","货车"],["3","商务车"]]},{fieldLabel:"发动机型号",name:"car.engineNo",id:"engineNo"},{fieldLabel:"购买保险时间",name:"car.buyInsureTime",id:"buyInsureTime",editable:false,xtype:"datefield",format:"Y-m-d"},{fieldLabel:"年审时间",name:"car.auditTime",id:"auditTime",editable:false,xtype:"datefield",format:"Y-m-d"},{fieldLabel:"厂牌型号",name:"car.factoryModel",allowBlank:false,id:"factoryModel"},{fieldLabel:"驾驶员",name:"car.driver",allowBlank:false,id:"driver"},{fieldLabel:"购置日期",name:"car.buyDate",id:"buyDate",allowBlank:false,editable:false,xtype:"datefield",format:"Y-m-d"},{fieldLabel:"当前状态",hiddenName:"car.status",id:"status",xtype:"combo",mode:"local",allowBlank:false,editable:false,triggerAction:"all",store:[["1","可用"],["2","维修中"],["0","已报废"]]},{fieldLabel:"备注",name:"car.notes",xtype:"textarea",anchor:"100%,100%",id:"notes"}]},{xtype:"panel",id:"carImageDisplay",frame:false,border:true,height:360,html:'<img src="'+__ctxPath+'/images/default_image_car.jpg" width="400" height="350"/>',tbar:new Ext.Toolbar({width:"100%",height:30,items:[{text:"上传",iconCls:"btn-upload",handler:this.upload,scope:this},{text:"删除",iconCls:"btn-delete",handler:this.detachFile,scope:this}]})}]});if(this.carId!=null&&this.carId!="undefined"){this.formPanel.getForm().load({deferredRender:false,url:__ctxPath+"/admin/getCar.do?carId="+this.carId,method:"post",waitMsg:"正在载入数据...",success:function(m,l){var h=l.result.data.buyInsureTime;var i=l.result.data.auditTime;var k=l.result.data.buyDate;Ext.getCmp("buyInsureTime").setValue(new Date(getDateFromFormat(h,"yyyy-MM-dd HH:mm:ss")));Ext.getCmp("auditTime").setValue(new Date(getDateFromFormat(i,"yyyy-MM-dd HH:mm:ss")));Ext.getCmp("buyDate").setValue(new Date(getDateFromFormat(k,"yyyy-MM-dd HH:mm:ss")));var n=l.result.data.cartImage;var j=Ext.getCmp("carImageDisplay");if(n!=null&&n!=""&&n!="undefind"&&j.body!=null){j.body.update('<img src="'+__ctxPath+"/attachFiles/"+n+'"  width="400" height="350"/>');}},failure:function(d,c){Ext.ux.Toast.msg("编辑","载入失败");}});}this.buttons=[{text:"保存",iconCls:"btn-save",handler:this.save,scope:this},{text:"取消",iconCls:"btn-cancel",handler:function(){Ext.getCmp("CarFormWin").close();}}];},save:function(){var b=Ext.getCmp("CarForm");if(b.getForm().isValid()){b.getForm().submit({method:"post",waitMsg:"正在提交数据...",success:function(a,d){Ext.ux.Toast.msg("操作信息","成功保存信息！");Ext.getCmp("CarGrid").getStore().reload();Ext.getCmp("CarFormWin").close();},failure:function(a,d){Ext.MessageBox.show({title:"操作信息",msg:"信息保存出错，请联系管理员！",buttons:Ext.MessageBox.OK,icon:"ext-mb-error"});Ext.getCmp("CarFormWin").close();}});}},upload:function(){var e=Ext.getCmp("cartImage");var d=App.createUploadDialog({file_cat:"admin/carManager/car",callback:CarForm.uploadCarPhoto,permitted_extensions:["jpg"]});if(e.getValue()!=""&&e.getValue()!=null&&e.getValue()!="undefined"){var f="再次上传需要先删除原有图片,";Ext.Msg.confirm("信息确认",f+"是否删除？",function(a){if(a=="yes"){var b=Ext.getCmp("carId").getValue();if(b!=null&&b!="undefined"){Ext.Ajax.request({url:__ctxPath+"/admin/delphotoCar.do",method:"post",params:{carId:b},success:function(){var c=e.value;e.setValue("");var h=Ext.getCmp("carImageDisplay");h.body.update('<img src="'+__ctxPath+'/images/default_image_car.jpg" width="100%" height="100%" />');Ext.Ajax.request({url:__ctxPath+"/system/deleteFileAttach.do",method:"post",params:{filePath:c},success:function(){d.show("queryBtn");}});}});}}});}else{d.show("queryBtn");}},detachFile:function(){var d=Ext.getCmp("cartImage");if(d.value!=null&&d.value!=""&&d.value!="undefined"){var c="照片一旦删除将不可恢复,";Ext.Msg.confirm("确认信息",c+"是否删除?",function(a){if(a=="yes"){Ext.ux.Toast.msg("提示信息","请上传规格为400 X 350,或者此比例的照片.");var b=Ext.getCmp("carId").getValue();if(b!=null&&b!="undefined"){Ext.Ajax.request({url:__ctxPath+"/admin/delphotoCar.do",method:"post",params:{carId:b},success:function(){var g=d.value;d.setValue("");var h=Ext.getCmp("carImageDisplay");h.body.update('<img src="'+__ctxPath+'/images/default_image_car.jpg" width="400" height="350" />');Ext.Ajax.request({url:__ctxPath+"/system/deleteFileAttach.do",method:"post",params:{filePath:g},success:function(){}});}});}}});}else{Ext.ux.Toast.msg("提示信息","您还未增加照片.");}}});CarForm.uploadCarPhoto=function(d){var e=Ext.getCmp("cartImage");var f=Ext.getCmp("carImageDisplay");e.setValue(d[0].filePath);f.body.update('<img src="'+__ctxPath+"/attachFiles/"+d[0].filePath+'"  width="100%" height="100%"/>');};