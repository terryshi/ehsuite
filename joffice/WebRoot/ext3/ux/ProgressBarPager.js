Ext.ux.ProgressBarPager=Ext.extend(Object,{progBarWidth:225,defaultText:"Loading...",defaultAnimCfg:{duration:1,easing:"bounceOut"},constructor:function(b){if(b){Ext.apply(this,b);}},init:function(d){if(d.displayInfo){this.parent=d;var c=d.items.indexOf(d.displayItem);d.remove(d.displayItem,true);this.progressBar=new Ext.ProgressBar({text:this.defaultText,width:this.progBarWidth,animate:this.defaultAnimCfg});d.displayItem=this.progressBar;d.add(d.displayItem);d.doLayout();Ext.apply(d,this.parentOverrides);this.progressBar.on("render",function(a){a.mon(a.getEl().applyStyles("cursor:pointer"),"click",this.handleProgressBarClick,this);},this,{single:true});}},handleProgressBarClick:function(k){var o=this.parent,p=o.displayItem,n=this.progressBar.getBox(),l=k.getXY(),e=l[0]-n.x,j=Math.ceil(o.store.getTotalCount()/o.pageSize),m=Math.ceil(e/(p.width/j));o.changePage(m);},parentOverrides:{updateInfo:function(){if(this.displayItem){var f=this.store.getCount(),g=this.getPageData(),i=this.readPage(g),h=f==0?this.emptyMsg:String.format(this.displayMsg,this.cursor+1,this.cursor+f,this.store.getTotalCount());i=g.activePage;var j=i/g.pages;this.displayItem.updateProgress(j,h,this.animate||this.defaultAnimConfig);}}}});Ext.preg("progressbarpager",Ext.ux.ProgressBarPager);