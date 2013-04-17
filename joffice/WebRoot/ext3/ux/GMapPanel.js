Ext.ux.GMapPanel=Ext.extend(Ext.Panel,{initComponent:function(){var b={plain:true,zoomLevel:3,yaw:180,pitch:0,zoom:0,gmapType:"map",border:false};Ext.applyIf(this,b);Ext.ux.GMapPanel.superclass.initComponent.call(this);},afterRender:function(){var c=this.ownerCt.getSize();Ext.applyIf(this,c);Ext.ux.GMapPanel.superclass.afterRender.call(this);if(this.gmapType==="map"){this.gmap=new GMap2(this.body.dom);}if(this.gmapType==="panorama"){this.gmap=new GStreetviewPanorama(this.body.dom);}if(typeof this.addControl=="object"&&this.gmapType==="map"){this.gmap.addControl(this.addControl);}if(typeof this.setCenter==="object"){if(typeof this.setCenter.geoCodeAddr==="string"){this.geoCodeLookup(this.setCenter.geoCodeAddr);}else{if(this.gmapType==="map"){var d=new GLatLng(this.setCenter.lat,this.setCenter.lng);this.gmap.setCenter(d,this.zoomLevel);}if(typeof this.setCenter.marker==="object"&&typeof d==="object"){this.addMarker(d,this.setCenter.marker,this.setCenter.marker.clear);}}if(this.gmapType==="panorama"){this.gmap.setLocationAndPOV(new GLatLng(this.setCenter.lat,this.setCenter.lng),{yaw:this.yaw,pitch:this.pitch,zoom:this.zoom});}}GEvent.bind(this.gmap,"load",this,function(){this.onMapReady();});},onMapReady:function(){this.addMarkers(this.markers);this.addMapControls();this.addOptions();},onResize:function(d,c){if(typeof this.getMap()=="object"){this.gmap.checkResize();}Ext.ux.GMapPanel.superclass.onResize.call(this,d,c);},setSize:function(f,e,d){if(typeof this.getMap()=="object"){this.gmap.checkResize();}Ext.ux.GMapPanel.superclass.setSize.call(this,f,e,d);},getMap:function(){return this.gmap;},getCenter:function(){return this.getMap().getCenter();},getCenterLatLng:function(){var b=this.getCenter();return{lat:b.lat(),lng:b.lng()};},addMarkers:function(f){if(Ext.isArray(f)){for(var d=0;d<f.length;d++){var e=new GLatLng(f[d].lat,f[d].lng);this.addMarker(e,f[d].marker,false,f[d].setCenter,f[d].listeners);}}},addMarker:function(m,l,g,h,k){Ext.applyIf(l,G_DEFAULT_ICON);if(g===true){this.getMap().clearOverlays();}if(h===true){this.getMap().setCenter(m,this.zoomLevel);}var j=new GMarker(m,l);if(typeof k==="object"){for(evt in k){GEvent.bind(j,evt,this,k[evt]);}}this.getMap().addOverlay(j);},addMapControls:function(){if(this.gmapType==="map"){if(Ext.isArray(this.mapControls)){for(i=0;i<this.mapControls.length;i++){this.addMapControl(this.mapControls[i]);}}else{if(typeof this.mapControls==="string"){this.addMapControl(this.mapControls);}else{if(typeof this.mapControls==="object"){this.getMap().addControl(this.mapControls);}}}}},addMapControl:function(c){var d=window[c];if(typeof d==="function"){this.getMap().addControl(new d());}},addOptions:function(){if(Ext.isArray(this.mapConfOpts)){var b;for(i=0;i<this.mapConfOpts.length;i++){this.addOption(this.mapConfOpts[i]);}}else{if(typeof this.mapConfOpts==="string"){this.addOption(this.mapConfOpts);}}},addOption:function(c){var d=this.getMap()[c];if(typeof d==="function"){this.getMap()[c]();}},geoCodeLookup:function(b){this.geocoder=new GClientGeocoder();this.geocoder.getLocations(b,this.addAddressToMap.createDelegate(this));},addAddressToMap:function(b){if(!b||b.Status.code!=200){Ext.MessageBox.alert("Error","Code "+b.Status.code+" Error Returned");}else{place=b.Placemark[0];addressinfo=place.AddressDetails;accuracy=addressinfo.Accuracy;if(accuracy===0){Ext.MessageBox.alert("Unable to Locate Address","Unable to Locate the Address you provided");}else{if(accuracy<7){Ext.MessageBox.alert("Address Accuracy","The address provided has a low accuracy.<br><br>Level "+accuracy+" Accuracy (8 = Exact Match, 1 = Vague Match)");}else{point=new GLatLng(place.Point.coordinates[1],place.Point.coordinates[0]);if(typeof this.setCenter.marker==="object"&&typeof point==="object"){this.addMarker(point,this.setCenter.marker,this.setCenter.marker.clear,true,this.setCenter.listeners);}}}}}});Ext.reg("gmappanel",Ext.ux.GMapPanel);