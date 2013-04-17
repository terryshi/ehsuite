LeaveManageView=Ext.extend(Ext.Panel,{constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();LeaveManageView.superclass.constructor.call(this,{id:"LeaveManageView",title:"请假管理",region:"center",layout:"border",iconCls:"menu-holiday",items:[this.searchPanel,this.gridPanel]});},initUIComponents:function(){this.searchPanel=new HT.SearchPanel({id:"LeaveManageSearchForm",height:40,frame:false,region:"north",border:false,layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label",margins:{top:0,right:4,bottom:4,left:4}},items:[{text:"查询条件:"},{text:"开始时间:从"},{xtype:"datetimefield",format:"Y-m-d H:i:s",name:"Q_startTime_D_GE",editable:false},{text:"到"},{xtype:"datetimefield",format:"Y-m-d H:i:s",name:"Q_endTime_D_LE",editable:false},{text:"审批状态"},{xtype:"combo",hiddenName:"Q_status_SN_EQ",mode:"local",width:80,editable:false,triggerAction:"all",store:[["0","未审批"],["1","通过审批"],["2","未通过审批"]]},{text:"查询",xtype:"button",scope:this,iconCls:"btn-search",handler:this.search},{text:"重置",xtype:"button",scope:this,iconCls:"btn-reset",handler:this.reset}]});this.topbar=new Ext.Toolbar({items:[]});this.gridPanel=new HT.GridPanel({region:"center",tbar:this.topbar,height:500,rowActions:true,id:"LeaveManageGrid",url:__ctxPath+"/personal/listErrandsRegister.do?Q_approvalId_L_EQ="+curUserInfo.userId+"&Q_flag_SN_EQ="+1,fields:[{name:"dateId",type:"int"},{name:"userName",mapping:"appUser.fullname"},"descp","startTime","endTime","approvalId","status","approvalOption","approvalName","flag"],columns:[{header:"dateId",dataIndex:"dateId",hidden:true},{header:"描述",dataIndex:"descp"},{header:"开始日期",dataIndex:"startTime"},{header:"结束日期",dataIndex:"endTime"},{header:"审批状态",dataIndex:"status",renderer:function(b){if(b=="0"){return"未审批";}if(b=="1"){return'<font color="green">通过审批</font>';}if(b=="2"){return'<font color="red">未通过审批</font>';}}},{header:"审批意见",dataIndex:"approvalOption"},{header:"审批人",dataIndex:"approvalName"},new Ext.ux.grid.RowActions({header:"管理",width:100,actions:[{iconCls:"btn-suggest-scan",qtip:"预览",stype:"margin:0 3px 0 3px"}],listeners:{scope:this,"action":this.onRowAction}})]});this.gridPanel.addListener("rowdblclick",this.rowClick);},reset:function(){this.searchPanel.getForm().reset();},search:function(){$search({searchPanel:this.searchPanel,gridPanel:this.gridPanel});},rowClick:function(d,e,f){d.getSelectionModel().each(function(a){new LeaveManageWin({dateId:a.data.dateId}).show();});},createRs:function(){new ErrandsRegisterForm();},removeRs:function(b){$postDel({url:__ctxPath+"/personal/multiDelErrandsRegister.do",ids:b,grid:this.gridPanel});},removeSelRs:function(){$delGridRs({url:__ctxPath+"/personal/multiDelErrandsRegister.do",grid:this.gridPanel,idName:"dateId"});},editRs:function(b){new ErrandsRegisterForm(b.data.dateId);},detailRs:function(b){new LeaveManageWin({dateId:b.data.dateId}).show();},onRowAction:function(j,g,i,h,f){switch(i){case"btn-suggest-scan":this.detailRs.call(this,g);break;default:break;}}});