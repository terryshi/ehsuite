ArchivesDetailWin=Ext.extend(Ext.Window,{formPanel:null,constructor:function(b){Ext.applyIf(this,b);this.init();ArchivesDetailWin.superclass.constructor.call(this,{title:"公文详情",id:"ArchivesDetailWin",iconCls:"btn-archives-detail",maximizable:true,autoScroll:true,layout:"form",modal:true,height:480,width:770,border:false,defaults:{anchor:"98%,98%"},buttonAlign:"center",buttons:[{text:"关闭",iconCls:"btn-del",handler:this.closePanel,scope:this}],items:[this.detailPanel,this.flowdetailPanel,this.flowImagePanel]});},closePanel:function(){this.close();},init:function(){this.detailPanel=new Ext.Panel({border:false,autoScroll:true,autoLoad:{url:__ctxPath+"/pages/archive/archiveInfo.jsp?archivesId="+this.archivesId+"&rand="+Math.random()}});this.flowdetailPanel=new Ext.Panel({border:false,autoHeight:true,autoLoad:{url:__ctxPath+"/flow/processRunDetail.do?runId="+this.runId+"&rand="+Math.random(),nocache:true}});this.flowImagePanel=new Ext.Panel({layout:"column",border:false,bodyStyle:"padding:5px;",items:[new Ext.Panel({title:"流程示意图",width:"97%",html:'<img src="'+__ctxPath+"/jbpmImage?runId="+this.runId+"&rand="+Math.random()+'"/>'})]});}});