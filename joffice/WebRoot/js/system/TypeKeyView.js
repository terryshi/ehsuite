TypeKeyView=Ext.extend(Ext.Panel,{searchPanel:null,gridPanel:null,store:null,topbar:null,constructor:function(b){Ext.applyIf(this,b);this.initUIComponents();TypeKeyView.superclass.constructor.call(this,{id:"TypeKeyView",title:"[TypeKey]管理",region:"center",layout:"border",items:[this.searchPanel,this.gridPanel]});},initUIComponents:function(){this.searchPanel=new Ext.FormPanel({layout:"column",height:40,region:"north",bodyStyle:"padding:6px 10px 6px 10px",border:false,defaults:{border:false,anchor:"98%,98%"},items:[{columnWidth:0.3,layout:"form",items:{fieldLabel:"",name:"Q_typeName_S_LK",xtype:"textfield"}},{columnWidth:0.3,layout:"form",items:{fieldLabel:"",name:"Q_typeKey_S_LK",xtype:"textfield"}},{columnWidth:0.3,layout:"form",items:{fieldLabel:"",name:"Q_sn_S_LK",xtype:"textfield"}},{columnWidth:0.3,layout:"form",items:{xtype:"button",text:"查询",iconCls:"search",handler:this.search.createCallback(this)}}]});this.store=new Ext.data.JsonStore({url:__ctxPath+"/system/listTypeKey.do",root:"result",totalProperty:"totalCounts",remoteSort:true,fields:[{name:"typekeyId",type:"int"},"typeName","typeKey","sn"]});this.store.setDefaultSort("typekeyId","desc");this.store.load({params:{start:0,limit:25}});this.rowActions=new Ext.ux.grid.RowActions({header:"管理",width:80,actions:[{iconCls:"btn-del",qtip:"删除",style:"margin:0 3px 0 3px"},{iconCls:"btn-edit",qtip:"编辑",style:"margin:0 3px 0 3px"}]});var c=new Ext.grid.CheckboxSelectionModel();var d=new Ext.grid.ColumnModel({columns:[c,new Ext.grid.RowNumberer(),{header:"typekeyId",dataIndex:"typekeyId",hidden:true},{header:"",dataIndex:"typeName"},{header:"",dataIndex:"typeKey"},{header:"",dataIndex:"sn"},this.rowActions],defaults:{sortable:true,menuDisabled:false,width:100}});this.topbar=new Ext.Toolbar({height:30,bodyStyle:"text-align:left",items:[{iconCls:"btn-add",text:"添加[TypeKey]",xtype:"button",handler:this.createRecord},{iconCls:"btn-del",text:"删除[TypeKey]",xtype:"button",handler:this.delRecords,scope:this}]});this.gridPanel=new Ext.grid.GridPanel({id:"TypeKeyGrid",region:"center",stripeRows:true,tbar:this.topbar,store:this.store,trackMouseOver:true,disableSelection:false,loadMask:true,region:"center",cm:d,sm:c,plugins:this.rowActions,viewConfig:{forceFit:true,autoFill:true},bbar:new Ext.PagingToolbar({pageSize:25,store:this.store,displayInfo:true,displayMsg:"当前页记录索引{0}-{1}， 共{2}条记录",emptyMsg:"当前没有记录"})});this.gridPanel.addListener("rowdblclick",function(b,e,a){b.getSelectionModel().each(function(f){new TypeKeyForm({typekeyId:f.data.typekeyId}).show();});});this.rowActions.on("action",this.onRowAction,this);},search:function(b){if(b.searchPanel.getForm().isValid()){$search({searchPanel:b.searchPanel,gridPanel:b.gridPanel});}},createRecord:function(){new TypeKeyForm().show();},delByIds:function(b){Ext.Msg.confirm("信息确认","您确认要删除所选记录吗？",function(a){if(a=="yes"){Ext.Ajax.request({url:__ctxPath+"/system/multiDelTypeKey.do",params:{ids:b},method:"POST",success:function(f,e){Ext.ux.Toast.msg("操作信息","成功删除该[TypeKey]！");Ext.getCmp("TypeKeyGrid").getStore().reload();},failure:function(f,e){Ext.ux.Toast.msg("操作信息","操作出错，请联系管理员！");}});}});},delRecords:function(){var h=Ext.getCmp("TypeKeyGrid");var f=h.getSelectionModel().getSelections();if(f.length==0){Ext.ux.Toast.msg("信息","请选择要删除的记录！");return;}var g=Array();for(var e=0;e<f.length;e++){g.push(f[e].data.typekeyId);}this.delByIds(g);},editRecord:function(b){new TypeKeyForm({typekeyId:b.data.typekeyId}).show();},onRowAction:function(j,g,i,h,f){switch(i){case"btn-del":this.delByIds(g.data.typekeyId);break;case"btn-edit":this.editRecord(g);break;default:break;}}});