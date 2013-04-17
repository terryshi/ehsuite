NoticeForm=Ext.extend(Ext.Window,{imagePanlbar:null,constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();NoticeForm.superclass.constructor.call(this,{id:"NoticeFormWin",layout:"fit",items:this.formPanel,modal:true,height:550,width:1030,iconCls:"menu-notice",maximizable:true,title:"公告详细公告",buttonAlign:"center",buttons:[{text:"保存",iconCls:"btn-save",scope:this,handler:this.save},{text:"重置",iconCls:"btn-reset",scope:this,handler:this.reset},{text:"取消",iconCls:"btn-cancel",scope:this,handler:this.cancel}]});},initUIComponents:function(){this.imagePanlbar=new Ext.Toolbar({items:[{iconCls:"btn-upload",text:"上传",scope:this,handler:this.uploadImage.createCallback(this)},{iconCls:"btn-del",text:"删除",scope:this,handler:function(){}}]});this.formPanel=new Ext.FormPanel({layout:"hbox",frame:false,layoutConfig:{padding:"5",pack:"start",align:"middle"},defaults:{margins:"0 5 0 0"},border:false,items:[{xtype:"fieldset",title:"公告内容",layout:"form",labelWidth:60,defaultType:"textfield",autoWidth:true,autoHeight:true,defaults:{width:550},items:[{name:"news.newsId",xtype:"hidden",value:this.newsId==null?"":this.newsId},{name:"news.sectionId",xtype:"hidden"},{fieldLabel:"是否公告",name:"news.isNotice",xtype:"hidden",value:1},{xtype:"compositefield",fieldLabel:"所属栏目",items:[{xtype:"textfield",name:"sectionName",allowBlank:false,readOnly:true},{xtype:"button",text:"选择栏目",iconCls:"btn-select",scope:this,handler:this.section.createCallback(this)}]},{fieldLabel:"公告标题",name:"news.subject",allowBlank:false,maxLength:128},{fieldLabel:"作者",name:"news.author",allowBlank:false,maxLength:32},{fieldLabel:"内容",name:"news.content",allowBlank:false,height:360,xtype:"fckeditor",maxLength:65535}]},{xtype:"fieldset",title:"其他公告",layout:"form",labelWidth:60,defaultType:"textfield",autoWidth:true,autoHeight:true,defaults:{width:280},items:[{fieldLabel:"公告图片",name:"news.subjectIcon",maxLength:128,xtype:"hidden"},{fieldLabel:"创建时间",name:"news.createtime",allowBlank:false,xtype:"datefield",format:"Y-m-d",value:new Date()},{fieldLabel:"失效时间",name:"news.expTime",xtype:"datefield",format:"Y-m-d"},{fieldLabel:"发布人",name:"news.issuer",allowBlank:false,maxLength:32,value:curUserInfo.fullname},{fieldLabel:"状态",hiddenName:"news.status",allowBlank:false,xtype:"combo",editable:false,mode:"local",triggerAction:"all",store:[["0","禁用"],["1","激活"]],value:1},{fieldLabel:"顺序",name:"news.sn",xtype:"numberfield"},{xtype:"panel",title:"图片",name:"NewsImageScanPanel",height:311,width:345,tbar:this.imagePanlbar,html:'<img style="border:0;"  src="'+__ctxPath+'/images/default_newsIcon.jpg" border="0"/>'}]}]});if(this.newsId!=null&&this.newsId!="undefined"){var b=this.formPanel;b.loadData({url:__ctxPath+"/info/getNews.do?newsId="+this.newsId,root:"data",preName:"news",success:function(a,h){var g=Ext.util.JSON.decode(a.responseText).data;b.getCmpByName("sectionName").setValue(g.section.sectionName);b.getCmpByName("news.createtime").setValue(new Date(getDateFromFormat(g.createtime,"yyyy-MM-dd HH:mm:ss")));b.getCmpByName("news.expTime").setValue(new Date(getDateFromFormat(g.expTime,"yyyy-MM-dd HH:mm:ss")));var f=b.getCmpByName("NewsImageScanPanel");if(g.subjectIcon!=""){f.body.update('<img style="border:0;" src="'+__ctxPath+"/attachFiles/"+g.subjectIcon+'" border="0"/>');}},failure:function(a,d){Ext.ux.Toast.msg("编辑","载入失败");}});}},reset:function(){this.formPanel.getForm().reset();},cancel:function(){this.close();},save:function(){$postForm({formPanel:this.formPanel,scope:this,url:__ctxPath+"/info/saveNews.do",callback:function(e,f){var d=Ext.getCmp("NewsGrid");if(d!=null){d.getStore().reload();}this.close();}});},uploadImage:function(g){var i=g.getCmpByName("NewsImageScanPanel");var l=g.getCmpByName("news.subjectIcon");var h=g.getCmpByName("news.newsId").getValue();var k=App.createUploadDialog({file_cat:"info/notice",callback:function(a){l.setValue(a[0].filePath);i.body.update('<img style="border:0;"  src="'+__ctxPath+"/attachFiles/"+a[0].filePath+'" border="0"/>');}});if(l.value!=""&&l.value!=null&&l.value!="undefined"){var j="再次上传需要先删除原有图片,";Ext.Msg.confirm("公告确认",j+"是否删除？",function(a){if(a=="yes"){Ext.Ajax.request({url:__ctxPath+"/system/deleteFileAttach.do",method:"post",params:{filePath:l.value},success:function(){if(h!=""&&h!=null&&h!="undefined"){Ext.Ajax.request({url:__ctxPath+"/info/iconNews.do",method:"post",params:{newsId:h},success:function(){l.setValue("");i.body.update('<img style="border:0;"src="'+__ctxPath+'/images/default_newsIcon.jpg" border="0"/>');k.show("queryBtn");}});}else{l.setValue("");i.body.update('<img style="border:0;" src="'+__ctxPath+'/images/default_newsIcon.jpg" border="0"/>');k.show("queryBtn");}}});}});}else{k.show("queryBtn");}},section:function(b){new SectionSelector({callback:function(d,a){this.close();b.getCmpByName("news.sectionId").setValue(d);b.getCmpByName("sectionName").setValue(a);}}).show();}});