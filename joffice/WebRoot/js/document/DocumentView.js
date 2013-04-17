Ext.ns("DocumentView");var DocumentView=function(){};DocumentView.prototype.getView=function(){return new Ext.Panel({id:"DocumentView",title:"所有文档",autoScroll:true,region:"center",layout:"border",items:[new Ext.FormPanel({region:"north",height:40,frame:false,border:false,id:"DocumentSearchForm",layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label",margins:{top:0,right:4,bottom:4,left:4}},items:[{text:"文档名称"},{xtype:"textfield",name:"Q_docName_S_LK"},{text:"创建时间 从"},{xtype:"datefield",format:"Y-m-d",name:"Q_createtime_D_GE"},{text:"至"},{xtype:"datefield",format:"Y-m-d",name:"Q_createtime_D_LE"},{xtype:"button",text:"查询",iconCls:"search",handler:function(){var d=Ext.getCmp("DocumentSearchForm");var c=Ext.getCmp("DocumentGrid");if(d.getForm().isValid()){$search({searchPanel:d,gridPanel:c});}}},{xtype:"button",text:"重置",iconCls:"reset",hander:function(){var b=Ext.getCmp("DocumentSearchForm");b.getForm().reset();}}]}),this.setup()]});};DocumentView.prototype.setFolderId=function(b){this.folderId=b;DocumentView.folderId=b;};DocumentView.prototype.getFolderId=function(){return this.folderId;};DocumentView.prototype.setup=function(){return this.grid();};DocumentView.prototype.grid=function(){var g=new Ext.grid.CheckboxSelectionModel();var f=new Ext.grid.ColumnModel({columns:[g,new Ext.grid.RowNumberer(),{header:"docId",dataIndex:"docId",hidden:true},{header:"文档名称",dataIndex:"docName",width:120},{header:"创建时间",dataIndex:"createtime"},{header:"共享",width:40,dataIndex:"isShared",renderer:function(a){if(a==1){return'<img src="'+__ctxPath+'/images/flag/shared.png" alt="共享" title="共享" />';}else{return'<img src="'+__ctxPath+'/images/flag/lock.png" alt="私有" title="私有" />';}}},{header:"附件",dataIndex:"haveAttach",renderer:function(b,d,l){if(b==""||b=="0"){return"无附件";}else{var c=l.data.attachFiles;var a="";for(var i=0;i<c.length;i++){a+='<a href="#" onclick="FileAttachDetail.show('+c[i].fileId+');" class="attachment">'+c[i].fileName+"</a>";a+="&nbsp;";}return a;}}},{header:"管理",dataIndex:"docId",width:50,renderer:function(d,l,n,a,m){var b=n.data.docId;var c='<button title="删除" value=" " class="btn-del" onclick="DocumentView.remove('+b+')">&nbsp;</button>';c+='&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="DocumentView.edit('+b+')">&nbsp;</button>';c+='&nbsp;<button title="共享" value=" " class="btn-shared" onclick="DocumentView.shared('+b+')">&nbsp;</button>';return c;}}],defaults:{sortable:true,menuDisabled:false,width:100}});var e=this.store();e.load({params:{start:0,limit:25}});var h=new Ext.grid.GridPanel({id:"DocumentGrid",tbar:this.topbar(this),store:e,trackMouseOver:true,disableSelection:false,loadMask:true,region:"center",maxHeight:600,cm:f,sm:g,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},bbar:new HT.PagingBar({store:e})});h.addListener("rowdblclick",function(b,c,a){b.getSelectionModel().each(function(d){DocumentView.edit(d.data.docId);});});return h;};DocumentView.prototype.store=function(){var b=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/document/listDocument.do"}),reader:new Ext.data.JsonReader({root:"result",totalProperty:"totalCounts",id:"id",fields:[{name:"docId",type:"int"},"docName","content","createtime","haveAttach","attachFiles","isShared"]}),remoteSort:true});b.setDefaultSort("docId","desc");return b;};DocumentView.prototype.topbar=function(c){var d=new Ext.Toolbar({id:"DocumentFootBar",height:30,bodyStyle:"text-align:left",items:[{iconCls:"btn-add",text:"添加文档",xtype:"button",handler:function(){new DocumentForm(null);}},{iconCls:"btn-del",text:"删除文档",xtype:"button",handler:function(){var b=Ext.getCmp("DocumentGrid");var h=b.getSelectionModel().getSelections();if(h.length==0){Ext.ux.Toast.msg("信息","请选择要删除的记录！");return;}var a=Array();for(var g=0;g<h.length;g++){a.push(h[g].data.docId);}DocumentView.remove(a);}}]});return d;};DocumentView.remove=function(c){var d=Ext.getCmp("DocumentGrid");Ext.Msg.confirm("信息确认","您确认要删除该记录吗？",function(a){if(a=="yes"){Ext.Ajax.request({url:__ctxPath+"/document/multiDelDocument.do",params:{ids:c},method:"post",success:function(){Ext.ux.Toast.msg("信息提示","成功删除所选记录！");d.getStore().reload({params:{start:0,limit:25}});}});}});};DocumentView.edit=function(b){new DocumentForm(b);};DocumentView.shared=function(b){new DocumentSharedForm(b).getView().show();};