Ext.namespace("Ext.ux.grid");Ext.ux.grid.GridFilters=Ext.extend(Ext.util.Observable,{autoReload:true,filterCls:"ux-filtered-column",local:false,menuFilterText:"Filters",paramPrefix:"filter",showMenu:true,stateId:undefined,updateBuffer:500,constructor:function(b){b=b||{};this.deferredUpdate=new Ext.util.DelayedTask(this.reload,this);this.filters=new Ext.util.MixedCollection();this.filters.getKey=function(a){return a?a.dataIndex:null;};this.addFilters(b.filters);delete b.filters;Ext.apply(this,b);},init:function(b){if(b instanceof Ext.grid.GridPanel){this.grid=b;this.bindStore(this.grid.getStore(),true);if(this.filters.getCount()==0){this.addFilters(this.grid.getColumnModel());}this.grid.filters=this;this.grid.addEvents({"filterupdate":true});b.on({scope:this,beforestaterestore:this.applyState,beforestatesave:this.saveState,beforedestroy:this.destroy,reconfigure:this.onReconfigure});if(b.rendered){this.onRender();}else{b.on({scope:this,single:true,render:this.onRender});}}else{if(b instanceof Ext.PagingToolbar){this.toolbar=b;}}},applyState:function(e,g){var f,h;this.applyingState=true;this.clearFilters();if(g.filters){for(f in g.filters){h=this.filters.get(f);if(h){h.setValue(g.filters[f]);h.setActive(true);}}}this.deferredUpdate.cancel();if(this.local){this.reload();}delete this.applyingState;},saveState:function(e,f){var d={};this.filters.each(function(a){if(a.active){d[a.dataIndex]=a.getValue();}});return(f.filters=d);},onRender:function(){this.grid.getView().on("refresh",this.onRefresh,this);this.createMenu();},destroy:function(){this.removeAll();this.purgeListeners();if(this.filterMenu){Ext.menu.MenuMgr.unregister(this.filterMenu);this.filterMenu.destroy();this.filterMenu=this.menu.menu=null;}},removeAll:function(){if(this.filters){Ext.destroy.apply(Ext,this.filters.items);this.filters.clear();}},bindStore:function(d,c){if(!c&&this.store){if(this.local){d.un("load",this.onLoad,this);}else{d.un("beforeload",this.onBeforeLoad,this);}}if(d){if(this.local){d.on("load",this.onLoad,this);}else{d.on("beforeload",this.onBeforeLoad,this);}}this.store=d;},onReconfigure:function(){this.bindStore(this.grid.getStore());this.store.clearFilter();this.removeAll();this.addFilters(this.grid.getColumnModel());this.updateColumnHeadings();},createMenu:function(){var d=this.grid.getView(),c=d.hmenu;if(this.showMenu&&c){this.sep=c.addSeparator();this.filterMenu=new Ext.menu.Menu({id:this.grid.id+"-filters-menu"});this.menu=c.add({checked:false,itemId:"filters",text:this.menuFilterText,menu:this.filterMenu});this.menu.on({scope:this,checkchange:this.onCheckChange,beforecheckchange:this.onBeforeCheck});c.on("beforeshow",this.onMenu,this);}this.updateColumnHeadings();},getMenuFilter:function(){var b=this.grid.getView();if(!b||b.hdCtxIndex===undefined){return null;}return this.filters.get(b.cm.config[b.hdCtxIndex].dataIndex);},onMenu:function(c){var d=this.getMenuFilter();if(d){this.menu.menu=d.menu;this.menu.setChecked(d.active,false);this.menu.setDisabled(d.disabled===true);}this.menu.setVisible(d!==undefined);this.sep.setVisible(d!==undefined);},onCheckChange:function(d,c){this.getMenuFilter().setActive(c);},onBeforeCheck:function(d,c){return !c||this.getMenuFilter().isActivatable();},onStateChange:function(c,d){if(c==="serialize"){return;}if(d==this.getMenuFilter()){this.menu.setChecked(d.active,false);}if((this.autoReload||this.local)&&!this.applyingState){this.deferredUpdate.delay(this.updateBuffer);}this.updateColumnHeadings();if(!this.applyingState){this.grid.saveState();}this.grid.fireEvent("filterupdate",this,d);},onBeforeLoad:function(e,d){d.params=d.params||{};this.cleanParams(d.params);var f=this.buildQuery(this.getFilterData());Ext.apply(d.params,f);},onLoad:function(d,c){d.filterBy(this.getRecordFilter());},onRefresh:function(){this.updateColumnHeadings();},updateColumnHeadings:function(){var e=this.grid.getView(),h,f,g;if(e.mainHd){for(h=0,f=e.cm.config.length;h<f;h++){g=this.getFilter(e.cm.config[h].dataIndex);Ext.fly(e.getHeaderCell(h))[g&&g.active?"addClass":"removeClass"](this.filterCls);}}},reload:function(){if(this.local){this.grid.store.clearFilter(true);this.grid.store.filterBy(this.getRecordFilter());}else{var c,d=this.grid.store;this.deferredUpdate.cancel();if(this.toolbar){c=d.paramNames.start;if(d.lastOptions&&d.lastOptions.params&&d.lastOptions.params[c]){d.lastOptions.params[c]=0;}}d.reload();}},getRecordFilter:function(){var f=[],e,d;this.filters.each(function(a){if(a.active){f.push(a);}});e=f.length;return function(a){for(d=0;d<e;d++){if(!f[d].validateRecord(a)){return false;}}return true;};},addFilter:function(e){var f=this.getFilterClass(e.type),d=e.menu?e:(new f(e));this.filters.add(d);Ext.util.Observable.capture(d,this.onStateChange,this);return d;},addFilters:function(i){if(i){var l,g,j,h=false,k;if(i instanceof Ext.grid.ColumnModel){i=i.config;h=true;}for(l=0,g=i.length;l<g;l++){j=false;if(h){k=i[l].dataIndex;j=i[l].filter||i[l].filterable;if(j){j=(j===true)?{}:j;Ext.apply(j,{dataIndex:k});j.type=j.type||this.store.fields.get(k).type;}}else{j=i[l];}if(j){this.addFilter(j);}}}},getFilter:function(b){return this.filters.get(b);},clearFilters:function(){this.filters.each(function(b){b.setActive(false);});},getFilterData:function(){var f=[],d,e;this.filters.each(function(b){if(b.active){var a=[].concat(b.serialize());for(d=0,e=a.length;d<e;d++){f.push({field:b.dataIndex,data:a[d]});}}});return f;},buildQuery:function(q){var r={},p,l,i,n,f,o,m=q.length;if(!this.encode){for(p=0;p<m;p++){l=q[p];i=[this.paramPrefix,"[",p,"]"].join("");r[i+"[field]"]=l.field;n=i+"[data]";for(f in l.data){r[[n,"[",f,"]"].join("")]=l.data[f];}}}else{o=[];for(p=0;p<m;p++){l=q[p];o.push(Ext.apply({},{field:l.field},l.data));}if(o.length>0){r[this.paramPrefix]=Ext.util.JSON.encode(o);}}return r;},cleanParams:function(f){if(this.encode){delete f[this.paramPrefix];}else{var d,e;d=new RegExp("^"+this.paramPrefix+"[[0-9]+]");for(e in f){if(d.test(e)){delete f[e];}}}},getFilterClass:function(b){switch(b){case"auto":b="string";break;case"int":case"float":b="numeric";break;}return Ext.ux.grid.filter[b.substr(0,1).toUpperCase()+b.substr(1)+"Filter"];}});Ext.preg("gridfilters",Ext.ux.grid.GridFilters);