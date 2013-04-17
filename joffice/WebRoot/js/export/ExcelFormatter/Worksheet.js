Ext.ux.Exporter.ExcelFormatter.Worksheet=Ext.extend(Object,{constructor:function(d,c){c=c||{};this.store=d;Ext.applyIf(c,{hasTitle:true,hasHeadings:true,stripeRows:true,title:"Workbook",columns:d.fields==undefined?{}:d.fields.items});Ext.apply(this,c);Ext.ux.Exporter.ExcelFormatter.Worksheet.superclass.constructor.apply(this,arguments);},dateFormatString:"Y-m-d",worksheetTpl:new Ext.XTemplate('<ss:Worksheet ss:Name="{title}">',"<ss:Names>",'<ss:NamedRange ss:Name="Print_Titles" ss:RefersTo="=\'{title}\'!R1:R2" />',"</ss:Names>",'<ss:Table x:FullRows="1" x:FullColumns="1" ss:ExpandedColumnCount="{colCount}" ss:ExpandedRowCount="{rowCount}">',"{columns}",'<ss:Row ss:Height="38">','<ss:Cell ss:StyleID="title" ss:MergeAcross="{colCount - 1}">','<ss:Data xmlns:html="http://www.w3.org/TR/REC-html40" ss:Type="String">','<html:B><html:U><html:Font html:Size="15">{title}','</html:Font></html:U></html:B></ss:Data><ss:NamedCell ss:Name="Print_Titles" />',"</ss:Cell>","</ss:Row>",'<ss:Row ss:AutoFitHeight="1">',"{header}","</ss:Row>","{rows}","</ss:Table>","<x:WorksheetOptions>","<x:PageSetup>",'<x:Layout x:CenterHorizontal="1" x:Orientation="Landscape" />','<x:Footer x:Data="Page &amp;P of &amp;N" x:Margin="0.5" />','<x:PageMargins x:Top="0.5" x:Right="0.5" x:Left="0.5" x:Bottom="0.8" />',"</x:PageSetup>","<x:FitToPage />","<x:Print>","<x:PrintErrors>Blank</x:PrintErrors>","<x:FitWidth>1</x:FitWidth>","<x:FitHeight>32767</x:FitHeight>","<x:ValidPrinterInfo />","<x:VerticalResolution>600</x:VerticalResolution>","</x:Print>","<x:Selected />","<x:DoNotDisplayGridlines />","<x:ProtectObjects>False</x:ProtectObjects>","<x:ProtectScenarios>False</x:ProtectScenarios>","</x:WorksheetOptions>","</ss:Worksheet>"),render:function(b){return this.worksheetTpl.apply({header:this.buildHeader(),columns:this.buildColumns().join(""),rows:this.buildRows().join(""),colCount:this.columns.length,rowCount:this.store.getCount()+2,title:this.title});},buildColumns:function(){var b=[];Ext.each(this.columns,function(a){b.push(this.buildColumn());},this);return b;},buildColumn:function(b){return String.format('<ss:Column ss:AutoFitWidth="1" ss:Width="{0}" />',b||164);},buildRows:function(){var b=[];this.store.each(function(a,d){b.push(this.buildRow(a,d));},this);return b;},buildHeader:function(){var b=[];Ext.each(this.columns,function(a){var d;if(a.header!=undefined){d=a.header;}else{d=a.name.replace(/_/g," ");d=d.charAt(0).toUpperCase()+d.substr(1).toLowerCase();}b.push(String.format('<ss:Cell ss:StyleID="headercell"><ss:Data ss:Type="String">{0}</ss:Data><ss:NamedCell ss:Name="Print_Titles" /></ss:Cell>',d));},this);return b.join("");},buildRow:function(f,h){var g,e=[];if(this.stripeRows===true){g=h%2==0?"even":"odd";}Ext.each(this.columns,function(c){var d=c.name||c.dataIndex;if(Ext.isFunction(c.renderer)){var a=c.renderer(f.get(d),null,f),b="String";}else{var a=f.get(d),b=this.typeMappings[c.type||f.fields.item(d).type];}e.push(this.buildCell(a,b,g).render());},this);return String.format("<ss:Row>{0}</ss:Row>",e.join(""));},buildCell:function(f,d,e){if(d=="DateTime"&&Ext.isFunction(f.format)){f=f.format(this.dateFormatString);}return new Ext.ux.Exporter.ExcelFormatter.Cell({value:f,type:d,style:e});},typeMappings:{"int":"Number","string":"String","float":"Number","date":"DateTime"}});