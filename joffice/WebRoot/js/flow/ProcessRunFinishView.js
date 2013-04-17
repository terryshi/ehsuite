Ext.ns("ProcessRunFinishView");var ProcessRunFinishView=function(){return new Ext.Panel({id:"ProcessRunFinishView",title:"已办结的流程",iconCls:"menu-flowEnd",layout:"border",region:"center",autoScroll:true,items:[new Ext.FormPanel({id:"ProcessRunFinishSearchForm",region:"north",height:40,frame:false,border:false,layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label",margins:{top:0,right:4,bottom:4,left:4}},items:[{text:"请输入查询条件:"},{text:"标题"},{xtype:"textfield",name:"Q_subject_S_LK"},{text:"时间 从"},{xtype:"datefield",name:"Q_createtime_D_GT",format:"Y-m-d"},{text:" 至 "},{xtype:"datefield",name:"Q_createtime_D_LT",format:"Y-m-d"},{xtype:"button",text:"查询",iconCls:"search",handler:function(){var d=Ext.getCmp("ProcessRunFinishSearchForm");var c=Ext.getCmp("ProcessRunFinishGrid");if(d.getForm().isValid()){$search({searchPanel:d,gridPanel:c});}}}]}),this.setup()]});};ProcessRunFinishView.prototype.setup=function(){return this.grid();};ProcessRunFinishView.prototype.grid=function(){var g=new Ext.grid.CheckboxSelectionModel();var f=new Ext.grid.ColumnModel({columns:[g,new Ext.grid.RowNumberer(),{header:"runId",dataIndex:"runId",hidden:true},{header:"标题",dataIndex:"subject"},{header:"时间",dataIndex:"createtime",width:60},{header:"流程状态",dataIndex:"runStatus",renderer:function(a){if(a==0){return'<font color="red">草稿</font>';}else{if(a==1){return'<font color="green">正在运行</font>';}else{if(a==2){return'<font color="gray">结束</font>';}}}}},{header:"管理",dataIndex:"runId",width:50,renderer:function(c,o,s,p,a){var d=s.data.runId;var t=s.data.defId;var b=s.data.piId;var q=s.data.subject;var r='&nbsp;<button type="button" title="审批明细" value=" " class="btn-flowView" onclick="ProcessRunFinishView.detail('+d+","+t+",'"+b+"','"+q+"')\"></button>";return r;}}],defaults:{sortable:true,menuDisabled:false,width:100}});var e=this.store();e.load({params:{start:0,limit:25}});var h=new Ext.grid.GridPanel({id:"ProcessRunFinishGrid",store:e,trackMouseOver:true,disableSelection:false,loadMask:true,region:"center",tbar:new Ext.Toolbar(),cm:f,sm:g,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},bbar:new HT.PagingBar({store:e})});h.addListener("rowdblclick",function(b,c,a){b.getSelectionModel().each(function(d){ProcessRunFinishView.detail(d.data.runId,d.data.defId,d.data.piId,d.data.subject);});});return h;};ProcessRunFinishView.prototype.store=function(){var b=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/flow/listProcessRun.do?Q_runStatus_SN_EQ=2"}),reader:new Ext.data.JsonReader({root:"result",totalProperty:"totalCounts",id:"id",fields:[{name:"runId",type:"int"},"subject","createtime","defId","piId","runStatus"]}),remoteSort:true});b.setDefaultSort("runId","desc");return b;};ProcessRunFinishView.detail=function(k,h,l,g){var i=App.getContentPanel();var j=i.getItem("ProcessRunDetail"+k);if(j==null){j=new ProcessRunDetail(k,h,l,g);i.add(j);}i.activate(j);};