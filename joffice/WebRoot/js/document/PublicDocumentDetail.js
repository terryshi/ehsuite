PublicDocumentDetail=Ext.extend(Ext.Panel,{panel:null,constructor:function(b){Ext.applyIf(this,b);this.initUI();PublicDocumentDetail.superclass.constructor.call(this,{id:"PulicDocumentDetail",iconCls:"menu-find-doc",title:""+this.docName+"-详细信息",autoHeight:true,modal:true,autoScroll:true,layout:"anchor",plain:true,items:this.panel});},initUI:function(){var b=new Ext.Toolbar({id:"PublicDocumentTopBar",height:35,bodyStyle:"text-align:center",items:[]});this.panel=new Ext.Panel({id:"PublicDocumentDetailPanel",modal:true,tbar:b,autoScroll:true,bodyStyle:"padding-left:10%;padding-right:10%;",height:450,autoLoad:{url:__ctxPath+"/document/publicDetailDocument.do?docId="+this.docId}});}});