Ext.ns("UserJobDetailForm");UserJobDetailForm.show=function(e,f){var d=new Ext.Window({title:"员工["+f+"]职位信息",iconCls:"menu-job",width:480,height:200,minHeight:200,maximizable:true,modal:true,layout:"form",buttonAlign:"center",autoLoad:{url:__ctxPath+"/pages/system/UserJobDetailView.jsp?userId="+e},buttons:[{xtype:"button",iconCls:"btn-close",text:"关闭",handler:function(){d.close();}}],keys:{key:Ext.EventObject.ENTER,fn:function(){d.close();},scope:this}});d.show();};