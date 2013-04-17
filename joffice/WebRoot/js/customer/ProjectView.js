Ext.ns("ProjectView");ProjectView=Ext.extend(Ext.Panel,{searchPanel:null,gridPanel:null,store:null,topbar:null,constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();ProjectView.superclass.constructor.call(this,{id:"ProjectView",title:"项目列表",iconCls:"menu-project",region:"center",layout:"border",items:[this.searchPanel,this.gridPanel]});},initUIComponents:function(){this.searchPanel=new Ext.FormPanel({id:"ProjectSearchForm",height:35,region:"north",frame:false,border:false,layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{style:"padding:0px 5px 0px 5px;",border:false,anchor:"98%,98%",labelWidth:75,xtype:"label"},items:[{text:"查询条件:"},{text:"项目名称"},{xtype:"textfield",width:80,name:"Q_projectName_S_LK"},{text:"项目编号"},{xtype:"textfield",width:80,name:"Q_projectNo_S_LK"},{text:"联系人"},{xtype:"textfield",width:80,name:"Q_fullname_S_LK"},{text:"客户"},{xtype:"textfield",width:80,name:"Q_customerId_S_LK"},{text:"业务员"},{xtype:"textfield",width:80,name:"Q_userId_S_LK"},{xtype:"button",text:"查询",iconCls:"search",handler:function(){var b=Ext.getCmp("ProjectSearchForm");var a=Ext.getCmp("ProjectGrid");if(b.getForm().isValid()){$search({searchPanel:b,gridPanel:a});}}}]});this.store=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/customer/listProject.do"}),reader:new Ext.data.JsonReader({root:"result",totalProperty:"totalCounts",id:"id",fields:[{name:"projectId",type:"int"},"projectName","projectNo","isContract","fullname","mobile","phone","otherContacts","customer","appUser"]}),remoteSort:true});this.store.setDefaultSort("projectId","desc");this.store.load({params:{start:0,limit:25}});var c=new Ext.grid.CheckboxSelectionModel();var d=new Ext.grid.ColumnModel({columns:[c,new Ext.grid.RowNumberer(),{header:"projectId",dataIndex:"projectId",hidden:true},{header:"合同",width:40,dataIndex:"isContract",renderer:function(a){if(a=="1"){return'<img title="有合同" src="'+__ctxPath+'/images/menus/customer/contract.png"/>';}}},{header:"项目编号",width:80,dataIndex:"projectNo"},{header:"项目名称",width:110,dataIndex:"projectName"},{header:"联系人",width:60,dataIndex:"fullname"},{header:"手机",width:80,dataIndex:"mobile"},{header:"电话",width:80,dataIndex:"phone"},{header:"所属客户",width:80,dataIndex:"customer",renderer:function(a){return a.customerName;}},{header:"业务员",width:60,dataIndex:"appUser",renderer:function(a){return a.fullname;}},{header:"管理",width:100,dataIndex:"projectId",width:50,sortable:false,renderer:function(k,l,n,a,m){var b=n.data.projectId;var j="";if(isGranted("_ProjectDel")){j='<button title="删除" value=" " class="btn-del" onclick="ProjectView.remove('+b+')">&nbsp</button>';}if(isGranted("_ProjectEdit")){j+='&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="ProjectView.edit('+b+')">&nbsp</button>';}return j;}}],defaults:{sortable:true,menuDisabled:false,width:100}});this.topbar=new Ext.Toolbar({id:"ProjectFootBar",height:30,bodyStyle:"text-align:left",items:[]});if(isGranted("_ProjectAdd")){this.topbar.add(new Ext.Button({iconCls:"btn-add",text:"添加项目",handler:function(){new ProjectForm().show();}}));}if(isGranted("_ProjectDel")){this.topbar.add(new Ext.Button({iconCls:"btn-del",text:"删除项目",xtype:"button",handler:function(){var b=Ext.getCmp("ProjectGrid");var h=b.getSelectionModel().getSelections();if(h.length==0){Ext.ux.Toast.msg("信息","请选择要删除的记录！");return;}var a=Array();for(var g=0;g<h.length;g++){a.push(h[g].data.projectId);}ProjectView.remove(a);}}));}this.gridPanel=new Ext.grid.GridPanel({id:"ProjectGrid",region:"center",tbar:this.topbar,store:this.store,trackMouseOver:true,disableSelection:false,loadMask:true,cm:d,sm:c,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},bbar:new HT.PagingBar({store:this.store})});this.gridPanel.addListener("rowdblclick",function(b,e,a){b.getSelectionModel().each(function(f){if(isGranted("_ProjectEdit")){ProjectView.edit(f.data.projectId);}});});}});ProjectView.remove=function(c){var d=Ext.getCmp("ProjectGrid");Ext.Msg.confirm("信息确认",'删除项目，则项目下的<font color="red">合同信息</font>及<font color="red">附件</font>也删除，您确认要删除该记录吗？',function(a){if(a=="yes"){Ext.Ajax.request({url:__ctxPath+"/customer/multiDelProject.do",params:{ids:c},method:"post",success:function(){Ext.ux.Toast.msg("信息提示","成功删除所选记录！");d.getStore().reload({params:{start:0,limit:25}});}});}});};ProjectView.edit=function(b){new ProjectForm({projectId:b}).show();};