Ext.namespace("Ext.ux.grid.filter");Ext.ux.grid.filter.Filter=Ext.extend(Ext.util.Observable,{active:false,dataIndex:null,menu:null,updateBuffer:500,constructor:function(b){Ext.apply(this,b);this.addEvents("activate","deactivate","serialize","update");Ext.ux.grid.filter.Filter.superclass.constructor.call(this);this.menu=new Ext.menu.Menu();this.init(b);if(b&&b.value){this.setValue(b.value);this.setActive(b.active!==false,true);delete b.value;}},destroy:function(){if(this.menu){this.menu.destroy();}this.purgeListeners();},init:Ext.emptyFn,getValue:Ext.emptyFn,setValue:Ext.emptyFn,isActivatable:function(){return true;},getSerialArgs:Ext.emptyFn,validateRecord:function(){return true;},serialize:function(){var b=this.getSerialArgs();this.fireEvent("serialize",b,this);return b;},fireUpdate:function(){if(this.active){this.fireEvent("update",this);}this.setActive(this.isActivatable());},setActive:function(c,d){if(this.active!=c){this.active=c;if(d!==true){this.fireEvent(c?"activate":"deactivate",this);}}}});