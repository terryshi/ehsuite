Ext.ns("Ext.ux.tree");Ext.ux.tree.XmlTreeLoader=Ext.extend(Ext.tree.TreeLoader,{XML_NODE_ELEMENT:1,XML_NODE_TEXT:3,processResponse:function(e,k,i){var l=e.responseXML;var h=l.documentElement||l;try{k.beginUpdate();k.appendChild(this.parseXml(h));k.endUpdate();if(typeof i=="function"){i(this,k);}}catch(j){this.handleFailure(e);}},parseXml:function(c){var d=[];Ext.each(c.childNodes,function(a){if(a.nodeType==this.XML_NODE_ELEMENT){var h=this.createNode(a);if(a.childNodes.length>0){var b=this.parseXml(a);if(typeof b=="string"){h.attributes.innerText=b;}else{h.appendChild(b);}}d.push(h);}else{if(a.nodeType==this.XML_NODE_TEXT){var g=a.nodeValue.trim();if(g.length>0){return d=g;}}}},this);return d;},createNode:function(c){var d={tagName:c.tagName};Ext.each(c.attributes,function(a){d[a.nodeName]=a.nodeValue;});this.processAttributes(d);return Ext.ux.tree.XmlTreeLoader.superclass.createNode.call(this,d);},processAttributes:Ext.emptyFn});Ext.ux.XmlTreeLoader=Ext.ux.tree.XmlTreeLoader;