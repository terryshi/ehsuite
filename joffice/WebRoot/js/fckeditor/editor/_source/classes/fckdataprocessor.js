var FCKDataProcessor=function(){};FCKDataProcessor.prototype={ConvertToHtml:function(c){if(FCKConfig.FullPage){FCK.DocTypeDeclaration=c.match(FCKRegexLib.DocTypeTag);if(!FCKRegexLib.HasBodyTag.test(c)){c="<body>"+c+"</body>";}if(!FCKRegexLib.HtmlOpener.test(c)){c='<html dir="'+FCKConfig.ContentLangDirection+'">'+c+"</html>";}if(!FCKRegexLib.HeadOpener.test(c)){c=c.replace(FCKRegexLib.HtmlOpener,"$&<head><title></title></head>");}return c;}else{var d=FCKConfig.DocType+'<html dir="'+FCKConfig.ContentLangDirection+'"';if(FCKBrowserInfo.IsIE&&FCKConfig.DocType.length>0&&!FCKRegexLib.Html4DocType.test(FCKConfig.DocType)){d+=' style="overflow-y: scroll"';}d+="><head><title></title></head>"+"<body"+FCKConfig.GetBodyAttributes()+">"+c+"</body></html>";return d;}},ConvertToDataFormat:function(f,i,g,h){var j=FCKXHtml.GetXHTML(f,!i,h);if(g&&FCKRegexLib.EmptyOutParagraph.test(j)){return"";}return j;},FixHtml:function(b){return b;}};