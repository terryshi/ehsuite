Ext.namespace("Ext.ux.form");function setTimeoutEx(h,f){if(typeof h=="function"){var e=Array.prototype.slice.call(arguments,2);var g=function(){h.apply(null,e);};return setTimeout(g,f);}return setTimeout(h,f);}Ext.ux.form.FCKeditor=function(b){if(b.id==null){b.id="__fckeditor_"+parseInt(1000*Math.random());}this.config=b;this.fckconfig=b;Ext.ux.form.FCKeditor.superclass.constructor.call(this,b);this.instanceLoaded=false;this.instanceValue=b.value?b.value:"";this.editorInstance=undefined;};Ext.extend(Ext.ux.form.FCKeditor,Ext.form.TextArea,{initEvents:function(){this.on("destroy",function(){if(typeof this.editorInstance!="undefined"){delete this.editorInstance;}});},onRender:function(c,d){if(!this.el){this.defaultAutoCreate={tag:"textarea",style:"width:300px;height:660px;",autocomplete:"off"};}Ext.form.TextArea.superclass.onRender.call(this,c,d);this.hideMode="visibility";this.hidden=true;if(this.grow){this.textSizeEl=Ext.DomHelper.append(document.body,{tag:"pre",cls:"x-form-grow-sizer"});if(this.preventScrollbars){this.el.setStyle("overflow","hidden");}this.el.setHeight(this.growMin);}setTimeoutEx(loadFCKeditor,100,this.config.id,this.fckconfig);},setIsLoaded:function(b){this.instanceLoaded=b;},getIsLoaded:function(){return this.instanceLoaded;},setValue:function(b){this.instanceValue=b;if(this.instanceLoaded){this.FCKeditorSetValue(b);}Ext.form.TextArea.superclass.setValue.apply(this,[b]);},getValue:function(){if(this.instanceLoaded){value=this.FCKeditorGetValue();Ext.form.TextArea.superclass.setValue.apply(this,[value]);return Ext.form.TextArea.superclass.getValue.call(this);}else{return this.instanceValue;}},getRawValue:function(){if(this.instanceLoaded){value=this.FCKeditorGetValue();Ext.form.TextArea.superclass.setRawValue.apply(this,[value]);return Ext.form.TextArea.superclass.getRawValue.call(this);}else{return this.instanceValue;}},FCKeditorSetValue:function(f){if(this.instanceLoaded==false){return;}var d=new Ext.util.TaskRunner();var e={run:function(){try{var a=this.editorInstance;if(a.EditorDocument.body){a.SetData(f);d.stop(e);}}catch(b){}},interval:100,scope:this};d.start(e);},FCKeditorGetValue:function(){var b="";if(this.instanceLoaded==false){return b;}b=this.editorInstance.GetData();return b;},isDirty:function(){return this.editorInstance.IsDirty();},resetIsDirty:function(){this.editorInstance.ResetIsDirty();}});Ext.reg("fckeditor",Ext.ux.form.FCKeditor);function loadFCKeditor(c,d){$ImportSimpleJs([__ctxPath+"/js/fckeditor/fckeditor.js"],function(){var b=new FCKeditor(c,d.width,d.height);for(var a in d){if(typeof b[a]!="undefined"){b[a]=d[a];}}b.BasePath=__ctxPath+"/js/fckeditor/";b.ToolbarSet="JDefault";b.ReplaceTextarea();});}function FCKeditor_OnComplete(d){var c=Ext.getCmp(d.Name);c.editorInstance=d;c.instanceLoaded=true;c.FCKeditorSetValue(c.instanceValue);d.Events.AttachEvent("OnBlur",FCKeditor_OnBlur);d.Events.AttachEvent("OnFocus",FCKeditor_OnFocus);d.ToolbarSet.Collapse();}function FCKeditor_OnBlur(b){b.ToolbarSet.Collapse();}function FCKeditor_OnFocus(b){b.ToolbarSet.Expand();}