var TreeSelector=function(l,m,k,n,p){var o={id:l,store:new Ext.data.SimpleStore({fields:[],data:[[]]}),editable:false,mode:"local",fieldLabel:k,allowBlank:p==false?false:true,triggerAction:"all",maxHeight:200,selectOnFocus:false,tpl:"<tpl for='.'><div style='height:200px;'><div id='"+l+"tree'></div></div></tpl>",selectedClass:""};var i=new Ext.form.ComboBox(o);var j=new Ext.tree.TreePanel({id:l+"Tree",height:200,autoScroll:true,split:true,loader:new Ext.tree.TreeLoader({url:m}),root:new Ext.tree.AsyncTreeNode({expanded:true}),rootVisible:false});j.on("collapsenode",function(a){i.expand();});j.on("expandnode",function(a){i.expand();});j.on("click",function(a){j.clickNodes=true;var b=Ext.getCmp(n);if(a.id!=null&&a.id!=""){i.setValue(a.text);i.id=a.id;i.collapse();if(b!=null){b.setValue(a.id);}}});i.on("expand",function(){j.render(l+"tree");});return i;};