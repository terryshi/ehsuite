Ext.ux.Spinner=Ext.extend(Ext.util.Observable,{incrementValue:1,alternateIncrementValue:5,triggerClass:"x-form-spinner-trigger",splitterClass:"x-form-spinner-splitter",alternateKey:Ext.EventObject.shiftKey,defaultValue:0,accelerate:false,constructor:function(b){Ext.ux.Spinner.superclass.constructor.call(this,b);Ext.apply(this,b);this.mimicing=false;},init:function(b){this.field=b;b.afterMethod("onRender",this.doRender,this);b.afterMethod("onEnable",this.doEnable,this);b.afterMethod("onDisable",this.doDisable,this);b.afterMethod("afterRender",this.doAfterRender,this);b.afterMethod("onResize",this.doResize,this);b.afterMethod("onFocus",this.doFocus,this);b.beforeMethod("onDestroy",this.doDestroy,this);},doRender:function(e,f){var h=this.el=this.field.getEl();var g=this.field;if(!g.wrap){g.wrap=this.wrap=h.wrap({cls:"x-form-field-wrap"});}else{this.wrap=g.wrap.addClass("x-form-field-wrap");}this.trigger=this.wrap.createChild({tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-form-trigger "+this.triggerClass});if(!g.width){this.wrap.setWidth(h.getWidth()+this.trigger.getWidth());}this.splitter=this.wrap.createChild({tag:"div",cls:this.splitterClass,style:"width:13px; height:2px;"});this.splitter.setRight((Ext.isIE)?1:2).setTop(10).show();this.proxy=this.trigger.createProxy("",this.splitter,true);this.proxy.addClass("x-form-spinner-proxy");this.proxy.setStyle("left","0px");this.proxy.setSize(14,1);this.proxy.hide();this.dd=new Ext.dd.DDProxy(this.splitter.dom.id,"SpinnerDrag",{dragElId:this.proxy.id});this.initTrigger();this.initSpinner();},doAfterRender:function(){var b;if(Ext.isIE&&this.el.getY()!=(b=this.trigger.getY())){this.el.position();this.el.setY(b);}},doEnable:function(){if(this.wrap){this.wrap.removeClass(this.field.disabledClass);}},doDisable:function(){if(this.wrap){this.wrap.addClass(this.field.disabledClass);this.el.removeClass(this.field.disabledClass);}},doResize:function(d,c){if(typeof d=="number"){this.el.setWidth(d-this.trigger.getWidth());}this.wrap.setWidth(this.el.getWidth()+this.trigger.getWidth());},doFocus:function(){if(!this.mimicing){this.wrap.addClass("x-trigger-wrap-focus");this.mimicing=true;Ext.get(Ext.isIE?document.body:document).on("mousedown",this.mimicBlur,this,{delay:10});this.el.on("keydown",this.checkTab,this);}},checkTab:function(b){if(b.getKey()==b.TAB){this.triggerBlur();}},mimicBlur:function(b){if(!this.wrap.contains(b.target)&&this.field.validateBlur(b)){this.triggerBlur();}},triggerBlur:function(){this.mimicing=false;Ext.get(Ext.isIE?document.body:document).un("mousedown",this.mimicBlur,this);this.el.un("keydown",this.checkTab,this);this.field.beforeBlur();this.wrap.removeClass("x-trigger-wrap-focus");this.field.onBlur.call(this.field);},initTrigger:function(){this.trigger.addClassOnOver("x-form-trigger-over");this.trigger.addClassOnClick("x-form-trigger-click");},initSpinner:function(){this.field.addEvents({"spin":true,"spinup":true,"spindown":true});this.keyNav=new Ext.KeyNav(this.el,{"up":function(b){b.preventDefault();this.onSpinUp();},"down":function(b){b.preventDefault();this.onSpinDown();},"pageUp":function(b){b.preventDefault();this.onSpinUpAlternate();},"pageDown":function(b){b.preventDefault();this.onSpinDownAlternate();},scope:this});this.repeater=new Ext.util.ClickRepeater(this.trigger,{accelerate:this.accelerate});this.field.mon(this.repeater,"click",this.onTriggerClick,this,{preventDefault:true});this.field.mon(this.trigger,{mouseover:this.onMouseOver,mouseout:this.onMouseOut,mousemove:this.onMouseMove,mousedown:this.onMouseDown,mouseup:this.onMouseUp,scope:this,preventDefault:true});this.field.mon(this.wrap,"mousewheel",this.handleMouseWheel,this);this.dd.setXConstraint(0,0,10);this.dd.setYConstraint(1500,1500,10);this.dd.endDrag=this.endDrag.createDelegate(this);this.dd.startDrag=this.startDrag.createDelegate(this);this.dd.onDrag=this.onDrag.createDelegate(this);},onMouseOver:function(){if(this.disabled){return;}var b=this.getMiddle();this.tmpHoverClass=(Ext.EventObject.getPageY()<b)?"x-form-spinner-overup":"x-form-spinner-overdown";this.trigger.addClass(this.tmpHoverClass);},onMouseOut:function(){this.trigger.removeClass(this.tmpHoverClass);},onMouseMove:function(){if(this.disabled){return;}var b=this.getMiddle();if(((Ext.EventObject.getPageY()>b)&&this.tmpHoverClass=="x-form-spinner-overup")||((Ext.EventObject.getPageY()<b)&&this.tmpHoverClass=="x-form-spinner-overdown")){}},onMouseDown:function(){if(this.disabled){return;}var b=this.getMiddle();this.tmpClickClass=(Ext.EventObject.getPageY()<b)?"x-form-spinner-clickup":"x-form-spinner-clickdown";this.trigger.addClass(this.tmpClickClass);},onMouseUp:function(){this.trigger.removeClass(this.tmpClickClass);},onTriggerClick:function(){if(this.disabled||this.el.dom.readOnly){return;}var c=this.getMiddle();var d=(Ext.EventObject.getPageY()<c)?"Up":"Down";this["onSpin"+d]();},getMiddle:function(){var d=this.trigger.getTop();var f=this.trigger.getHeight();var e=d+(f/2);return e;},isSpinnable:function(){if(this.disabled||this.el.dom.readOnly){Ext.EventObject.preventDefault();return false;}return true;},handleMouseWheel:function(d){if(this.wrap.hasClass("x-trigger-wrap-focus")==false){return;}var c=d.getWheelDelta();if(c>0){this.onSpinUp();d.stopEvent();}else{if(c<0){this.onSpinDown();d.stopEvent();}}},startDrag:function(){this.proxy.show();this._previousY=Ext.fly(this.dd.getDragEl()).getTop();},endDrag:function(){this.proxy.hide();},onDrag:function(){if(this.disabled){return;}var c=Ext.fly(this.dd.getDragEl()).getTop();var d="";if(this._previousY>c){d="Up";}if(this._previousY<c){d="Down";}if(d!=""){this["onSpin"+d]();}this._previousY=c;},onSpinUp:function(){if(this.isSpinnable()==false){return;}if(Ext.EventObject.shiftKey==true){this.onSpinUpAlternate();return;}else{this.spin(false,false);}this.field.fireEvent("spin",this);this.field.fireEvent("spinup",this);},onSpinDown:function(){if(this.isSpinnable()==false){return;}if(Ext.EventObject.shiftKey==true){this.onSpinDownAlternate();return;}else{this.spin(true,false);}this.field.fireEvent("spin",this);this.field.fireEvent("spindown",this);},onSpinUpAlternate:function(){if(this.isSpinnable()==false){return;}this.spin(false,true);this.field.fireEvent("spin",this);this.field.fireEvent("spinup",this);},onSpinDownAlternate:function(){if(this.isSpinnable()==false){return;}this.spin(true,true);this.field.fireEvent("spin",this);this.field.fireEvent("spindown",this);},spin:function(g,e){var f=parseFloat(this.field.getValue());var h=(e==true)?this.alternateIncrementValue:this.incrementValue;(g==true)?f-=h:f+=h;f=(isNaN(f))?this.defaultValue:f;f=this.fixBoundries(f);this.field.setRawValue(f);},fixBoundries:function(c){var d=c;if(this.field.minValue!=undefined&&d<this.field.minValue){d=this.field.minValue;}if(this.field.maxValue!=undefined&&d>this.field.maxValue){d=this.field.maxValue;}return this.fixPrecision(d);},fixPrecision:function(c){var d=isNaN(c);if(!this.field.allowDecimals||this.field.decimalPrecision==-1||d||!c){return d?"":c;}return parseFloat(parseFloat(c).toFixed(this.field.decimalPrecision));},doDestroy:function(){if(this.trigger){this.trigger.remove();}if(this.wrap){this.wrap.remove();delete this.field.wrap;}if(this.splitter){this.splitter.remove();}if(this.dd){this.dd.unreg();this.dd=null;}if(this.proxy){this.proxy.remove();}if(this.repeater){this.repeater.purgeListeners();}}});Ext.form.Spinner=Ext.ux.Spinner;