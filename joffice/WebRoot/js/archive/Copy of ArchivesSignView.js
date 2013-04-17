Ext.ns("ArchivesSignView");ArchivesSignView=Ext.extend(Ext.Panel,{searchPanel:null,gridPanel:null,store:null,topbar:null,constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();ArchivesSignView.superclass.constructor.call(this,{id:"ArchivesSignView",iconCls:"menu-archive-sign",title:"公文签收待办",region:"center",layout:"border",items:[this.searchPanel,this.gridPanel]});},initUIComponents:function(){this.searchPanel=new Ext.FormPanel({height:35,region:"north",frame:false,border:false,layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{style:"padding:0px 5px 0px 5px;",border:false,anchor:"98%,98%",labelWidth:75,xtype:"label"},items:[{text:"类型名称"},{name:"Q_typeName_S_LK",width:100,xtype:"textfield"},{text:"发文字号"},{width:100,name:"Q_archivesNo_S_LK",xtype:"textfield"},{text:"文件标题"},{width:100,name:"Q_subject_S_LK",xtype:"textfield"},{xtype:"button",text:"查询",iconCls:"search",handler:this.search.createCallback(this)},{xtype:"hidden",name:"Q_archives.archStatus_SN_EQ",value:1},{xtype:"hidden",name:"Q_archives.archType_SN_EQ",value:0}]});this.store=new Ext.data.JsonStore({url:__ctxPath+"/archive/listArchivesDep.do",root:"result",baseParams:{"Q_archives.archType_SN_EQ":0,"Q_archives.archStatus_SN_EQ":1,"Q_status_SN_EQ":0},totalProperty:"totalCounts",remoteSort:true,fields:[{name:"archDepId",type:"int"},"archives"]});this.store.setDefaultSort("archDepId","desc");this.store.load({params:{start:0,limit:25}});var c=new Ext.grid.CheckboxSelectionModel();var d=new Ext.grid.ColumnModel({columns:[c,new Ext.grid.RowNumberer(),{header:"archDepId",dataIndex:"archDepId",hidden:true},{header:"公文类型名称",dataIndex:"archives",renderer:function(a){return a.typeName;}},{header:"发文字号",dataIndex:"archives",renderer:function(a){return a.archivesNo;}},{header:"发文机关或部门",dataIndex:"archives",renderer:function(a){return a.issueDep;}},{header:"文件标题",dataIndex:"archives",renderer:function(a){return a.subject;}},{header:"公文状态",dataIndex:"archives",renderer:function(a){if(a!=null){return a.status;}else{return"办结";}}},{header:"秘密等级",dataIndex:"archives",renderer:function(a){return a.privacyLevel;}},{header:"紧急程度",dataIndex:"archives",renderer:function(a){return a.urgentLevel;}},{header:"发文时间",dataIndex:"archives",renderer:function(a){return a.createtime.substring(0,10);}},{header:"管理",width:100,dataIndex:"archives",sortable:false,renderer:function(b,l,p,m,a){var r=b.archivesId;var q=b.status;var o=p.data.archDepId;var n="";if(isGranted("_ArchivesSignQuery")){n+='<button title="查阅详情" value=" " class="btn-archives-detail" onclick="ArchivesSignView.detail('+r+')">&nbsp;&nbsp;</button>';}if(isGranted("_ArchivesSignUp")){n+='<button title="公文签收" value=" " class="btn-archive-sign" onclick="ArchivesSignView.attach('+r+","+o+')">&nbsp;&nbsp;</button>';}return n;}}],defaults:{sortable:true,menuDisabled:false,width:100}});this.topbar=new Ext.Toolbar({height:30,bodyStyle:"text-align:left",items:[]});this.gridPanel=new Ext.grid.GridPanel({id:"ArchivesSignGrid",region:"center",stripeRows:true,tbar:this.topbar,store:this.store,trackMouseOver:true,disableSelection:false,loadMask:true,height:600,cm:d,sm:c,plugins:this.rowActions,viewConfig:{forceFit:true,autoFill:true,forceFit:true},bbar:new HT.PagingBar({store:this.store})});this.gridPanel.addListener("rowdblclick",function(b,e,a){b.getSelectionModel().each(function(f){});});},search:function(b){if(b.searchPanel.getForm().isValid()){$search({searchPanel:b.searchPanel,gridPanel:b.gridPanel});}},createRecord:function(){new ArchivesForm().show();}});ArchivesSignView.detail=function(b){new ArchivesDetailWin({archivesId:b}).show();};ArchivesSignView.attach=function(g,f){var h=App.getContentPanel();var e=h.getItem("ProcessRunStart"+node.attributes.defId);if(e==null){e=new ProcessRunStart({id:"ProcessRunStart"+node.attributes.defId,defId:node.attributes.defId,flowName:node.attributes.flowName});h.add(e);}h.activate(e);};