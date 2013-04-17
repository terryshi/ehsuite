var CompanyView=function(){return this.setup();};CompanyView.prototype.setup=function(){var d=this.topbar();var e=new Ext.form.FormPanel({id:"CompanyView",closable:true,url:__ctxPath+"/system/addCompany.do",title:"公司信息",layout:"form",tbar:d,autoScroll:true,iconCls:"menu-company",reader:new Ext.data.JsonReader({root:"result"},[{name:"companyId",mapping:"companyId"},{name:"companyNo",mapping:"companyNo"},{name:"companyName",mapping:"companyName"},{name:"companyDesc",mapping:"companyDesc"},{name:"legalPerson",mapping:"legalPerson"},{name:"companySetup",mapping:"setup"},{name:"companyPhone",mapping:"phone"},{name:"companyFax",mapping:"fax"},{name:"companySite",mapping:"site"},{name:"companyLogo",mapping:"logo"}]),items:[{xtype:"hidden",name:"company.companyId",id:"companyId"},{xtype:"container",labelAlign:"top",border:false,style:"padding-left:10%;padding-right:10%",layout:"form",items:[{xtype:"textfield",fieldLabel:"公司编号",name:"company.companyNo",id:"companyNo",anchor:"78%"},{xtype:"textfield",fieldLabel:"公司名称",name:"company.companyName",id:"companyName",allowBlank:false,anchor:"78%"},{layout:"column",border:false,anchor:"78%",items:[{layout:"form",columnWidth:0.5,border:false,style:"padding-left:0px;",items:[{xtype:"textfield",fieldLabel:"法人",name:"company.legalPerson",id:"legalPerson",anchor:"98%"},{xtype:"textfield",fieldLabel:"电话",name:"company.phone",id:"companyPhone",anchor:"98%"}]},{layout:"form",border:false,columnWidth:0.5,items:[{fieldLabel:"成立时间",xtype:"datefield",format:"Y-m-d",name:"company.setup",id:"companySetup",anchor:"100%"},{xtype:"textfield",fieldLabel:"传真",name:"company.fax",id:"companyFax",anchor:"100%"}]}]},{xtype:"hidden",fieldLabel:"Logo",name:"company.logo",id:"companyLogo"},{xtype:"container",fieldLabel:"公司主页",style:"padding-left:0px;padding-bottom:3px;",layout:"column",items:[{xtype:"textfield",name:"company.site",id:"companySite",width:300},{xtype:"button",text:"访问公司主页",handler:function(){var a=Ext.getCmp("companySite");var b=a.getValue().trim();if(b.indexOf("http://")==0){window.open(b,"_bank");}else{Ext.ux.Toast.msg("提示信息","没写完整网址.");}}},{xtype:"label",width:80,text:"以http://开头"}]},{xtype:"container",fieldLabel:"Logo",style:"padding-left:0px;padding-bottom:3px;",layout:"column",items:[{xtype:"container",border:true,style:"padding-left:0px;",layout:"form",height:58,items:[{xtype:"panel",height:55,width:247,id:"LogoPanel",autoScroll:true,html:'<img src="'+__ctxPath+'/images/default_image_car.jpg" width="100%" height="100%"/>'}]},{border:false,xtype:"container",layout:"form",width:93,style:"padding-left:3px;",items:[{xtype:"button",iconCls:"btn-add",text:"上传LOGO",handler:function(){var c=Ext.getCmp("companyLogo");var b=App.createUploadDialog({file_cat:"system/company",callback:f,permitted_extensions:["jpg","png"]});if(c.getValue()!=""&&c.getValue()!=null&&c.getValue()!="undefined"){var a="再次上传需要先删除原有图片,";Ext.Msg.confirm("信息确认",a+"是否删除？",function(h){if(h=="yes"){Ext.Ajax.request({url:__ctxPath+"/system/deleteFileAttach.do",method:"post",params:{filePath:c.value},success:function(){c.setValue("");var g=Ext.getCmp("LogoPanel");g.body.update('<img src="'+__ctxPath+'/images/default_image_car.jpg" width="100%" height="100%" />');var j=document.getElementById("CompanyLogo");j.src=__ctxPath+"/images/ht-logo.png";Ext.Ajax.request({url:__ctxPath+"/system/delphotoCompany.do",method:"post",success:function(){b.show("queryBtn");}});}});}});}else{b.show("queryBtn");}}},{xtype:"button",text:"删除LOGO",iconCls:"btn-delete",handler:function(){var b=Ext.getCmp("companyLogo");if(b.value!=null&&b.value!=""&&b.value!="undefined"){var a="LOGO一旦删除将不可恢复,";Ext.Msg.confirm("确认信息",a+"是否删除?",function(c){if(c=="yes"){Ext.Ajax.request({url:__ctxPath+"/system/deleteFileAttach.do",method:"post",params:{filePath:b.value},success:function(){Ext.Ajax.request({url:__ctxPath+"/system/delphotoCompany.do",method:"post",success:function(){b.setValue("");var i=Ext.getCmp("LogoPanel");i.body.update('<img src="'+__ctxPath+'/images/default_image_car.jpg" width="100%" height="100%" />');var j=document.getElementById("CompanyLogo");j.src=__ctxPath+"/images/ht-logo.png";}});}});}});}else{Ext.ux.Toast.msg("提示信息","您还未增加照片.");}}}]},{border:false,xtype:"label",width:150,html:'<a style="color:red;">请上传比例为247*55的图片,透明底的图片更佳</a>'}]},{xtype:"htmleditor",fieldLabel:"公司描述",name:"company.companyDesc",id:"companyDesc",height:200,anchor:"78%"}]}]});Ext.Ajax.request({url:__ctxPath+"/system/checkCompany.do",success:function(c,a){var b=Ext.util.JSON.decode(c.responseText);if(b.success){e.form.load({url:__ctxPath+"/system/listCompany.do",deferredRender:true,layoutOnTabChange:true,waitMsg:"正在载入数据...",success:function(n,m){var k=m.result.data.companyLogo;var l=Ext.getCmp("LogoPanel");if(k!=null&&k!=""&&k!="undefind"&&l.body!=null){l.body.update('<img src="'+__ctxPath+"/attachFiles/"+k+'"  width="100%" height="100%"/>');}},failure:function(j,i){Ext.ux.Toast.msg("编辑","载入失败");}});}else{Ext.ux.Toast.msg("提示","还没填写公司信息");}},failure:function(b,a){}});function f(b){var h=Ext.getCmp("companyLogo");var a=Ext.getCmp("LogoPanel");h.setValue(b[0].filePath);a.body.update('<img src="'+__ctxPath+"/attachFiles/"+b[0].filePath+'"  width="100%" height="100%"/>');var c=document.getElementById("CompanyLogo");c.src=__ctxPath+"/attachFiles/"+b[0].filePath;}return e;};CompanyView.prototype.topbar=function(){var b=new Ext.Toolbar({id:"CompanyTopBar",height:30,bodyStyle:"text-align:left",items:[]});if(isGranted("_CompanyEdit")){b.add(new Ext.Button({text:"保存",iconCls:"btn-save",handler:function(){var a=Ext.getCmp("CompanyView");if(a.getForm().isValid()){a.getForm().submit({waitMsg:"正在修改公司信息",success:function(h,f){Ext.ux.Toast.msg("操作信息","公司信息保存成功！");var g=Ext.getCmp("companyName").getValue();Ext.getCmp("toolbarCompanyName").setText(g+"办公协同管理系统");}});}}}));}b.add(new Ext.Button({text:"关闭",iconCls:"btn-close",handler:function(){var a=Ext.getCmp("centerTabPanel");a.remove("CompanyView");}}));return b;};