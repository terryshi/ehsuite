Ext.ns("Ext.ux.grid");Ext.ux.grid.TableGrid=function(h,w){w=w||{};Ext.apply(this,w);var z=w.fields||[],B=w.columns||[];h=Ext.get(h);var t=h.insertSibling();var s=[],r=[];var x=h.query("thead th");for(var v=0,u;u=x[v];v++){var i=u.innerHTML;var A="tcol-"+v;s.push(Ext.applyIf(z[v]||{},{name:A,mapping:"td:nth("+(v+1)+")/@innerHTML"}));r.push(Ext.applyIf(B[v]||{},{"header":i,"dataIndex":A,"width":u.offsetWidth,"tooltip":u.title,"sortable":true}));}var y=new Ext.data.Store({reader:new Ext.data.XmlReader({record:"tbody tr"},s)});y.loadData(h.dom);var q=new Ext.grid.ColumnModel(r);if(w.width||w.height){t.setSize(w.width||"auto",w.height||"auto");}else{t.setWidth(h.getWidth());}if(w.remove!==false){h.remove();}Ext.applyIf(this,{"ds":y,"cm":q,"sm":new Ext.grid.RowSelectionModel(),autoHeight:true,autoWidth:false});Ext.ux.grid.TableGrid.superclass.constructor.call(this,t,{});};Ext.extend(Ext.ux.grid.TableGrid,Ext.grid.GridPanel);Ext.grid.TableGrid=Ext.ux.grid.TableGrid;