Ext.ux.StatusBar=Ext.extend(Ext.Toolbar,{cls:"x-statusbar",busyIconCls:"x-status-busy",busyText:"Loading...",autoClear:5000,activeThreadId:0,initComponent:function(){if(this.statusAlign=="right"){this.cls+=" x-status-right";}Ext.ux.StatusBar.superclass.initComponent.call(this);},afterRender:function(){Ext.ux.StatusBar.superclass.afterRender.call(this);var b=this.statusAlign=="right";this.statusEl=new Ext.Toolbar.TextItem({cls:"x-status-text "+(this.iconCls||this.defaultIconCls||""),text:this.text||this.defaultText||""});if(b){this.add("->");this.add(this.statusEl);}else{this.insert(0,this.statusEl);this.insert(1,"->");}},setStatus:function(h){h=h||{};if(typeof h=="string"){h={text:h};}if(h.text!==undefined){this.setText(h.text);}if(h.iconCls!==undefined){this.setIcon(h.iconCls);}if(h.clear){var g=h.clear,c=this.autoClear,f={useDefaults:true,anim:true};if(typeof g=="object"){g=Ext.applyIf(g,f);if(g.wait){c=g.wait;}}else{if(typeof g=="number"){c=g;g=f;}else{if(typeof g=="boolean"){g=f;}}}g.threadId=this.activeThreadId;this.clearStatus.defer(c,this,[g]);}return this;},clearStatus:function(f){f=f||{};if(f.threadId&&f.threadId!==this.activeThreadId){return this;}var d=f.useDefaults?this.defaultText:"",e=f.useDefaults?(this.defaultIconCls?this.defaultIconCls:""):"";if(f.anim){this.statusEl.fadeOut({remove:false,useDisplay:true,scope:this,callback:function(){this.setStatus({text:d,iconCls:e});this.statusEl.show();}});}else{this.statusEl.hide();this.setStatus({text:d,iconCls:e});this.statusEl.show();}return this;},setText:function(b){this.activeThreadId++;this.text=b||"";if(this.rendered){this.statusEl.setText(this.text);}return this;},getText:function(){return this.text;},setIcon:function(b){this.activeThreadId++;b=b||"";if(this.rendered){if(this.currIconCls){this.statusEl.removeClass(this.currIconCls);this.currIconCls=null;}if(b.length>0){this.statusEl.addClass(b);this.currIconCls=b;}}else{this.currIconCls=b;}return this;},showBusy:function(b){if(typeof b=="string"){b={text:b};}b=Ext.applyIf(b||{},{text:this.busyText,iconCls:this.busyIconCls});return this.setStatus(b);}});Ext.reg("statusbar",Ext.ux.StatusBar);