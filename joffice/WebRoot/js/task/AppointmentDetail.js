var AppointmentDetail=function(b){return new Ext.Panel({title:"我的约会详情",iconCls:"menu-appointment",id:"AppointmentDetail",autoScroll:true,autoWidth:true,tbar:new Ext.Toolbar({height:30,bodyStyle:"text-align:left",defaultType:"button",items:[{text:"关闭",iconCls:"btn-mail_remove",handler:function(){var a=Ext.getCmp("centerTabPanel");var d=a.getItem("AppointmentDetail");a.remove(d);}},{text:"上一条",iconCls:"btn-up",handler:function(){var e=document.getElementById("__haveNextAppointFlag");if(e!=null&&e.value!="endPre"){var f=curUserInfo.userId;var a=document.getElementById("__curAppointId").value;Ext.getCmp("HomeAppointDetailPanel").load({url:__ctxPath+"/pages/task/appointmentdetail.jsp?opt=_pre&appointId="+a+"&userId="+f});}else{Ext.ux.Toast.msg("提示信息","这里已经是第一条了.");}}},{text:"下一条",iconCls:"btn-last",handler:function(){var e=document.getElementById("__haveNextAppointFlag");if(e!=null&&e.value!="endNext"){var f=curUserInfo.userId;var a=document.getElementById("__curAppointId").value;Ext.getCmp("HomeAppointDetailPanel").load({url:__ctxPath+"/pages/task/appointmentdetail.jsp?opt=_next&appointId="+a+"&userId="+f});}else{Ext.ux.Toast.msg("提示信息","这里已经是最后一条了.");}}}]}),items:[new Ext.Panel({width:650,id:"HomeAppointDetailPanel",autoScroll:true,style:"padding-left:10%;padding-top:10px;",autoHeight:true,border:false,autoLoad:{url:__ctxPath+"/pages/task/appointmentdetail.jsp?appointId="+b}})]});};