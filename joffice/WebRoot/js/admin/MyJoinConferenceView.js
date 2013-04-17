MyJoinConferenceView=Ext.extend(Ext.Panel,{searchPanel:null,gridPanel:null,store:null,topbar:null,constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();MyJoinConferenceView.superclass.constructor.call(this,{id:"MyJoinConferenceView",iconCls:"menu-conference_myjoin",title:"待我参加会议查询",region:"center",layout:"border",items:[this.searchPanel,this.gridPanel]});},initUIComponents:function(){this.searchPanel=new Ext.FormPanel({layout:"form",region:"north",width:"100%",height:80,keys:{key:Ext.EventObject.ENTER,fn:this.search.createCallback(this),scope:this},items:[{border:false,layout:"column",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label"},items:[{columnWidth:0.3,style:"margin-top:8px;",xtype:"container",layout:"form",items:[{anchor:"99%",xtype:"textfield",fieldLabel:"会议标题",name:"conference.confTopic",maxLength:256},{anchor:"99%",xtype:"textfield",fieldLabel:"会议室名称",name:"conference.roomName",maxLength:156}]},{columnWidth:0.3,style:"margin-top:8px;",xtype:"container",layout:"form",items:[{anchor:"99%",xtype:"combo",name:"conference.confProperty",fieldLabel:"会议类型",valueField:"typeId",displayField:"typeName",mode:"local",editable:false,triggerAction:"all",forceSelection:true,store:new Ext.data.SimpleStore({url:__ctxPath+"/admin/getTypeAllConference.do",autoLoad:true,fields:["typeId","typeName"]})},{anchor:"99%",xtype:"combo",hiddenName:"conference.roomId",fieldLabel:"会议室类型",valueField:"roomId",displayField:"roomName",mode:"local",editable:false,triggerAction:"all",forceSelection:true,store:new Ext.data.SimpleStore({url:__ctxPath+"/admin/getBoardrooConference.do",autoLoad:true,fields:["roomId","roomName"]})}]},{columnWidth:0.3,style:"margin-top:8px;",xtype:"container",layout:"form",items:[{anchor:"99%",fieldLabel:"会议内容",xtype:"textfield",name:"conference.confContent",maxLength:4000},{xtype:"container",layout:"column",fieldLabel:"会议时间",items:[{columnWidth:0.49,xtype:"datefield",name:"conference.startTime",format:"Y-m-d"},{xtype:"label",style:"margin-top:3px;",text:" 至 "},{columnWidth:0.49,anchor:"99%",xtype:"datefield",name:"conference.endTime",format:"Y-m-d"}]}]},{columnWidth:0.1,style:"margin-top:8px;margin-left:5px;",layout:"form",xtype:"container",defaultType:"button",items:[{iconCls:"search",text:"搜索",handler:this.search.createCallback(this)},{iconCls:"reset",style:"margin-top:5px;",text:"清空",handler:this.reset.createCallback(this)}]}]}]});this.store=new Ext.data.JsonStore({url:__ctxPath+"/admin/myJoinConference.do",root:"result",totalProperty:"totalCounts",remoteSort:true,fields:[{name:"confId",type:"int"},"confTopic","compereName","roomName","roomLocation","confContent","attendUsersName","feeBudget","startTime","endTime","status"]});this.store.setDefaultSort("confId","desc");this.store.load({params:{start:0,limit:25}});this.rowActions=new Ext.ux.grid.RowActions({header:"管理",width:80,actions:[{iconCls:"btn-showDetail",qtip:"查看",style:"margin:0 3px 0 3px"}]});var c=new Ext.grid.CheckboxSelectionModel();var d=new Ext.grid.ColumnModel({columns:[c,new Ext.grid.RowNumberer(),{header:"confId",dataIndex:"confId",hidden:true},{header:"会议议题",dataIndex:"confTopic"},{header:"主持人",dataIndex:"compereName"},{header:"与会人员",dataIndex:"attendUsersName"},{header:"经费(元)",dataIndex:"feeBudget"},{header:"会议内容",dataIndex:"confContent"},{header:"开始时间",dataIndex:"startTime"},{header:"结束时间",dataIndex:"endTime"},{header:"会议室名称",dataIndex:"roomName"},{header:"会议地址",dataIndex:"roomLocation"},this.rowActions],defaults:{sortable:true,menuDisabled:true,width:100}});this.topbar=new Ext.Toolbar({height:30,bodyStyle:"text-align:left",items:[]});this.gridPanel=new Ext.grid.GridPanel({id:"MyJoinConferenceGrid",region:"center",stripeRows:true,tbar:this.topbar,store:this.store,trackMouseOver:true,disableSelection:false,loadMask:true,autoHeight:true,cm:d,sm:c,plugins:this.rowActions,viewConfig:{forceFit:true,autoFill:true},bbar:new Ext.PagingToolbar({pageSize:25,store:this.store,displayInfo:true,displayMsg:"当前页记录索引{0}-{1}， 共{2}条记录",emptyMsg:"当前没有记录"})});this.gridPanel.addListener("rowdblclick",function(b,e,a){b.getSelectionModel().each(function(f){ConferenceDetailForm.show(f.data.confId);});});this.rowActions.on("action",this.onRowAction,this);},search:function(b){if(b.searchPanel.getForm().isValid()){$search({searchPanel:b.searchPanel,gridPanel:b.gridPanel});}},reset:function(b){b.searchPanel.getForm().reset();},createRecord:function(){new ConferenceForm().show();},showDetail:function(b){ConferenceDetailForm.show(b);},onRowAction:function(j,g,i,h,f){switch(i){case"btn-showDetail":this.showDetail(g.data.confId);break;}}});