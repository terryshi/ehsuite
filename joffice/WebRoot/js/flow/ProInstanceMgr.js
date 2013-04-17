ProInstanceMgr=Ext.extend(Ext.Panel,{constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();ProInstanceMgr.superclass.constructor.call(this,{id:"ProInstanceMgr",iconCls:"menu-instance",title:"流程实例管理",region:"center",layout:"border",items:[this.searchPanel,this.gridPanel]});},initUIComponents:function(){this.searchPanel=new HT.SearchPanel({layout:"form",region:"north",colNums:3,items:[{fieldLabel:"流程名称",name:"proDefinition.name",flex:1,xtype:"textfield"}],buttons:[{text:"查询",scope:this,iconCls:"btn-search",handler:this.search},{text:"重置",scope:this,iconCls:"btn-reset",handler:this.reset}]});this.topbar=new Ext.Toolbar({items:[{iconCls:"btn-refresh",text:"刷新",xtype:"button",scope:this,handler:this.refreshRs},{iconCls:"btn-detail",text:"查看",xtype:"button",scope:this,handler:this.detailRsM}]});this.gridPanel=new HT.GridPanel({region:"center",tbar:this.topbar,rowActions:true,url:__ctxPath+"/flow/inListProDefinition.do",fields:[{name:"defId",type:"int"},"typeName","name","subTotal","createtime","deployId","status"],columns:[{header:"defId",dataIndex:"defId",hidden:true},{header:"分类名称",dataIndex:"typeName",renderer:function(b){if(b!=null&&b!=""){return b;}else{return"<font color='red'>未定义</font>";}}},{header:"流程名称",dataIndex:"name"},{header:"正在运行的实例数目",dataIndex:"subTotal",renderer:function(b){return'<font color="red">'+b+"</font>";}},{header:"创建时间",dataIndex:"createtime"},new Ext.ux.grid.RowActions({header:"管理",width:32,fixed:true,resizable:false,actions:[{iconCls:"btn-detail",qtip:"查看",style:"margin:0 3px 0 3px"}],listeners:{scope:this,"action":this.onRowAction}})]});this.gridPanel.addListener("rowdblclick",this.rowClick);},reset:function(){this.searchPanel.getForm().reset();},search:function(){$search({searchPanel:this.searchPanel,gridPanel:this.gridPanel});},rowClick:function(d,e,f){d.getSelectionModel().each(function(i){var j=i.data.defId;var b=i.data.name;var a=App.getContentPanel();var c=a.getItem("ProcessRunList"+j);if(c==null){c=new ProInstanceView({id:"ProcessRunList"+j,defId:j,flowName:b});a.add(c);}a.activate(c);});},refreshRs:function(){this.gridPanel.getStore().reload();},detailRsM:function(){var b=this.gridPanel.getSelectionModel().getSelections();if(b.length==0){Ext.ux.Toast.msg("操作信息","请选择记录！");return;}if(b.length>1){Ext.ux.Toast.msg("操作信息","只能选择一条记录！");return;}this.detailRs(b[0]);},detailRs:function(f){var g=f.data.defId;var i=f.data.name;var h=App.getContentPanel();var j=h.getItem("ProcessRunList"+g);if(j==null){j=new ProInstanceView({id:"ProcessRunList"+g,defId:g,flowName:i});h.add(j);}h.activate(j);},onRowAction:function(j,g,i,h,f){switch(i){case"btn-detail":this.detailRs.call(this,g);break;default:break;}}});