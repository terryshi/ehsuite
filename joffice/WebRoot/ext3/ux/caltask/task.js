Ext.ECalendar.daytask=function(b){Ext.apply(this,b);Ext.ECalendar.daytask.superclass.constructor.call(this);};Ext.extend(Ext.ECalendar.daytask,Ext.util.Observable,{previndex:0,createdelementno:0,editable:true,parentview:null,baseBody:null,datehandle:new Date(),showQtip:true,tasksOffset:5,task_id:0,task_index:0,task_subject:"",task_starts:"",task_ends:"",task_description:"",task_location:"",task_isholiday:0,task_isallday:0,task_clsOver:"",task_increment:5,task_width:100,forceTaskFit:false,totalTasksonView:0,customHtml:"",customHTMLinpos:"before",bgcolor:"#E0FFA2",task_format:"d-m-Y H:i:s a",moreMenuItems:[],contextMenuLabels:e2cs.cal_locale.contextMenuLabelsDay,task_useBxStyle:false,task_useBxcolor:"#225588",tplqTip:new Ext.XTemplate('<tpl for=".">{starxl}{startval}<br>{endxl}{endval}<hr color="#003366" noshade>{details}</tpl>'),ShowMenuItems:[1,1,1,1,1],evenLaunch:"dblclick",init:function(c,d){this.calx=c;this.vday=d;},render:function(){var H=this.calx.currentdate.format("m/d/Y ")+this.vday.startTime;var W=this.calx.currentdate.format("m/d/Y ")+this.vday.endTime;this.totalhours=this.calx.dateDiff(new Date(H),new Date(W),e2cs.dateParts.HOUR);var P=this.checkTasktime(this.task_starts);var Z=this.checkTasktime(this.task_ends);var V=this.calx.currentdate.between(new Date(H),new Date(W));var O=this.calx.dateDiff(new Date(H),new Date(P),e2cs.dateParts.MINUTE);if(O<0){initpos=0;flagstarttasttext=e2cs.cal_locale.task_LessDaysFromTask;}else{initpos=O;flagstarttasttext="";}var aa=this.calx.dateDiff(new Date(W),new Date(Z),e2cs.dateParts.MINUTE);var I=new Date(Z).add(Date.SECOND,-1);var Q=this.calx.dateDiff(I,new Date(W),e2cs.dateParts.SECOND);if(aa>0&&Q!=0){endpos=(this.totalhours)*60;endpos=Math.abs(initpos-endpos);flagendtasttext=e2cs.cal_locale.task_MoreDaysFromTask;}else{var x=new Date(P);var U=new Date(this.calx.currentdate.format("m/d/Y")+" "+this.vday.startTime);if(x<U){endpos=this.calx.dateDiff(new Date(H),new Date(Z),e2cs.dateParts.MINUTE);}else{endpos=this.calx.dateDiff(new Date(P),new Date(Z),e2cs.dateParts.MINUTE);}flagendtasttext="";}if(this.customHtml==null||this.customHtml==undefined){var G="";var ab="";}else{if(this.customHTMLinpos=="before"){var G=this.customHtml;var ab="";}else{if(this.customHTMLinpos=="after"){var G="";var ab=this.customHtml;}else{var G="";var ab="";}}}this.task_index=(this.vday.tasks.length);if(this.forceTaskFit){this.taskobject=this.baseBody.createChild({tag:"div",cls:"task",html:G+flagstarttasttext+this.task_subject+flagendtasttext+ab});}else{this.taskobject=this.baseBody.createChild({tag:"div",cls:"task",html:G+flagstarttasttext+this.task_subject+flagendtasttext+ab});}this.taskobject.dom.setAttribute("id",this.calx.id+"-ecaltask-"+this.task_index+"");this.taskobject.dom.setAttribute("ec_id",""+this.task_id+"");this.taskobject.dom.setAttribute("ec_starts",""+P+"");this.taskobject.dom.setAttribute("ec_ends",""+Z+"");this.taskobject.dom.setAttribute("ec_subject",""+this.task_subject+"");this.taskobject.dom.setAttribute("ec_cnt",""+this.task_description+"");this.taskobject.dom.setAttribute("ec_storeindex",""+this.task_index+"");this.taskobject.dom.setAttribute("ec_location",""+this.task_location+"");this.taskobject.dom.setAttribute("ec_allday",""+this.task_isholiday+"");this.taskobject.dom.setAttribute("ec_isholiday",""+this.task_isallday+"");if(this.forceTaskFit){var ac=98/this.totalTasksonView;if(this.task_useBxStyle){this.taskobject.setStyle({border:"1px solid "+this.task_useBxcolor+""});if(Ext.isIE){this.taskobject.setStyle({height:""+(endpos)+"px"});}else{this.taskobject.setStyle({height:""+(endpos-2)+"px"});}this.taskobject.setStyle({width:""+(ac)+"%"});}else{this.taskobject.setStyle({height:""+(endpos)+"px"});this.taskobject.setStyle({width:""+(ac)+"%"});}}else{this.taskobject.setStyle({top:""+initpos+"px"});if(this.task_useBxStyle){this.taskobject.setStyle({border:"1px solid "+this.task_useBxcolor+""});if(Ext.isIE){this.taskobject.setStyle({height:""+(endpos)+"px"});this.taskobject.setStyle({width:""+(this.task_width)+"px"});}else{this.taskobject.setStyle({height:""+(endpos-2)+"px"});this.taskobject.setStyle({width:""+(this.task_width-2)+"px"});}}else{this.taskobject.setStyle({height:""+(endpos)+"px"});this.taskobject.setStyle({width:""+(this.task_width)+"px"});}if(this.tasksOffset=="auto"){if(this.task_index<=1){var K=0;}else{Y=this.task_width;K=0;for(var R=0;R<=(this.vday.tasks.length-1);R++){if(R!=0){K+=Ext.get(this.calx.id+"-ecaltask-"+(R)).getWidth(false);}}}}else{var K=0;if(this.task_index<=1){var Y=0;}else{Y=this.tasksOffset;this.taskobject.setStyle("margin-left",(Y)+"px");}}newancho=0;for(var R=0;R<=(this.vday.tasks.length);R++){if(R!=0){newancho+=Ext.get(this.calx.id+"-ecaltask-"+(R)).getWidth(false);}}if(newancho>this.baseBody.getWidth(false)){Ext.get(this.calx.id+"-daybody").setWidth(newancho);Ext.get("tdbaseday").setWidth(newancho);}if(Ext.isOpera){}else{}}this.taskobject.setY(this.baseBody.getY()+initpos);if(this.bgcolor){this.taskobject.setStyle("background-color",""+this.bgcolor+"");}else{this.taskobject.setStyle("background-color","#99CC99");}if(Ext.isIE){this.taskobject.setStyle("z-index","2000");}else{this.taskobject.setStyle("z-index","auto");}if(this.showQtip){var x=new Date(P);var ad=x.format(this.task_format);x=new Date(Z);var M=x.format(this.task_format);this.taskobject.dom.qtitle=this.task_subject;if(this.task_description==""){var J="&nbsp;<br/>&nbsp;";}else{var J=this.task_description;}var S={starxl:e2cs.cal_locale.task_qtip_starts,startval:ad,endxl:e2cs.cal_locale.task_qtip_ends,endval:M,details:J,location:this.task_location};this.taskobject.dom.qtip=this.tplqTip.apply(S);}if(this.task_clsOver!=""){this.taskobject.addClassOnOver(this.task_clsOver);}this.taskobject.addListener(this.evenLaunch,this.onDblclick,this);if(Ext.isOpera){this.taskobject.addListener("mousedown",this.operabuttons,this);}else{this.taskobject.addListener("contextmenu",this.oncontextmenu,this,{stopPropagation:true,normalized:true,preventDefault:true});}if(initpos==0&&endpos>(this.totalhours*60)){}else{if(this.editable){if(flagendtasttext==""){if(Ext.isIE){var E=true;}else{var E=false;}var L=new Ext.Resizable(this.calx.id+"-ecaltask-"+this.task_index+"",{pinned:E,width:this.task_width,handles:"s",heightIncrement:this.task_increment,minHeight:15,maxHeight:((this.totalhours*60)-initpos),dynamic:true,draggable:false});var T=this.baseBody;var X=this.vday;var D=this;var F=this.calx;L.on({"resize":{fn:function(b,d,a,f){var e=D.getTaskarray(b.el);var g=F.fireEvent("beforeTaskMove",e,D,X,F);if(g){D.applyChange(b.el);var c=D.getTaskarray(b.el);F.fireEvent("TaskMoved",c,D,X,null);}},scope:this}});if(flagstarttasttext==""&&flagendtasttext==""){var N=new Ext.dd.DDProxy(this.calx.id+"-ecaltask-"+this.task_index+"","task-group",{xTicks:0,yTicks:5});var T=this.baseBody;var X=this.vday;var D=this;var F=this.calx;N.startDrag=function(){this.constrainTo(T.id);this.setXConstraint(0,0,0);var a=Ext.get(this.getDragEl());var b=Ext.get(this.getEl());a.applyStyles({border:"","z-index":2000});a.update(b.dom.innerHTML);a.addClass("task-drag"+" dd-proxy");};N.endDrag=function(){var a=Ext.get(this.getDragEl());var c=Ext.get(this.getEl());var d=D.getTaskarray(this.id);var e=F.fireEvent("beforeTaskMove",d,D,X,F);if(e){c.setY(a.getY());D.applyChange(this);var b=D.getTaskarray(this.id);F.fireEvent("TaskMoved",b,D,X,this);}else{}};}}}}},operabuttons:function(d,f,e){if(Ext.isOpera){if(d.button==2){this.oncontextmenu(d,f,e);}}},oncontextmenu:function(n,s,m){if(Ext.isOpera){if(n.button!=2){return false;}}if(this.ShowMenuItems[0]!=true&&this.ShowMenuItems[1]!=true&&this.ShowMenuItems[2]!=true&&this.ShowMenuItems[3]!=true&&this.ShowMenuItems[4]!=true&&this.moreMenuItems.length<=0){return false;}n.stopEvent();if(s.id.indexOf(this.calx.id+"-ecaltask-")<0){var v=Ext.get(s.parentNode.id);}else{var v=Ext.get(s.id);}var o=this.getTaskarray(v);var u=this.vday.moreMenuItems;var i=this.ShowMenuItems;var q=[];var t=this.calx.fireEvent("beforeContextMenuTask","dayview-task",o,i,q);if(t==false){if(q[0]==false){if(q[1]==true){if(q[2]==true){var u=q[3];}var i=q[4];}else{var u=this.vday.moreMenuItems;var i=this.ShowMenuItems;}}else{return false;}}else{var u=this.vday.moreMenuItems;}if(this.menu){this.menu.removeAll();}this.menu=new Ext.menu.Menu({allowOtherMenus:true,shadow:false,items:[{id:"day_ctxbtn_task-add",iconCls:"x-calendar-day-btnmv_add",text:this.contextMenuLabels.taskAdd,scope:this},{id:"month_ctxbtn_task-delete",iconCls:"x-calendar-day-btnmv_delete",text:this.contextMenuLabels.taskDelete,scope:this},"-",{id:"month_ctxbtn_task-edit",iconCls:"x-calendar-day-btnmv_task",text:this.contextMenuLabels.taskEdit+v.getAttributeNS("tag","ec_subject"),scope:this},"-",{id:"month_ctxbtn_task-go-nd",iconCls:"x-calendar-day-btnmv_nextday",text:this.contextMenuLabels.NextDay,scope:this},{id:"month_ctxbtn_task-go-pd",iconCls:"x-calendar-day-btnmv_prevday",text:this.contextMenuLabels.PreviousDay,scope:this}]});if(u.length>0){this.menu.add("-");for(var r=0;r<u.length;r++){u[r].rendered=false;if(u[r].menu==undefined){u[r].rendered=false;if(u[r].ctype=="Ext.menu.Item"){u[r].addListener("click",function(a,b){this.onCustomMenuAction(a.id,Ext.get(s),this);},this);}else{}this.menu.add(u[r]);}else{u[r].menu.rendered=false;for(var p=0;p<u[r].menu.items.length;p++){u[r].menu.items.items[p].rendered=false;if(u[r].menu.items.items[p].ctype=="Ext.menu.Item"){u[r].menu.items.items[p].addListener("click",function(a,b){this.onCustomMenuAction(a.id,Ext.get(s),this);},this);}else{}}this.menu.add(u[r]);}}}this.menu.items.items[0].addListener("click",function(){this.onActionTask(1,Ext.get(s),this);},this);this.menu.items.items[1].addListener("click",function(){this.onActionTask(2,Ext.get(s),this);},this);this.menu.items.items[3].addListener("click",function(){this.onActionTask(3,Ext.get(s),this);},this);this.menu.items.items[5].addListener("click",function(){this.vday.onclicknext_day();},this);this.menu.items.items[6].addListener("click",function(){this.vday.onclickprev_day();},this);if(i[0]!=true){this.menu.items.items[0].hidden=true;}if(i[1]!=true){this.menu.items.items[1].hidden=true;}if(i[0]!=true&&i[1]!=true){this.menu.items.items[2].hidden=true;}if(i[2]!=true&&i[3]!=true&i[4]!=true&u.length<=0){this.menu.items.items[2].hidden=true;}if(i[2]!=true){this.menu.items.items[3].hidden=true;this.menu.items.items[4].hidden=true;}if(i[3]!=true&&i[4]!=true&u.length<=0){this.menu.items.items[4].hidden=true;}if(i[3]!=true){this.menu.items.items[5].hidden=true;}if(i[4]!=true){this.menu.items.items[6].hidden=true;}if(u.length>0){if(i[3]!=true&&i[4]!=true){this.menu.items.items[7].hidden=true;}}this.menu.on("hide",this.onContextTaskMenuHide,this);this.menu.showAt(n.xy);},onCustomMenuAction:function(e,g,h){var f=this.getTaskarray(g);this.calx.fireEvent("customMenuAction",e,"day",f,g,this.vday);this.menu.hide();},applyChange:function(l){var p=this.calx.currentdate.format("m/d/Y ")+this.vday.startTime;var r=this.calx.currentdate.format("m/d/Y ")+this.vday.endTime;var t=Ext.get(l.id);var o=Math.abs(t.getTop()-Ext.get(this.baseBody).getY());var s=t.getHeight();var m=new Date(p).add(Date.MINUTE,o);var k=m.add(Date.MINUTE,s);t.dom.setAttribute("ec_starts",""+m.format("m/d/Y H:i:s a")+"");t.dom.setAttribute("ec_ends",""+k.format("m/d/Y H:i:s a")+"");if(this.showQtip){var q=m.format(this.task_format);var n=k.format(this.task_format);t.dom.qtip=e2cs.cal_locale.task_qtip_starts+q+"<br>"+e2cs.cal_locale.task_qtip_ends+n+"<br>"+this.task_description;}},onActionTask:function(j,h,i){var f=this.getTaskarray(h);switch(j){case 1:this.calx.fireEvent("taskAdd",this.calx.currentdate);break;case 2:var g=this.calx.fireEvent("beforeTaskDelete",f,this.vday);if(g){if(this.calx.fireEvent("onTaskDelete",f)==true){this.calx.fireEvent("afterTaskDelete",f,true);}else{this.calx.fireEvent("afterTaskDelete",null,false);}}break;case 3:var g=this.calx.fireEvent("beforeTaskEdit",f,this.vday);if(g){if(this.calx.fireEvent("onTaskEdit",f)==true){this.calx.fireEvent("afterTaskEdit",f,true);}else{this.calx.fireEvent("afterTaskEdit",null,false);}}break;default:break;}},onContextTaskMenuHide:function(){},onDblclick:function(j,h,f){if(h.id.indexOf(this.calx.id+"-ecaltask-")<0){var i=Ext.get(h.parentNode.id);}else{var i=Ext.get(h.id);}var g=this.getTaskarray(i);this.calx.fireEvent("taskDblClick",g,this.vday,this.calx,"day");},getTaskarray:function(e){var f=Ext.get(e);var d=[];d[0]=f.getAttributeNS("tag","id");d[1]=f.getAttributeNS("tag","ec_id");d[2]=f.getAttributeNS("tag","ec_subject");d[3]=f.getAttributeNS("tag","ec_starts");d[4]=f.getAttributeNS("tag","ec_ends");d[5]=f.getAttributeNS("tag","ec_cnt");d[6]=f.getAttributeNS("tag","ec_storeindex");d[7]=f.getAttributeNS("tag","ec_location");d[8]=f.getAttributeNS("tag","ec_allday");d[9]=f.getAttributeNS("tag","ec_isholiday");return d;},checkTasktime:function(e){if(e instanceof Date){var d=e.format("m/d/Y G:i");}else{var d=e;}var f=d.indexOf(":",0);if(f<=0){taskvaluefix=d+" "+this.vday.startTime;}else{taskvaluefix=d;}return taskvaluefix;}});