Ext.ux.GroupTab=Ext.extend(Ext.Container,{mainItem:0,expanded:true,deferredRender:true,activeTab:null,idDelimiter:"__",headerAsText:false,frame:false,hideBorders:true,initComponent:function(d){Ext.apply(this,d);this.frame=false;Ext.ux.GroupTab.superclass.initComponent.call(this);this.addEvents("activate","deactivate","changemainitem","beforetabchange","tabchange");this.setLayout(new Ext.layout.CardLayout({deferredRender:this.deferredRender}));if(!this.stack){this.stack=Ext.TabPanel.AccessStack();}this.initItems();this.on("beforerender",function(){this.groupEl=this.ownerCt.getGroupEl(this);},this);this.on("add",this.onAdd,this,{target:this});this.on("remove",this.onRemove,this,{target:this});if(this.mainItem!==undefined){var c=(typeof this.mainItem=="object")?this.mainItem:this.items.get(this.mainItem);delete this.mainItem;this.setMainItem(c);}},setActiveTab:function(f){f=this.getComponent(f);if(!f){return false;}if(!this.rendered){this.activeTab=f;return true;}if(this.activeTab!=f&&this.fireEvent("beforetabchange",this,f,this.activeTab)!==false){if(this.activeTab&&this.activeTab!=this.mainItem){var e=this.getTabEl(this.activeTab);if(e){Ext.fly(e).removeClass("x-grouptabs-strip-active");}}var d=this.getTabEl(f);Ext.fly(d).addClass("x-grouptabs-strip-active");this.activeTab=f;this.stack.add(f);this.layout.setActiveItem(f);if(this.layoutOnTabChange&&f.doLayout){f.doLayout();}if(this.scrolling){this.scrollToTab(f,this.animScroll);}this.fireEvent("tabchange",this,f);return true;}return false;},getTabEl:function(b){if(b==this.mainItem){return this.groupEl;}return Ext.TabPanel.prototype.getTabEl.call(this,b);},onRender:function(d,e){Ext.ux.GroupTab.superclass.onRender.call(this,d,e);this.strip=Ext.fly(this.groupEl).createChild({tag:"ul",cls:"x-grouptabs-sub"});this.tooltip=new Ext.ToolTip({target:this.groupEl,delegate:"a.x-grouptabs-text",trackMouse:true,renderTo:document.body,listeners:{beforeshow:function(a){var b=(a.triggerElement.parentNode===this.mainItem.tabEl)?this.mainItem:this.findById(a.triggerElement.parentNode.id.split(this.idDelimiter)[1]);if(!b.tabTip){return false;}a.body.dom.innerHTML=b.tabTip;},scope:this}});if(!this.itemTpl){var f=new Ext.Template('<li class="{cls}" id="{id}">','<a onclick="return false;" class="x-grouptabs-text {iconCls}">{text}</a>',"</li>");f.disableFormats=true;f.compile();Ext.ux.GroupTab.prototype.itemTpl=f;}this.items.each(this.initTab,this);},afterRender:function(){Ext.ux.GroupTab.superclass.afterRender.call(this);if(this.activeTab!==undefined){var b=(typeof this.activeTab=="object")?this.activeTab:this.items.get(this.activeTab);delete this.activeTab;this.setActiveTab(b);}},initTab:function(j,g){var i=this.strip.dom.childNodes[g];var h=Ext.TabPanel.prototype.getTemplateArgs.call(this,j);if(j===this.mainItem){j.tabEl=this.groupEl;h.cls+=" x-grouptabs-main-item";}var f=i?this.itemTpl.insertBefore(i,h):this.itemTpl.append(this.strip,h);j.tabEl=j.tabEl||f;j.on("disable",this.onItemDisabled,this);j.on("enable",this.onItemEnabled,this);j.on("titlechange",this.onItemTitleChanged,this);j.on("iconchange",this.onItemIconChanged,this);j.on("beforeshow",this.onBeforeShowItem,this);},setMainItem:function(b){b=this.getComponent(b);if(!b||this.fireEvent("changemainitem",this,b,this.mainItem)===false){return;}this.mainItem=b;},getMainItem:function(){return this.mainItem||null;},onBeforeShowItem:function(b){if(b!=this.activeTab){this.setActiveTab(b);return false;}},onAdd:function(e,f,d){if(this.rendered){this.initTab.call(this,f,d);}},onRemove:function(f,d){Ext.destroy(Ext.get(this.getTabEl(d)));this.stack.remove(d);d.un("disable",this.onItemDisabled,this);d.un("enable",this.onItemEnabled,this);d.un("titlechange",this.onItemTitleChanged,this);d.un("iconchange",this.onItemIconChanged,this);d.un("beforeshow",this.onBeforeShowItem,this);if(d==this.activeTab){var e=this.stack.next();if(e){this.setActiveTab(e);}else{if(this.items.getCount()>0){this.setActiveTab(0);}else{this.activeTab=null;}}}},onBeforeAdd:function(d){var e=d.events?(this.items.containsKey(d.getItemId())?d:null):this.items.get(d);if(e){this.setActiveTab(d);return false;}Ext.TabPanel.superclass.onBeforeAdd.apply(this,arguments);var f=d.elements;d.elements=f?f.replace(",header",""):f;d.border=(d.border===true);},onItemDisabled:Ext.TabPanel.prototype.onItemDisabled,onItemEnabled:Ext.TabPanel.prototype.onItemEnabled,onItemTitleChanged:function(c){var d=this.getTabEl(c);if(d){Ext.fly(d).child("a.x-grouptabs-text",true).innerHTML=c.title;}},onItemIconChanged:function(g,f,h){var e=this.getTabEl(g);if(e){Ext.fly(e).child("a.x-grouptabs-text").replaceClass(h,f);}},beforeDestroy:function(){Ext.TabPanel.prototype.beforeDestroy.call(this);this.tooltip.destroy();}});Ext.reg("grouptab",Ext.ux.GroupTab);