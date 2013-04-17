Ext.ns("BookView");var BookView=function(){};BookView.prototype.setTypeId=function(b){this.typeId=b;BookView.typeId=b;};BookView.prototype.getTypeId=function(){return this.typeId;};BookView.prototype.getView=function(){return new Ext.Panel({id:"BookView",title:"图书列表",region:"center",layout:"border",autoScroll:true,items:[new Ext.FormPanel({region:"north",id:"BookSearchForm",height:40,frame:false,border:false,layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label",margins:{top:0,right:4,bottom:4,left:4}},items:[{text:"请输入查询条件:"},{text:"书名"},{xtype:"textfield",name:"Q_bookName_S_LK"},{text:"作者"},{xtype:"textfield",name:"Q_author_S_LK"},{xtype:"button",text:"查询",iconCls:"search",handler:function(){var d=Ext.getCmp("BookSearchForm");var c=Ext.getCmp("BookGrid");if(d.getForm().isValid()){$search({searchPanel:d,gridPanel:c});}}}]}),this.setup()]});};BookView.prototype.setup=function(){return this.grid();};BookView.prototype.grid=function(){var g=new Ext.grid.CheckboxSelectionModel();var f=new Ext.grid.ColumnModel({columns:[g,new Ext.grid.RowNumberer(),{header:"bookId",dataIndex:"bookId",hidden:true},{header:"类别",dataIndex:"typeName"},{header:"书名",dataIndex:"bookName"},{header:"作者",dataIndex:"author"},{header:"ISBN号",dataIndex:"isbn"},{header:"存放地点",dataIndex:"location"},{header:"所属部门",dataIndex:"department"},{header:"数量",dataIndex:"amount",width:50},{header:"在库数",dataIndex:"leftAmount",width:60},{header:"管理",dataIndex:"bookId",sortable:false,width:100,renderer:function(d,m,p,a,n){var b=p.data.bookId;var o=p.data.leftAmount;var c="";if(isGranted("_BookDel")){c='<button title="删除" value=" " class="btn-del" onclick="BookView.remove('+b+')"></button>';}if(isGranted("_BookEdit")){c+='&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="BookView.edit('+b+')"></button>';}if(isGranted("_BookBorrowAdd")){if(o!=0){c+='&nbsp;<button title="借阅该书" value=" " class="menu-book-borrow" onclick="BookView.borrow('+b+')"></button>';}}return c;}}],defaults:{sortable:true,menuDisabled:false,width:100}});var e=this.store();e.load({params:{start:0,limit:25}});var h=new Ext.grid.GridPanel({id:"BookGrid",tbar:this.topbar(),store:e,trackMouseOver:true,disableSelection:false,loadMask:true,region:"center",cm:f,sm:g,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},bbar:new HT.PagingBar({store:e})});h.addListener("rowdblclick",function(b,c,a){b.getSelectionModel().each(function(d){if(isGranted("_BookEdit")){BookView.edit(d.data.bookId);}});});return h;};BookView.prototype.store=function(){var b=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/admin/listBook.do"}),reader:new Ext.data.JsonReader({root:"result",totalProperty:"totalCounts",id:"id",fields:[{name:"bookId",type:"int"},{name:"typeName",mapping:"bookType.typeName"},"bookName","author","isbn","publisher","price","location","department","amount","leftAmount"]}),remoteSort:true});b.setDefaultSort("bookId","desc");return b;};BookView.prototype.topbar=function(){var b=new Ext.Toolbar({id:"BookFootBar",height:30,bodyStyle:"text-align:left",items:[]});if(isGranted("_BookAdd")){b.add(new Ext.Button({iconCls:"btn-add",text:"添加图书",handler:function(){new BookForm();Ext.getCmp("BookForm").remove("bookSnContainer");Ext.getCmp("amoutContainer").remove("bookAmoutButton");}}));}if(isGranted("_BookDel")){b.add(new Ext.Button({iconCls:"btn-del",text:"删除图书",handler:function(){var g=Ext.getCmp("BookGrid");var a=g.getSelectionModel().getSelections();if(a.length==0){Ext.ux.Toast.msg("信息","请选择要删除的记录！");return;}var f=Array();for(var h=0;h<a.length;h++){f.push(a[h].data.bookId);}BookView.remove(f);}}));}return b;};BookView.remove=function(c){var d=Ext.getCmp("BookGrid");Ext.Msg.confirm("信息确认","会把图书的借阅归还记录和ISBN一起删除，您确认要删除该记录吗？",function(a){if(a=="yes"){Ext.Ajax.request({url:__ctxPath+"/admin/multiDelBook.do",params:{ids:c},method:"post",success:function(){Ext.ux.Toast.msg("信息提示","成功删除所选记录！");d.getStore().reload({params:{start:0,limit:25}});}});}});};BookView.edit=function(b){new BookForm(b);};BookView.borrow=function(b){new BookBorrowForm(null,b);Ext.Ajax.request({url:__ctxPath+"/admin/getBook.do?bookId="+b,method:"post",success:function(g){var a=Ext.util.JSON.decode(g.responseText);var f=Ext.getCmp("bookName");f.setValue(a.data.bookName);var h=Ext.getCmp("borrowIsbn").getStore();h.reload({params:{bookId:b}});}});};