FCKXHtml._GetMainXmlString=function(){return this.MainNode.xml;};FCKXHtml._AppendAttributes=function(e,n,w,p){var r=n.attributes,x;for(var y=0;y<r.length;y++){var q=r[y];if(q.specified){var u=q.nodeName.toLowerCase();var z;if(u.StartsWith("_fck")){continue;}else{if(u=="style"){x=true;continue;}else{if(u=="class"){z=q.nodeValue.replace(FCKRegexLib.FCK_Class,"");if(z.length==0){continue;}}else{if(u.indexOf("on")==0){z=q.nodeValue;}else{if(p=="body"&&u=="contenteditable"){continue;}else{if(q.nodeValue===true){z=u;}else{try{z=n.getAttribute(u,2);}catch(s){}}}}}}}this._AppendAttribute(w,u,z||q.nodeValue);}}if(x||n.style.cssText.length>0){var v=FCKTools.ProtectFormStyles(n);var t=n.style.cssText.replace(FCKRegexLib.StyleProperties,FCKTools.ToLowerCase);FCKTools.RestoreFormStyles(n,v);this._AppendAttribute(w,"style",t);}};FCKXHtml._RemoveXHtmlJobProperties=function(e){if(!e||!e.nodeType||e.nodeType!=1){return;}if(typeof e._fckxhtmljob=="undefined"&&e.tagName!=="BODY"){return;}e.removeAttribute("_fckxhtmljob");if(e.hasChildNodes()){var h=e.childNodes;for(var f=h.length-1;f>=0;f--){var g=h[f];if(g.parentNode==e){FCKXHtml._RemoveXHtmlJobProperties(g);}}}};FCKXHtml.TagProcessors["div"]=function(d,c){if(c.align.length>0){FCKXHtml._AppendAttribute(d,"align",c.align);}d=FCKXHtml._AppendChildNodes(d,c,true);return d;};FCKXHtml.TagProcessors["font"]=function(d,c){if(d.attributes.length==0){d=FCKXHtml.XML.createDocumentFragment();}d=FCKXHtml._AppendChildNodes(d,c);return d;};FCKXHtml.TagProcessors["form"]=function(d,f){if(f.acceptCharset&&f.acceptCharset.length>0&&f.acceptCharset!="UNKNOWN"){FCKXHtml._AppendAttribute(d,"accept-charset",f.acceptCharset);}var e=f.attributes["name"];if(e&&e.value.length>0){FCKXHtml._AppendAttribute(d,"name",e.value);}d=FCKXHtml._AppendChildNodes(d,f,true);return d;};FCKXHtml.TagProcessors["input"]=function(d,c){if(c.name){FCKXHtml._AppendAttribute(d,"name",c.name);}if(c.value&&!d.attributes.getNamedItem("value")){FCKXHtml._AppendAttribute(d,"value",c.value);}if(!d.attributes.getNamedItem("type")){FCKXHtml._AppendAttribute(d,"type","text");}return d;};FCKXHtml.TagProcessors["label"]=function(d,c){if(c.htmlFor.length>0){FCKXHtml._AppendAttribute(d,"for",c.htmlFor);}d=FCKXHtml._AppendChildNodes(d,c);return d;};FCKXHtml.TagProcessors["map"]=function(d,f){if(!d.attributes.getNamedItem("name")){var e=f.name;if(e){FCKXHtml._AppendAttribute(d,"name",e);}}d=FCKXHtml._AppendChildNodes(d,f,true);return d;};FCKXHtml.TagProcessors["meta"]=function(h,g){var f=h.attributes.getNamedItem("http-equiv");if(f==null||f.value.length==0){var e=g.outerHTML.match(FCKRegexLib.MetaHttpEquiv);if(e){e=e[1];FCKXHtml._AppendAttribute(h,"http-equiv",e);}}return h;};FCKXHtml.TagProcessors["option"]=function(d,c){if(c.selected&&!d.attributes.getNamedItem("selected")){FCKXHtml._AppendAttribute(d,"selected","selected");}d=FCKXHtml._AppendChildNodes(d,c);return d;};FCKXHtml.TagProcessors["textarea"]=FCKXHtml.TagProcessors["select"]=function(d,c){if(c.name){FCKXHtml._AppendAttribute(d,"name",c.name);}d=FCKXHtml._AppendChildNodes(d,c);return d;};