var FCKStyles=FCK.Styles={_Callbacks:{},_ObjectStyles:{},ApplyStyle:function(b){if(typeof b=="string"){b=this.GetStyles()[b];}if(b){if(b.GetType()==FCK_STYLE_OBJECT){b.ApplyToObject(FCKSelection.GetSelectedElement());}else{b.ApplyToSelection(FCK.EditorWindow);}FCK.Events.FireEvent("OnSelectionChange");}},RemoveStyle:function(b){if(typeof b=="string"){b=this.GetStyles()[b];}if(b){b.RemoveFromSelection(FCK.EditorWindow);FCK.Events.FireEvent("OnSelectionChange");}},AttachStyleStateChange:function(f,g,h){var e=this._Callbacks[f];if(!e){e=this._Callbacks[f]=[];}e.push([g,h]);},CheckSelectionChanges:function(){var n=FCKSelection.GetBoundaryParentElement(true);if(!n){return;}var i=new FCKElementPath(n);var l=this.GetStyles();for(var q in l){var o=this._Callbacks[q];if(o){var s=l[q];var t=s.CheckActive(i);if(t!=(s._LastState||null)){s._LastState=t;for(var p=0;p<o.length;p++){var m=o[p][0];var r=o[p][1];m.call(r||window,q,t);}}}}},CheckStyleInSelection:function(b){return false;},_GetRemoveFormatTagsRegex:function(){var b=new RegExp("^(?:"+FCKConfig.RemoveFormatTags.replace(/,/g,"|")+")$","i");return(this._GetRemoveFormatTagsRegex=function(){return b;})&&b;},RemoveAll:function(){var p=new FCKDomRange(FCK.EditorWindow);p.MoveToSelection();if(p.CheckIsCollapsed()){return;}p.Expand("inline_elements");var m=p.CreateBookmark(true);var t=p.GetBookmarkNode(m,true);var o=p.GetBookmarkNode(m,false);p.Release(true);var n=this._GetRemoveFormatTagsRegex();var i=new FCKElementPath(t);var r=i.Elements;var u;for(var q=1;q<r.length;q++){u=r[q];if(u==i.Block||u==i.BlockLimit){break;}if(n.test(u.nodeName)){FCKDomTools.BreakParent(t,u,p);}}i=new FCKElementPath(o);r=i.Elements;for(var q=1;q<r.length;q++){u=r[q];if(u==i.Block||u==i.BlockLimit){break;}elementName=u.nodeName.toLowerCase();if(n.test(u.nodeName)){FCKDomTools.BreakParent(o,u,p);}}var v=FCKDomTools.GetNextSourceNode(t,true,1);while(v){if(v==o){break;}var s=FCKDomTools.GetNextSourceNode(v,false,1);if(n.test(v.nodeName)){FCKDomTools.RemoveNode(v,true);}else{FCKDomTools.RemoveAttributes(v,FCKConfig.RemoveAttributesArray);}v=s;}p.SelectBookmark(m);FCK.Events.FireEvent("OnSelectionChange");},GetStyle:function(b){return this.GetStyles()[b];},GetStyles:function(){var b=this._GetStyles;if(!b){b=this._GetStyles=FCKTools.Merge(this._LoadStylesCore(),this._LoadStylesCustom(),this._LoadStylesXml());}return b;},CheckHasObjectStyle:function(b){return !!this._ObjectStyles[b];},_LoadStylesCore:function(){var g={};var f=FCKConfig.CoreStyles;for(var e in f){var h=g["_FCK_"+e]=new FCKStyle(f[e]);h.IsCore=true;}return g;},_LoadStylesCustom:function(){var g={};var f=FCKConfig.CustomStyles;if(f){for(var e in f){var h=g[e]=new FCKStyle(f[e]);h.Name=e;}}return g;},_LoadStylesXml:function(){var E={};var I=FCKConfig.StylesXmlPath;if(!I||I.length==0){return E;}var J=new FCKXml();J.LoadUrl(I);var A=FCKXml.TransformToObject(J.SelectSingleNode("Styles"));var C=A.$Style;if(!C){return E;}for(var k=0;k<C.length;k++){var i=C[k];var M=(i.element||"").toLowerCase();if(M.length==0){throw ('The element name is required. Error loading "'+I+'"');}var G={Element:M,Attributes:{},Styles:{},Overrides:[]};var L=i.$Attribute||[];for(var x=0;x<L.length;x++){G.Attributes[L[x].name]=L[x].value;}var y=i.$Style||[];for(x=0;x<y.length;x++){G.Styles[y[x].name]=y[x].value;}var F=i.$Override;if(F){for(x=0;x<F.length;x++){var H=F[x];var B={Element:H.element};var N=H.$Attribute;if(N){B.Attributes={};for(var z=0;z<N.length;z++){var K=N[z].value||null;if(K){var D=K&&FCKRegexLib.RegExp.exec(K);if(D){K=new RegExp(D[1],D[2]||"");}}B.Attributes[N[z].name]=K;}}G.Overrides.push(B);}}var j=new FCKStyle(G);j.Name=i.name||M;if(j.GetType()==FCK_STYLE_OBJECT){this._ObjectStyles[M]=true;}E[j.Name]=j;}return E;}};