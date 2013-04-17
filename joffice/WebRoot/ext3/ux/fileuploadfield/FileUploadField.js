Ext.ns("Ext.ux.form");Ext.ux.form.FileUploadField=Ext.extend(Ext.form.TextField,{buttonText:"Browse...",buttonOnly:false,buttonOffset:3,readOnly:true,autoSize:Ext.emptyFn,initComponent:function(){Ext.ux.form.FileUploadField.superclass.initComponent.call(this);this.addEvents("fileselected");},onRender:function(f,e){Ext.ux.form.FileUploadField.superclass.onRender.call(this,f,e);this.wrap=this.el.wrap({cls:"x-form-field-wrap x-form-file-wrap"});this.el.addClass("x-form-file-text");this.el.dom.removeAttribute("name");this.createFileInput();var d=Ext.applyIf(this.buttonCfg||{},{text:this.buttonText});this.button=new Ext.Button(Ext.apply(d,{renderTo:this.wrap,cls:"x-form-file-btn"+(d.iconCls?" x-btn-icon":"")}));if(this.buttonOnly){this.el.hide();this.wrap.setWidth(this.button.getEl().getWidth());}this.bindListeners();this.resizeEl=this.positionEl=this.wrap;},bindListeners:function(){this.fileInput.on({scope:this,mouseenter:function(){this.button.addClass(["x-btn-over","x-btn-focus"]);},mouseleave:function(){this.button.removeClass(["x-btn-over","x-btn-focus","x-btn-click"]);},mousedown:function(){this.button.addClass("x-btn-click");},mouseup:function(){this.button.removeClass(["x-btn-over","x-btn-focus","x-btn-click"]);},change:function(){var b=this.fileInput.dom.value;this.setValue(b);this.fireEvent("fileselected",this,b);}});},createFileInput:function(){this.fileInput=this.wrap.createChild({id:this.getFileInputId(),name:this.name||this.getId(),cls:"x-form-file",tag:"input",type:"file",size:1});},reset:function(){this.fileInput.remove();this.createFileInput();this.bindListeners();Ext.ux.form.FileUploadField.superclass.reset.call(this);},getFileInputId:function(){return this.id+"-file";},onResize:function(d,c){Ext.ux.form.FileUploadField.superclass.onResize.call(this,d,c);this.wrap.setWidth(d);if(!this.buttonOnly){var d=this.wrap.getWidth()-this.button.getEl().getWidth()-this.buttonOffset;this.el.setWidth(d);}},onDestroy:function(){Ext.ux.form.FileUploadField.superclass.onDestroy.call(this);Ext.destroy(this.fileInput,this.button,this.wrap);},onDisable:function(){Ext.ux.form.FileUploadField.superclass.onDisable.call(this);this.doDisable(true);},onEnable:function(){Ext.ux.form.FileUploadField.superclass.onEnable.call(this);this.doDisable(false);},doDisable:function(b){this.fileInput.dom.disabled=b;this.button.setDisabled(b);},preFocus:Ext.emptyFn,alignErrorIcon:function(){this.errorIcon.alignTo(this.wrap,"tl-tr",[2,0]);}});Ext.reg("fileuploadfield",Ext.ux.form.FileUploadField);Ext.form.FileUploadField=Ext.ux.form.FileUploadField;