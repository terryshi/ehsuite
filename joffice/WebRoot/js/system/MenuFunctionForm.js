MenuFunctionForm=Ext.extend(Ext.Window,{constructor:function(b){Ext.applyIf(this,b);this.initUIComponent(this.menuId);MenuFunctionForm.superclass.constructor.call(this,{id:"MenuFunctionFormWin",title:this.menuText!=null?"新增/编辑["+this.menuText+"]菜单权限":"新增/编辑菜单权限",iconCls:"menu-m",width:"500",height:"450",layout:"fit",modal:true,plain:false,maximizable:true,style:"padding : 5px 5px 5px 5px;",keys:{key:Ext.EventObject.ENTER,fn:this.submit,scope:this},buttonAlign:"center",buttons:[{text:"确定",iconCls:"btn-ok",handler:this.submit,scope:this},{text:"取消",iconCls:"btn-cancel",handler:function(){Ext.getCmp("MenuFunctionFormWin").close();}}],items:[this.formPanel]});},initUIComponent:function(g){var h=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/menu/getFnMenu.do"}),reader:new Ext.data.JsonReader({root:"url",totalProperty:"totalCounts",id:"id",fields:["note"]}),remoteSort:false});if(this.fId!=null&&this.fId!="undefined"){h.load({params:{id:g,fId:this.fId}});}var f=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),{header:"路径",dataIndex:"note",sortable:true,menuDisabled:true}]});var e=new Ext.grid.GridPanel({id:"MenuFuncionFormGrid",title:"请求地址列表",autoHeight:true,autoScroll:true,tbar:new Ext.Toolbar({height:30,items:[{text:"添加",iconCls:"btn-add",scope:this,handler:this.addUrl},{text:"删除",iconCls:"btn-del",scope:this,handler:this.del.createCallback(g,this.fId)}]}),autoScroll:true,trackMouseOver:true,store:h,cm:f,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false}});this.formPanel=new Ext.FormPanel({id:"MenuFunctionFormPanel",layout:"form",region:"center",url:__ctxPath+"/menu/saveFnMenu.do",border:false,anchor:"98% 98%",defaultType:"textfield",style:"padding : 5px 5px 5px 5px;",items:[{xtype:"fieldset",title:"基本信息",defaultType:"textfield",items:[{xtype:"hidden",name:"id",value:this.menuId!=null?this.menuId:""},{xtype:"hidden",name:"fType",value:this.fId!=null?"edit":"add"},{name:"text",width:"94%",fieldLabel:"菜单名称",value:this.menuText!=null?this.menuText:"",readOnly:true},{name:"fId",width:"94%",fieldLabel:"权限编号",allowBlank:false,maxLength:125,regex:/^[_]?[A-Za-z0-9]*$/,regexText:"权限编号不能输入中文，首字符可以是_！",value:this.fId!=null?this.fId:"",readOnly:this.fId!=null?true:false},{name:"fText",width:"94%",fieldLabel:"权限名称",allowBlank:false,maxLength:125},{xtype:"container",height:29,layout:"column",defaultType:"textfield",items:[{xtype:"label",text:"图标:",width:104},{name:"fIconCls",columnWidth:0.94},{width:100,xtype:"button",text:"请选择",iconCls:"menu-m",handler:function(){IconSelector.getView(function(a){var b=Ext.getCmp("MenuFunctionFormPanel");b.getCmpByName("fIconCls").setValue(a);}).show();}}]}]},{xtype:"fieldset",title:"请求地址",autoScroll:true,items:[e]}]});if(this.fId!=null&&this.fId!="undefined"){this.formPanel.getForm().load({deferredRender:true,url:__ctxPath+"/menu/getFnMenu.do?fId="+this.fId+"&id="+g,method:"post",waitMsg:"数据正在提交，请稍后...",success:function(b,a){}});}},addUrl:function(){var d=Ext.getCmp("MenuFunctionFormPanel");var f=d.getCmpByName("id").getValue();var e=d.getCmpByName("fId").getValue();if(e==null||e==""||e=="undefined"){Ext.ux.Toast.msg("操作提示","对不起，请选择或者添加菜单权限！");return;}new MenuUrlForm({id:f,fId:e}).show();},submit:function(){var d=Ext.getCmp("MenuFunctionFormPanel");var c=d.getCmpByName("fType").getValue()=="add"?"/menu/addFnMenu.do":"/menu/editFnMenu.do";if(d.getForm().isValid()){d.getForm().submit({url:__ctxPath+c,method:"post",waitMsg:"数据正在提交，请稍后...",success:function(b,a){Ext.ux.Toast.msg("操作提示","恭喜你，数据操作成功！");Ext.getCmp("MenuFormEditGrid").getStore().reload();Ext.getCmp("MenuFunctionFormWin").close();},failure:function(f,a){var b=Ext.util.JSON.decode(a.response.responseText);Ext.ux.Toast.msg("操作提示",b.msg);}});}},del:function(g,f){var e=Ext.getCmp("MenuFuncionFormGrid");var h=e.getSelectionModel().getSelections();if(h.length>0){Ext.Msg.confirm("操作提示","你真的要删除该数据吗？",function(a){if(a=="yes"){var b=e.getStore().indexOf(h[0]);Ext.Ajax.request({url:__ctxPath+"/menu/delUrlMenu.do?id="+g+"&fId="+f+"&index="+b,method:"post",waitMsg:"数据正在提交，请稍后...",success:function(){Ext.ux.Toast.msg("操作提示","删除数据操作成功！");Ext.getCmp("MenuFuncionFormGrid").getStore().reload();},failure:function(){Ext.ux.Toast.msg("操作提示","对不起，删除数据操作失败！");}});}});}else{Ext.ux.Toast.msg("操作提示","对不起，请选择要删除的数据！");}}});