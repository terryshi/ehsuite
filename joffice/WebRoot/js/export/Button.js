Ext.ux.Exporter.Button=Ext.extend(Ext.Button,{constructor:function(c){c=c||{};Ext.applyIf(c,{exportFunction:"exportGrid",disabled:true,text:"Download",cls:"download"});if(c.store==undefined&&c.component!=undefined){Ext.applyIf(c,{store:c.component.store});}else{Ext.applyIf(c,{component:{store:c.store}});}Ext.ux.Exporter.Button.superclass.constructor.call(this,c);if(this.store&&Ext.isFunction(this.store.on)){var d=function(){this.getEl().child("a",true).href="data:application/vnd.ms-excel;base64,"+Ext.ux.Exporter[c.exportFunction](this.component,null,c);this.enable();};if(this.el){d.call(this);}else{this.on("render",d,this);}this.store.on("load",d,this);}},template:new Ext.Template('<table border="0" cellpadding="0" cellspacing="0" class="x-btn-wrap"><tbody><tr>','<td class="x-btn-left"><i> </i></td><td class="x-btn-center"><a class="x-btn-text" href="{1}" target="{2}">{0}</a></td><td class="x-btn-right"><i> </i></td>',"</tr></tbody></table>"),onRender:function(j,g){var f,h=[this.text||" ",this.href,this.target||"_self"];if(g){f=this.template.insertBefore(g,h,true);}else{f=this.template.append(j,h,true);}var i=f.child("a:first");i.on("focus",this.onFocus,this);i.on("blur",this.onBlur,this);this.initButtonEl(f,i);Ext.ButtonToggleMgr.register(this);},onClick:function(b){if(b.button!=0){return;}if(!this.disabled){this.fireEvent("click",this,b);if(this.handler){this.handler.call(this.scope||this,this,b);}}}});Ext.reg("exportbutton",Ext.ux.Exporter.Button);