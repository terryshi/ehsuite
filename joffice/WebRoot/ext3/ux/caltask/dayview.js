Ext.ECalendar.dayview=function(b){Ext.apply(this,b);this.addEvents("beforeDayChange","afterDayChange");Ext.ECalendar.dayview.superclass.constructor.call(this);};Ext.extend(Ext.ECalendar.dayview,Ext.util.Observable,{referid:"dayview",header:true,headerFormat:"星期l - d - F  - Y",headerButtons:true,moreMenuItems:[],hourFormat:"G:i",startTime:"7:00:00 am",endTime:"10:00:00 pm",scrolltoHour:false,task_useBorderStyle:false,task_useBordercolor:"#225588",taskBaseColor:"#ffffff",useMultiColorTasks:false,multiColorTasks:[],task_increment:5,task_width:50,tasksOffset:0,task_clsOver:"",task_showqtip:true,task_format:"Y-m-d H:i:s",taskAdd_dblclick:true,taskAdd_timer_dblclick:true,task_DDeditable:true,task_eventLaunch:"click",ShowMenuItems:[1,1,1,1,1,1],task_ShowMenuItems:[1,1,1,1,1],customHTMLinpos:"before",forceTaskFit:false,headerUseTpl:false,headerTpl:new Ext.XTemplate('<tpl for=".">{title}-{datetouse:this.formatx}</tpl>',{formatx:function(b){return b.format("l - d - F  - Y");}}),headerData:{title:"Custom header for Day",datetouse:new Date()},tasks:[],init:function(c,d){this.calx=c;this.datetohandle=d;},refreshView:function(){this.render();},render:function(){var af=Ext.get(this.calx.body);var au=af.dom.childNodes.length;if(au){for(var P=au;P<au;P++){af.dom.removeChild(af.dom.childNodes[0]);}}af.update("");var af=Ext.get(this.calx.body);var ao='<div id="'+this.calx.id+'-main-calendar-header"></div>';ao+='<div id="'+this.calx.id+'-main-calendar-day-body"></div>';af.update(ao);this.datetohandle=this.calx.currentdate;if(this.header){var aq=this.datetohandle;var ah=this.genHeader(this.datetohandle);var ah=Ext.get(this.calx.id+"-main-calendar-header");var av=ah;var T=av.wrap({tag:"div",cls:"x-calendar-dayv-header",html:""});if(this.headerButtons){var am=T.createChild({id:this.calx.id+"-btn-pd",tag:"div",cls:"x-calendar-day-previous",html:""});var S=T.createChild({id:this.calx.id+"-btn-nd",tag:"div",cls:"x-calendar-day-next",html:""});am.dom["qtip"]=e2cs.cal_locale.headerTooltipsDay.prev;am.addListener("click",this.onclickprev_day,this);am.addClassOnOver("x-calendar-day-previous-over");S.dom["qtip"]=e2cs.cal_locale.headerTooltipsDay.next;S.addListener("click",this.onclicknext_day,this);S.addClassOnOver("x-calendar-day-next-over");}if(this.headerUseTpl){var N=this.headerTpl.apply(this.headerData);var ac=T.createChild({tag:"div",id:"header",html:""+N+""});}else{var ac=T.createChild({tag:"div",id:"header",html:""+aq.format(this.headerFormat)+""});}}Ext.get(this.calx.id+"-main-calendar-header").setStyle("z-index","99999");var ar=this.genBody(this.datetohandle);var aw=Ext.get(this.calx.id+"-main-calendar-day-body");var W=aw.wrap({tag:"div",cls:"x-calendar-dayv-day",html:""});if(Ext.isIE){W.setStyle({position:"relative"});}if(this.calx.ownerCt!=undefined){if(this.calx.ownerCt.ctype&&this.calx.ownerCt.ctype=="Ext.Component"){this.calx.height=this.calx.ownerCt.getInnerHeight();}}if(!this.calx.height||this.calx.height=="undefined"){if(this.calx.getEl().dom.offsetParent!=null){var ak=this.calx.getEl().dom.offsetParent.clientHeight;}else{var ak=0;}}else{var ak=this.calx.height;}if(ak==0){ak=300;}if(this.header){ak+=-24;}if(this.calx.showCal_tbar){ak+=-26;}if(this.calx.header){ak+=-26;}var Y=0;W.setStyle({height:""+ak-Y+"px"});W.setStyle({overflow:"auto"});tmpid=this.calx.id;W.addListener("scroll",function(){if(Ext.get(tmpid+"-daybody")){Ext.get(tmpid+"-daybody").setStyle("filter","alpha(opacity=100)");Ext.get(tmpid+"-daybody").setStyle("filter","");}});var an=W.createChild({tag:"div",id:this.calx.id+"-calendar-view-day",html:ar});if(Ext.isIE){an.setStyle({position:"relative"});}if(Ext.isIE||Ext.isIE6){Ext.get("daylayoutbody").setStyle({position:"relative"});Ext.get("daylayoutbody").setWidth(Ext.get("daylayoutbody").getWidth()-25,false);Ext.get(this.calx.id+"-tableallday").setStyle({position:"relative"});}var aa=Ext.get(this.calx.id+"-daybody");var X=this.calx.currentdate;var al=this.calx;var ag=this.taskAdd_dblclick;if(ag){aa.addListener("dblclick",function(d,b,f){if(b.id.indexOf("-daybody")<0){return false;}var e=X;var a=Ext.get(al.id+"-calendar-view-day").getY();if(Ext.isIE){var c=Ext.select("td.hour-marker_ie",true);}else{var c=Ext.select("td.hour-marker",true);}c.each(function(h,m,k){if(h.id.indexOf(al.id+"-tdbody-dayv-")+1>=1){var g=Ext.get(h).getY();var l=Ext.get(h).getHeight();var n=d.getPageY();if(n>=g&&n<=(g+l)){if(h.id.indexOf(al.id+"-tdbody-dayv-")<0){var j=Ext.get(h).parent().id.replace(al.id+"-tdbody-dayv-","");}else{var j=h.id.replace(al.id+"-tdbody-dayv-","");}e=new Date(j);return false;}else{return true;}}},this);al.fireEvent("taskAdd",e);});}if(this.taskAdd_timer_dblclick){if(Ext.isIE){var M=Ext.select("td.hour-marker_ie",true);}else{var M=Ext.select("td.hour-marker",true);}M.each(function(b,a,c){if(b.id.indexOf(al.id+"-tdbody-dayv-")+1>=1){b.addListener("dblclick",function(e,d,f){if(d.id.indexOf(al.id+"-tdbody-dayv-")<0){var h=Ext.get(d).parent().id.replace(al.id+"-tdbody-dayv-","");}else{var h=d.id.replace(al.id+"-tdbody-dayv-","");}var g=new Date(h);al.fireEvent("taskAdd",g);});}},this);}aa.setHeight(Ext.get("tdbaseday").getHeight(true));if(Ext.isOpera){aa.addListener("mousedown",this.operadaybuttons,this);}else{aa.addListener("contextmenu",this.oncontextmenuBody,this,{stopPropagation:false,normalized:true,preventDefault:true});}this.tasks=[];var at=new Date(this.datetohandle.format("m/d/Y")+" "+this.startTime);var Q=new Date(this.datetohandle.format("m/d/Y")+" "+this.endTime);var V=this.calx.store.getCount();var ad=0;for(var P=0;P<V;P++){var ae=this.calx.store.getAt(P).data;testdateinit=this.calx.store.getAt(P).data[this.calx.fieldsRefer.startdate];testdateend=this.calx.store.getAt(P).data[this.calx.fieldsRefer.enddate];checkdates=this.datetohandle.between(new Date(testdateinit),new Date(testdateend));chkformat=this.datetohandle.format("m/d/Y");ap=new Date(testdateinit);if(ap.format("m/d/Y")==chkformat){checkdates=true;}ap=new Date(testdateend);if(ap.format("m/d/Y")==chkformat){checkdates=true;}if(checkdates){ad+=1;}}var V=ad;if(V>0){currentindex=0;created=0;previndex=0;if(this.tasksOffset=="auto"){var ai=V*this.task_width;}else{var ai=(V*this.task_width)-((V-1)*this.tasksOffset);}if(Ext.get("tdbaseday").getWidth(true)<ai){if(!this.calx.width||this.calx.width=="undefined"){}else{Ext.get(this.calx.id+"-daybody").setWidth(ai,false);Ext.get("daylayoutbody").setWidth(Ext.get(this.calx.id+"-tableallday").getWidth(true)+1,false);}var ap=11;}var V=this.calx.store.getCount();var R=[];for(var i=0;i<V;i++){dateinit=this.calx.store.getAt(i).data[this.calx.fieldsRefer.startdate];dateend=this.calx.store.getAt(i).data[this.calx.fieldsRefer.enddate];checkdates=this.datetohandle.between(new Date(dateinit),new Date(dateend));chkformat=this.datetohandle.format("m/d/Y");ap=new Date(dateinit);if(ap.format("m/d/Y")==chkformat){checkdates=true;}ap=new Date(dateend);if(ap.format("m/d/Y")==chkformat){checkdates=true;}if(checkdates){R.push(i);}}for(var P=0;P<R.length;P++){i=R[P];if(this.calx.store.getAt(i).data[this.calx.fieldsRefer.color]){colortask=this.calx.store.getAt(i).data[this.calx.fieldsRefer.color];}else{colortask=this.taskBaseColor;}var Z=this.calx.store.getAt(i).data[this.calx.fieldsRefer.description];var aj=Z;if(Z.length>this.calx.tipmaxLength){aj=Z.substring(0,this.calx.tipmaxLength)+"...";}var O=this.calx.store.getAt(i).data[this.calx.fieldsRefer.isHoliday];if(O==undefined||O==""){O=0;}var ab=this.calx.store.getAt(i).data[this.calx.fieldsRefer.task_isallday];if(ab==undefined||ab==""){ab=0;}this.tasks[P]=new Ext.ECalendar.daytask({tasksOffset:this.tasksOffset,evenLaunch:this.task_eventLaunch,editable:this.task_DDeditable,parentview:this,baseBody:aa,datehandle:this.datetohandle,showQtip:this.task_showqtip,contextMenuLabels:e2cs.cal_locale.contextMenuLabelsDay,tplqTip:this.calx.tplTaskTip,task_index:i,task_id:this.calx.store.getAt(i).data[this.calx.fieldsRefer.id],task_subject:this.calx.store.getAt(i).data[this.calx.fieldsRefer.subject],task_starts:this.calx.store.getAt(i).data[this.calx.fieldsRefer.startdate],task_ends:this.calx.store.getAt(i).data[this.calx.fieldsRefer.enddate],task_description:aj,customHtml:this.calx.store.getAt(i).data[this.calx.fieldsRefer.html],customHTMLinpos:this.customHTMLinpos,task_clsOver:this.task_clsOver,task_increment:this.task_increment,task_width:this.task_width,task_format:this.task_format,bgcolor:colortask,moreMenuItems:this.moreMenuItems,ShowMenuItems:this.task_ShowMenuItems,forceTaskFit:this.forceTaskFit,totalTasksonView:R.length,task_useBxStyle:this.task_useBorderStyle,task_useBxcolor:this.task_useBordercolor,task_location:this.calx.store.getAt(i).data[this.calx.fieldsRefer.location],task_isholiday:O,task_isallday:ab});this.tasks[P].init(this.calx,this);this.tasks[P].render();}if(Ext.get("daylayoutbody").getWidth(true)<Ext.get(this.calx.id+"-tableallday").getWidth(true)){Ext.get("daylayoutbody").setWidth(Ext.get(this.calx.id+"-tableallday").getWidth(true)+1,false);}if(this.tasks.length<=0){aa.update("&nbsp;");}}else{aa.update("&nbsp;");}W.dom.scrollTop=0;if(this.scrolltoHour){var U=0;if(Ext.isIE){var M=Ext.select("td.hour-marker_ie",true);}else{var M=Ext.select("td.hour-marker",true);}M.each(function(b,d,c){if(b.id.indexOf(al.id+"-tdbody-dayv-")+1>=1){var a=this.datetohandle.format("G:i");if(b.id.indexOf(a)+1>=1){U=Ext.get(b).getY();return false;}}},this);if(U>0){U=U-W.getY();W.dom.scrollTop=U;}}},operadaybuttons:function(d,f,e){if(Ext.isOpera){if(d.button==2){this.oncontextmenuBody(d,f,e);}}else{return false;}},oncontextmenuBody:function(e,g,f){if(Ext.isOpera){if(e.button!=2){return false;}}if(this.ShowMenuItems[0]!=true&&this.ShowMenuItems[1]!=true&&this.ShowMenuItems[2]!=true&&this.ShowMenuItems[3]!=true&&this.ShowMenuItems[4]!=true&&this.ShowMenuItems[5]!=true){return false;}e.stopEvent();if(g.id.indexOf(this.calx.id+"-daybody")<0){return false;}var h=Ext.get(g.id);if(this.menu){this.menu.removeAll();}this.menu=new Ext.menu.Menu({id:this.calx.id+"-contextmenu-day",shadow:true,items:[{id:this.calx.id+"-day_ctxbtn_task-add",iconCls:"x-calendar-day-btnmv_add",text:e2cs.cal_locale.contextMenuLabelsDay.taskAdd,scope:this},"-",{id:this.calx.id+"-day_ctxbtn_task-go-nd",iconCls:"x-calendar-day-btnmv_nextday",text:e2cs.cal_locale.contextMenuLabelsDay.NextDay,scope:this},{id:this.calx.id+"-day_ctxbtn_task-go-pd",iconCls:"x-calendar-day-btnmv_prevday",text:e2cs.cal_locale.contextMenuLabelsDay.PreviousDay,scope:this},"-",{id:this.calx.id+"-day_ctxbtn_viewmonth",iconCls:"x-calendar-month-btnmv_viewmonth",text:e2cs.cal_locale.contextMenuLabelsDay.chgmview,scope:this},{id:this.calx.id+"-day_ctxbtn_viewweek",iconCls:"x-calendar-month-btnmv_viewweek",text:e2cs.cal_locale.contextMenuLabelsDay.chgwview,scope:this},{id:this.calx.id+"-day_ctxbtn_viewsched",iconCls:"x-calendar-month-btnmv_viewsched",text:e2cs.cal_locale.contextMenuLabelsDay.chgsview,scope:this}]});this.menu.items.items[0].addListener("click",function(){var b=this.calx.currentdate;var c=this.calx;var d=Ext.get(this.calx.id+"-calendar-view-day").getY();if(Ext.isIE){var a=Ext.select("td.hour-marker_ie",true);}else{var a=Ext.select("td.hour-marker",true);}a.each(function(p,t,r){if(p.id.indexOf(c.id+"-tdbody-dayv-")+1>=1){var v=Ext.get(p).getY();var s=Ext.get(p).getHeight();var u=e.getPageY();if(u>=v&&u<=(v+s)){if(p.id.indexOf(c.id+"-tdbody-dayv-")<0){var q=Ext.get(p).parent().id.replace(c.id+"-tdbody-dayv-","");}else{var q=p.id.replace(c.id+"-tdbody-dayv-","");}b=new Date(q);return false;}else{return true;}}},this);this.calx.fireEvent("taskAdd",b);},this);this.menu.items.items[2].addListener("click",function(){this.onclicknext_day();},this);this.menu.items.items[3].addListener("click",function(){this.onclickprev_day();},this);this.menu.items.items[5].addListener("click",function(){this.changeCalview(Ext.get(g),this,1);},this);this.menu.items.items[6].addListener("click",function(){this.changeCalview(Ext.get(g),this,2);},this);this.menu.items.items[7].addListener("click",function(){this.changeCalview(Ext.get(g),this,3);},this);if(this.ShowMenuItems[0]!=true){this.menu.items.items[0].hidden=true;this.menu.items.items[1].hidden=true;}if(this.ShowMenuItems[1]!=true&&this.ShowMenuItems[2]!=true&&this.ShowMenuItems[3]!=true&&this.ShowMenuItems[4]!=true&&this.ShowMenuItems[1]!=true){this.menu.items.items[1].hidden=true;}if(this.ShowMenuItems[1]!=true){this.menu.items.items[2].hidden=true;}if(this.ShowMenuItems[2]!=true){this.menu.items.items[3].hidden=true;}if(this.ShowMenuItems[1]!=true&&this.ShowMenuItems[2]!=true){this.menu.items.items[4].hidden=true;}if(this.ShowMenuItems[3]!=true){this.menu.items.items[5].hidden=true;}if(this.ShowMenuItems[4]!=true){this.menu.items.items[6].hidden=true;}if(this.ShowMenuItems[5]!=true){this.menu.items.items[7].hidden=true;}if(!this.calx.mview){this.menu.items.items[5].hidden=true;}if(!this.calx.wview){this.menu.items.items[6].hidden=true;}if(!this.calx.sview){this.menu.items.items[7].hidden=true;}this.menu.showAt([e.getPageX(),e.getPageY()]);},changeCalview:function(h,g,e){if(h.dom.className=="noday"||h.dom.className=="today"||h.dom.className=="monthday"){var f=new Date(h.id);}else{if(h.dom.className=="tasks"){var f=new Date(h.dom.parentNode.firstChild.id);}else{var f=new Date(h.dom.firstChild.id);}}if(e==1){varview="month";}else{if(e==2){varview="week";}else{varview="schedule";}}this.calx.changeView(varview);},onclickprev_day:function(i,h,j){var f=this.datetohandle.add(Date.DAY,-1);var g=this.fireEvent("beforeDayChange",this.datetohandle,f);if(g){this.calx.currentdate=f;this.datetohandle=f;this.render();this.fireEvent("afterDayChange",f);}},onclicknext_day:function(i,h,j){var f=this.datetohandle.add(Date.DAY,1);var g=this.fireEvent("beforeDayChange",this.datetohandle,f);if(g){this.calx.currentdate=f;this.datetohandle=f;this.render();this.fireEvent("afterDayChange",f);}},genHeader:function(f){var d=new Date(f);Date.monthNames=e2cs.cal_locale.monthtitles;Date.dayNames=e2cs.cal_locale.daytitles;var e='<div class="x-calendar-dayv-header" style="width:'+(this.calx.width-10)+'px;">';e+='<div id="header">'+d.format(this.headerFormat)+"</div>";if(this.headerButtons){e+='<div class="x-calendar-day-previous"></div>';e+='<div class="x-calendar-day-next"></div>';}e+="</div>";return e;},genBody:function(i){var t=new Date(i);var p=new Date(t.format("m/d/Y")+" "+this.startTime);var s=new Date(t.format("m/d/Y")+" "+this.endTime);this.diffhrs=this.calx.dateDiff(p,s,e2cs.dateParts.HOUR);var q="";if(Ext.isIE||Ext.isIE6){q="97.8";}else{q="100";}q="100";var r='<div id="daylayoutbody" class="x-calendar-dayv-body">';r+='<table id="'+this.calx.id+'-tableallday" width="'+q+'%" border="0" cellspacing="1" cellpadding="0"><tr><td valign="top" width="50">';r+='<table width="50" border="0" align="center" cellpadding="0" cellspacing="0">';for(var m=0;m<this.diffhrs;m++){tmpdatetohandleontd=t.format("m/d/Y");tmpdatetohandleontd+=" "+p.add(Date.HOUR,(m)).format("G");tmpdatetohandleontd+=":"+p.add(Date.HOUR,(m)).format("i");if(Ext.isIE){var n="hour-marker_ie";var o=' align="center" valign="middle" ';}else{var n="hour-marker";var o="";}r+="<tr><td "+o+' id="'+this.calx.id+"-tdbody-dayv-"+tmpdatetohandleontd+'" class="'+n+'">';r+="<span>"+p.add(Date.HOUR,(m)).format(this.hourFormat)+"</span></td></tr>";}var l="";if(Ext.isIE||Ext.isIE6||Ext.isIE7){l=' style="position:relative;" ';}r+='</table></td><td valign="top" id="tdbaseday"'+l+">";if(Ext.isIE||Ext.isIE6||Ext.isIE7){r+='<div id="'+this.calx.id+'-daybody" class="basegridday_ie6"'+l+">";}else{r+='<div id="'+this.calx.id+'-daybody" class="basegridday">';}r+="&nbsp;";r+="</div>";r+="</td></tr></table>";r+="</div>";return r;}});