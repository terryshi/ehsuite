PersonalSalaryView=Ext.extend(Ext.Panel,{constructor:function(b){if(b==null){b={};}Ext.apply(this,b);this.initComponents();PersonalSalaryView.superclass.constructor.call(this,{id:"PersonalSalaryView",title:"个人薪酬纪录",region:"center",iconCls:"menu-personal-salary",layout:"border",items:[this.searchPanel,this.gridPanel]});},typeId:null,searchPanel:null,gridPanel:null,store:null,topbar:null,initComponents:function(){this.searchPanel=new Ext.FormPanel({region:"north",frame:false,border:false,layout:"hbox",height:40,layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label",margins:{top:0,right:4,bottom:4,left:4}},items:[{text:"查询条件：日期从"},{name:"Q_startTime_D_GE",width:100,xtype:"datefield",format:"Y-m-d"},{text:"至"},{name:"Q_endTime_D_LE",width:100,xtype:"datefield",format:"Y-m-d"},{xtype:"button",text:"查询",iconCls:"search",handler:this.search.createCallback(this)}]});this.store=new Ext.data.JsonStore({url:__ctxPath+"/hrm/personalSalaryPayoff.do",root:"result",baseParams:{"Q_userId_L_EQ":curUserInfo.userId,"Q_checkStatus_SN_EQ":1},totalProperty:"totalCounts",remoteSort:true,fields:[{name:"recordId",type:"int"},"fullname","userId","profileNo","idNo","standAmount","acutalAmount","checkStatus","startTime","endTime","content"]});this.store.setDefaultSort("startTime","desc");this.store.load({params:{start:0,limit:25}});var e=new Array();if(isGranted("_SalaryPayoffDel")){e.push({iconCls:"btn-del",qtip:"删除",style:"margin:0 3px 0 3px"});}if(isGranted("_SalaryPayoffEdit")){e.push({iconCls:"btn-edit",qtip:"编辑",style:"margin:0 3px 0 3px"});}if(isGranted("_SalaryPayoffCheck")){e.push({iconCls:"btn-salary-pay",qtip:"审核",style:"margin:0 3px 0 3px"});}if(isGranted("_SalaryPayoffQuery")){e.push({iconCls:"btn-operation",qtip:"操作记录",style:"margin:0 3px 0 3px"});}var g=new Ext.ux.grid.RowExpander({tpl:new Ext.Template('<div style="padding:5px 5px 5px 62px;">{content}</div>')});var h=new Ext.grid.CheckboxSelectionModel();var f=new Ext.grid.ColumnModel({columns:[h,new Ext.grid.RowNumberer(),g,{header:"recordId",dataIndex:"recordId",hidden:true},{header:"员工姓名",width:60,dataIndex:"fullname"},{header:"档案编号",width:150,dataIndex:"profileNo"},{header:"身份证号",width:120,dataIndex:"idNo"},{header:"薪标金额",width:60,dataIndex:"standAmount",renderer:function(a){return'<img src="'+__ctxPath+'/images/flag/customer/rmb.png"/>'+a;}},{header:"实发金额",width:60,dataIndex:"acutalAmount",renderer:function(a){return'<img src="'+__ctxPath+'/images/flag/customer/rmb.png"/>'+a;}},{header:"薪酬日期",width:130,dataIndex:"startTime",renderer:function(b,c,j,a,d){return b.substring(0,10)+"--"+j.data.endTime.substring(0,10);}}],defaults:{sortable:true,menuDisabled:false,width:100}});this.gridPanel=new Ext.grid.GridPanel({id:"PersonalSalaryPayoffGrid",region:"center",stripeRows:true,plugins:g,store:this.store,trackMouseOver:true,disableSelection:false,loadMask:true,region:"center",cm:f,sm:h,viewConfig:{forceFit:true,autoFill:true,forceFit:true},bbar:new HT.PagingBar({store:this.store})});},search:function(b){if(b.searchPanel.getForm().isValid()){$search({searchPanel:b.searchPanel,gridPanel:b.gridPanel});}}});