Ext.ns("SearchMail");var SearchMail=function(b){return this.getView(b);};SearchMail.prototype.getView=function(b){return new Ext.Panel({id:"SearchMail",title:"搜索邮件",iconCls:"menu-mail_box",border:false,style:"padding-bottom:20px;",autoScroll:true,items:[{region:"center",anchor:"100%",items:[new Ext.FormPanel({id:"ALLMailSearchForm",height:40,frame:false,border:false,layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label",margins:{top:0,right:4,bottom:4,left:4}},items:[{text:"请输入条件:"},{xtype:"textfield",name:"searchContent",width:150},{xtype:"button",text:"查询",iconCls:"search",handler:function(){var a=Ext.getCmp("ALLMailSearchForm");var d=Ext.getCmp("SearchMailGrid");if(a.getForm().isValid()){$search({searchPanel:a,gridPanel:d});}}},{xtype:"button",text:"重置",iconCls:"reset",handler:function(){var a=Ext.getCmp("ALLMailSearchForm");a.getForm().reset();}}]}),this.setup(b)]}]});};SearchMail.prototype.setup=function(b){return this.grid(b);};SearchMail.prototype.grid=function(i){var h=new Ext.ux.grid.RowExpander({tpl:new Ext.Template('<p style="padding:5px 5px 5px 62px;"><b>内容摘要:</b> {content}</p>')});var g=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),h,{header:"mailId",dataIndex:"mailId",hidden:true},{header:"优先级",dataIndex:"importantFlag",width:55,renderer:function(c,d,l,a,e){var b="";if(c==2){b+='<img title="重要" src="'+__ctxPath+'/images/flag/mail/important.png"/>';}else{if(c==3){b+='<img title="非常重要" src="'+__ctxPath+'/images/flag/mail/veryImportant.png"/>';}else{b+='<img title="一般" src="'+__ctxPath+'/images/flag/mail/common.png"/>';}}return b;}},{header:"阅读",dataIndex:"mailStatus",width:40,renderer:function(c,d,l,a,e){var b="";if(c!=0){if(l.data.readFlag==0){b+='<img title="未读" src="'+__ctxPath+'/images/flag/mail/mail.png"/>';}else{b+='<img title="已读" src="'+__ctxPath+'/images/flag/mail/mail_open.png"/>';}}else{b+='<img title="草稿" src="'+__ctxPath+'/images/flag/mail/mail_draft.png"/>';}return b;}},{header:"附件",dataIndex:"fileIds",width:40,renderer:function(c,d,l,a,e){var b="";if(c!=""){b+='<img title="附件" src="'+__ctxPath+'/images/flag/attachment.png"/>';}return b;}},{header:"回复",dataIndex:"replyFlag",width:40,renderer:function(c,d,l,a,e){var b="";if(c==1){b+='<img title="已回复" src="'+__ctxPath+'/images/flag/mail/replyed.png" style="background: white;"/>';}return b;}},{header:"邮件主题",dataIndex:"subject",width:150},{header:"发件人",dataIndex:"sender",width:80},{header:"收件人",dataIndex:"recipientNames",width:80,renderer:function(a){if(a!=""){return a;}else{return"(收信人未写)";}}},{header:"发信时间",width:80,dataIndex:"sendTime",renderer:function(a){return a.substring(0,10);}}],defaults:{sortable:true,menuDisabled:false,width:100}});var f=this.store();f.load({params:{start:0,limit:25,searchContent:i}});var j=new Ext.grid.GridPanel({id:"SearchMailGrid",autoWidth:true,border:false,autoHeight:true,store:f,plugins:h,trackMouseOver:true,disableSelection:false,loadMask:true,cm:g,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},bbar:new HT.PagingBar({store:f,pageSize:12})});j.addListener("rowdblclick",function(c,a,b){c.getSelectionModel().each(function(d){SearchMail.detail(d.data.mailId,d.data.boxId,d.data.mailStatus,a);});});return j;};SearchMail.prototype.store=function(){var b=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/communicate/searchMail.do"}),reader:new Ext.data.JsonReader({root:"result",totalProperty:"totalCounts",id:"id",fields:[{name:"boxId",type:"int"},{name:"mailId",type:"int"},{name:"delFlag",type:"int"},{name:"readFlag",type:"int"},{name:"replyFlag",type:"int"},"importantFlag","mailStatus","sendTime","fileIds","subject","recipientNames","content","sender"]}),remoteSort:true});b.setDefaultSort("boxId","desc");return b;};SearchMail.detail=function(r,l,q,m){var o=new SearchMail.centerViewToolbar(r,l,m);if(q==0){var s=Ext.getCmp("centerTabPanel");var t=Ext.getCmp("MailForm");if(t==null){t=new MailForm(r,l,"draft");s.add(t);s.activate(t);}else{s.remove(t);t=new MailForm(r,l,"draft");s.add(t);s.activate(t);}}else{var p=Ext.getCmp("SearchMail");var v=Ext.getCmp("SearchMailGrid");var u=Ext.getCmp("ALLMailSearchForm");v.hide();u.hide();var n=new Ext.Panel({id:"HomeShowMailDetail",border:false,tbar:o,autoLoad:{url:__ctxPath+"/communicate/getMail.do?",params:{mailId:r,boxId:l},method:"Post"}});p.add(n);p.doLayout();}};SearchMail.centerViewToolbar=function(f,h,g){var e=new Ext.Toolbar({height:30,defaultType:"button",bodyStyle:"text-align:left",items:[{iconCls:"btn-mail_back",text:"返回",handler:function(){var c=Ext.getCmp("SearchMail");c.remove("HomeShowMailDetail");var a=Ext.getCmp("SearchMailGrid");var b=Ext.getCmp("ALLMailSearchForm");a.show();b.show();c.doLayout();}},{iconCls:"btn-mail_reply",text:"回复",handler:function(){var b=Ext.getCmp("centerTabPanel");var a=Ext.getCmp("MailForm");if(a==null){a=new MailForm(f,h,"reply");b.add(a);b.activate(a);}else{b.remove(a);a=new MailForm(f,h,"reply");b.add(a);b.activate(a);}}},{iconCls:"btn-mail_resend",text:"转发",handler:function(){var b=Ext.getCmp("centerTabPanel");var a=Ext.getCmp("MailForm");if(a==null){a=new MailForm(f,h,"forward");b.add(a);b.activate(a);}else{b.remove(a);a=new MailForm(f,h,"forward");b.add(a);b.activate(a);}}}]});return e;};