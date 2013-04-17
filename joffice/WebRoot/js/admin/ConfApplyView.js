ConfApplyView=Ext.extend(Ext.Panel,{searchPanel:null,gridPanel:null,store:null,topbar:null,constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();ConfApplyView.superclass.constructor.call(this,{id:"ConfApplyView",title:"未通过审核会议查询",iconCls:"menu-confApply",region:"center",layout:"border",items:[this.searchPanel,this.gridPanel]});},initUIComponents:function(){this.searchPanel=new Ext.FormPanel({layout:"form",region:"north",width:"100%",height:80,keys:{key:Ext.EventObject.ENTER,fn:this.search.createCallback(this),scope:this},items:[{border:false,layout:"column",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label"},items:[{columnWidth:0.3,style:"margin-top:8px;",xtype:"container",layout:"form",items:[{anchor:"99%",xtype:"textfield",fieldLabel:"会议标题",name:"Q_confTopic_S_LK",maxLength:256},{anchor:"99%",xtype:"textfield",fieldLabel:"会议室名称",name:"Q_roomName_S_LK",maxLength:156}]},{columnWidth:0.3,style:"margin-top:8px;",xtype:"container",layout:"form",items:[{anchor:"99%",xtype:"combo",name:"Q_confProperty_S_LK",fieldLabel:"会议类型",valueField:"typeId",displayField:"typeName",mode:"local",editable:false,triggerAction:"all",forceSelection:true,store:new Ext.data.SimpleStore({url:__ctxPath+"/admin/getTypeAllConference.do",autoLoad:true,fields:["typeId","typeName"]})},{anchor:"99%",xtype:"combo",hiddenName:"Q_roomId_L_EQ",fieldLabel:"会议室类型",valueField:"roomId",displayField:"roomName",mode:"local",editable:false,triggerAction:"all",forceSelection:true,store:new Ext.data.SimpleStore({url:__ctxPath+"/admin/getBoardrooConference.do",autoLoad:true,fields:["roomId","roomName"]})}]},{columnWidth:0.3,style:"margin-top:8px;",xtype:"container",layout:"form",items:[{anchor:"99%",fieldLabel:"会议内容",xtype:"textfield",name:"Q_confContent_S_LK",maxLength:4000},{xtype:"container",layout:"column",fieldLabel:"会议时间",items:[{columnWidth:0.49,xtype:"datefield",name:"Q_startTime_D_GE",format:"Y-m-d"},{xtype:"label",style:"margin-top:3px;",text:" 至 "},{columnWidth:0.49,anchor:"99%",xtype:"datefield",name:"Q_endTime_D_LE",format:"Y-m-d"}]}]},{columnWidth:0.1,style:"margin-top:8px;margin-left:5px;",layout:"form",xtype:"container",defaultType:"button",items:[{iconCls:"search",text:"搜索",handler:this.search.createCallback(this)},{iconCls:"reset",style:"margin-top:5px;",text:"清空",handler:this.reset.createCallback(this)}]}]}]});this.store=new Ext.data.JsonStore({url:__ctxPath+"/admin/unThroughtConference.do",root:"result",totalProperty:"totalCounts",remoteSort:true,fields:[{name:"confId",type:"int"},"confTopic","compereName","roomName","roomLocation","attendUsersName","feeBudget","checkReason","startTime","endTime","status"]});this.store.setDefaultSort("confId","desc");this.store.load({params:{start:0,limit:25}});this.rowActions=new Ext.ux.grid.RowActions({header:"管理",width:80,actions:[{iconCls:"btn-del",qtip:"删除",style:"margin:0 3px 0 3px"},{iconCls:"btn-showDetail",qtip:"查看",style:"margin:0 3px 0 3px"}]});var c=new Ext.grid.CheckboxSelectionModel();var d=new Ext.grid.ColumnModel({columns:[c,new Ext.grid.RowNumberer(),{header:"confId",dataIndex:"confId",hidden:true},{header:"会议议题",dataIndex:"confTopic"},{header:"主持人",dataIndex:"compereName"},{header:"与会人员",dataIndex:"attendUsersName"},{header:"经费(元)",dataIndex:"feeBuget"},{header:"审核备注",dataIndex:"checkReason"},{header:"开始时间",dataIndex:"startTime"},{header:"结束时间",dataIndex:"endTime"},{header:"会议室名称",dataIndex:"roomName"},{header:"会议地址",dataIndex:"roomLocation"},this.rowActions],defaults:{sortable:true,menuDisabled:true,width:100}});this.topbar=new Ext.Toolbar({height:30,bodyStyle:"text-align:left",items:[{text:"删除",iconCls:"btn-del",xtype:"button",handler:this.delRecords}]});this.gridPanel=new Ext.grid.GridPanel({id:"ConfApplyGrid",region:"center",stripeRows:true,tbar:this.topbar,store:this.store,trackMouseOver:true,disableSelection:false,loadMask:true,autoHeight:true,cm:d,sm:c,plugins:this.rowActions,viewConfig:{forceFit:true,autoFill:true},bbar:new Ext.PagingToolbar({pageSize:25,store:this.store,displayInfo:true,displayMsg:"当前页记录索引{0}-{1}， 共{2}条记录",emptyMsg:"当前没有记录"})});this.gridPanel.addListener("rowdblclick",function(b,e,a){b.getSelectionModel().each(function(f){ConferenceDetailForm.show(f.data.confId);});});this.rowActions.on("action",this.onRowAction,this);},search:function(b){if(b.searchPanel.getForm().isValid()){b.searchPanel.getForm().submit({waitMsg:"正在提交查询",url:__ctxPath+"/admin/unThroughtConference.do",success:function(f,e){var a=Ext.util.JSON.decode(e.response.responseText);b.gridPanel.getStore().loadData(a);}});}},reset:function(b){b.searchPanel.getForm().reset();},delByIds:function(b){Ext.Msg.confirm("信息确认","您确认要删除所选记录吗？",function(a){if(a=="yes"){Ext.Ajax.request({url:__ctxPath+"/admin/multiDelConference.do",params:{ids:b},method:"POST",success:function(f,e){Ext.ux.Toast.msg("操作信息","成功删除该会议信息！");Ext.getCmp("ConfApplyGrid").getStore().reload();},failure:function(f,e){Ext.Msg.alert("操作信息","操作出错，请联系管理员！");}});}});},delRecords:function(){var h=Ext.getCmp("ConfApplyGrid");var f=h.getSelectionModel().getSelections();if(f.length==0){Ext.ux.Toast.msg("信息","请选择要删除的记录！");return;}var g=Array();for(var e=0;e<f.length;e++){g.push(f[e].data.confId);}Ext.Msg.confirm("信息确认","您确认要删除所选记录吗？",function(a){if(a=="yes"){Ext.Ajax.request({url:__ctxPath+"/admin/multiDelConference.do",params:{ids:g},method:"POST",success:function(c,b){Ext.ux.Toast.msg("操作信息","成功删除该会议信息！");Ext.getCmp("ConfApplyGrid").getStore().reload();},failure:function(c,b){Ext.Msg.alert("操作信息","操作出错，请联系管理员！");}});}});},showDetail:function(b){ConferenceDetailForm.show(b);},onRowAction:function(j,g,i,h,f){switch(i){case"btn-del":this.delByIds(g.data.confId);break;case"btn-showDetail":this.showDetail(g.data.confId);break;}}});