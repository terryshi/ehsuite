var oEditor=window.parent.InnerDialogLoaded();var FCK=oEditor.FCK;window.document.dir=oEditor.FCKLang.Dir;document.write('<link href="'+oEditor.FCKConfig.SkinPath+'fck_dialog.css" type="text/css" rel="stylesheet">');var sAgent=navigator.userAgent.toLowerCase();var is_ie=(sAgent.indexOf("msie")!=-1);var is_gecko=!is_ie;var oMedia=null;var is_new_flvplayer=true;function window_onload(){oEditor.FCKLanguageManager.TranslatePage(document);LoadSelection();GetE("tdBrowse").style.display=oEditor.FCKConfig.FlashBrowser?"":"none";window.parent.SetOkButton(true);}function getSelectedMovie(){var f=null;oMedia=new Media();f=FCK.Selection.GetParentElement();if(f.id!=null&&!f.id.match(/^player[0-9]*$/)){f=f.parentNode;}if(f.id!=null&&f.id.match(/^player[0-9]*$/)){for(var i=0;i<f.childNodes.length;i++){if(f.childNodes.item(i).nodeName=="DIV"){var g=f.childNodes.item(i).innerHTML.split(" ");for(var h=0;h<g.length;h++){var j=g[h].split("=");oMedia.setAttribute(j[0],j[1]);}is_new_flvplayer=false;}}}return oMedia;}function updatePlaylistOption(){if(GetE("selDispPlaylist").value=="right"||GetE("selDispPlaylist").value=="below"){GetE("chkPLThumbs").disabled=false;GetE("chkPLThumbs").checked=true;GetE("txtPLDim").disabled=false;GetE("txtPLDim").style.background="#ffffff";GetE("spanDimText").style.display="none";if(GetE("selDispPlaylist").value=="right"){GetE("spanDimWText").style.display="";GetE("spanDimHText").style.display="none";}else{if(GetE("selDispPlaylist").value=="below"){GetE("spanDimWText").style.display="none";GetE("spanDimHText").style.display="";}}}else{GetE("chkPLThumbs").disabled=true;GetE("chkPLThumbs").checked=false;GetE("txtPLDim").value="";GetE("txtPLDim").disabled=true;GetE("txtPLDim").style.background="transparent";GetE("spanDimText").style.display="";GetE("spanDimWText").style.display="none";GetE("spanDimHText").style.display="none";}}function LoadSelection(){oMedia=new Media();oMedia=getSelectedMovie();GetE("rbFileType").value=oMedia.fileType;GetE("txtUrl").value=oMedia.url;GetE("txtPlaylist").value=oMedia.purl;GetE("txtImgURL").value=oMedia.iurl;GetE("txtWMURL").value=oMedia.wmurl;GetE("txtWidth").value=oMedia.width;GetE("txtHeight").value=oMedia.height;GetE("chkLoop").checked=oMedia.loop;GetE("chkAutoplay").checked=oMedia.play;GetE("chkDownload").checked=oMedia.downloadable;GetE("chkFullscreen").checked=oMedia.fullscreen;GetE("txtBgColor").value=oMedia.bgcolor;GetE("txtToolbarColor").value=oMedia.toolcolor;GetE("txtToolbarTxtColor").value=oMedia.tooltcolor;GetE("txtToolbarTxtRColor").value=oMedia.tooltrcolor;GetE("chkShowNavigation").checked=oMedia.displayNavigation;GetE("chkShowDigits").checked=oMedia.displayDigits;GetE("selAlign").value=oMedia.align;GetE("selDispPlaylist").value=oMedia.dispPlaylist;GetE("txtRURL").value=oMedia.rurl;GetE("txtPLDim").value=oMedia.playlistDim;GetE("chkPLThumbs").checked=oMedia.playlistThumbs;}function Ok(){var d="single";if(GetE("rbFileType").checked==false){d="list";}if(d=="single"){if(GetE("txtUrl").value.length==0){GetE("txtUrl").focus();alert(oEditor.FCKLang.DlgFLVPlayerAlertUrl);return false;}}if(d=="list"){if(GetE("txtPlaylist").value.length==0){GetE("txtPlaylist").focus();alert(oEditor.FCKLang.DlgFLVPlayerAlertPlaylist);return false;}}if(GetE("txtWidth").value.length==0){GetE("txtWidth").focus();alert(oEditor.FCKLang.DlgFLVPlayerAlertWidth);return false;}if(GetE("txtHeight").value.length==0){GetE("txtHeight").focus();alert(oEditor.FCKLang.DlgFLVPlayerAlertHeight);return false;}var c=(oMedia||new Media());updateMovie(c);if(!is_new_flvplayer){oSel=FCK.Selection.GetParentElement();while(oSel!=null&&!oSel.id.match(/^player[0-9]*-parent$/)){oSel=oSel.parentNode;}if(oSel!=null){oSel.parentNode.removeChild(oSel);FCK.InsertHtml(c.getInnerHTML());}}else{FCK.InsertHtml(c.getInnerHTML());}return true;}function updateMovie(b){b.fileType=GetE("rbFileType").value;b.url=GetE("txtUrl").value;b.purl=GetE("txtPlaylist").value;b.iurl=GetE("txtImgURL").value;b.wmurl=GetE("txtWMURL").value;b.bgcolor=GetE("txtBgColor").value;b.toolcolor=GetE("txtToolbarColor").value;b.tooltcolor=GetE("txtToolbarTxtColor").value;b.tooltrcolor=GetE("txtToolbarTxtRColor").value;b.width=(isNaN(GetE("txtWidth").value))?0:parseInt(GetE("txtWidth").value);b.height=(isNaN(GetE("txtHeight").value))?0:parseInt(GetE("txtHeight").value);b.loop=(GetE("chkLoop").checked)?"true":"false";b.play=(GetE("chkAutoplay").checked)?"true":"false";b.downloadable=(GetE("chkDownload").checked)?"true":"false";b.fullscreen=(GetE("chkFullscreen").checked)?"true":"false";b.displayNavigation=(GetE("chkShowNavigation").checked)?"true":"false";b.displayDigits=(GetE("chkShowDigits").checked)?"true":"false";b.align=GetE("selAlign").value;b.dispPlaylist=GetE("selDispPlaylist").value;b.rurl=GetE("txtRURL").value;b.playlistDim=GetE("txtPLDim").value;b.playlistThumbs=(GetE("chkPLThumbs").checked)?"true":"false";}function BrowseServer(){OpenServerBrowser("flv",oEditor.FCKConfig.LinkBrowserURL,oEditor.FCKConfig.LinkBrowserWindowWidth,oEditor.FCKConfig.LinkBrowserWindowHeight);}function LnkBrowseServer(){OpenServerBrowser("link",oEditor.FCKConfig.LinkBrowserURL,oEditor.FCKConfig.LinkBrowserWindowWidth,oEditor.FCKConfig.LinkBrowserWindowHeight);}function Lnk2BrowseServer(){OpenServerBrowser("link2",oEditor.FCKConfig.LinkBrowserURL,oEditor.FCKConfig.LinkBrowserWindowWidth,oEditor.FCKConfig.LinkBrowserWindowHeight);}function img1BrowseServer(){OpenServerBrowser("img1",oEditor.FCKConfig.ImageBrowserURL,oEditor.FCKConfig.ImageBrowserWindowWidth,oEditor.FCKConfig.ImageBrowserWindowHeight);}function img2BrowseServer(){OpenServerBrowser("img2",oEditor.FCKConfig.ImageBrowserURL,oEditor.FCKConfig.ImageBrowserWindowWidth,oEditor.FCKConfig.ImageBrowserWindowHeight);}function OpenServerBrowser(g,e,h,f){sActualBrowser=g;OpenFileBrowser(e,h,f);}var sActualBrowser;function SetUrl(b){if(sActualBrowser=="flv"){document.getElementById("txtUrl").value=b;GetE("txtHeight").value=GetE("txtWidth").value="";}else{if(sActualBrowser=="link"){document.getElementById("txtPlaylist").value=b;}else{if(sActualBrowser=="link2"){document.getElementById("txtRURL").value=b;}else{if(sActualBrowser=="img1"){document.getElementById("txtImgURL").value=b;}else{if(sActualBrowser=="img2"){document.getElementById("txtWMURL").value=b;}}}}}}var Media=function(b){this.fileType="";this.url="";this.purl="";this.iurl="";this.wmurl="";this.width="";this.height="";this.loop="";this.play="";this.downloadable="";this.fullscreen=true;this.bgcolor="";this.toolcolor="";this.tooltcolor="";this.tooltrcolor="";this.displayNavigation=true;this.displayDigits=true;this.align="";this.dispPlaylist="";this.rurl="";this.playlistDim="";this.playlistThumbs="";if(b){this.setObjectElement(b);}};Media.prototype.setObjectElement=function(b){if(!b){return;}this.width=GetAttribute(b,"width",this.width);this.height=GetAttribute(b,"height",this.height);};Media.prototype.setAttribute=function(d,c){if(c=="true"){this[d]=true;}else{if(c=="false"){this[d]=false;}else{this[d]=c;}}};Media.prototype.getInnerHTML=function(w){var x=Math.floor(Math.random()*1000001);var y=this.width;var E=this.height;var C="single";if(GetE("rbFileType").checked==false){C="mpl";}var z="";var D="";if(this.align=="center"){z="margin-left: auto;margin-right: auto;";}else{if(this.align=="right"){D="float: right;";}else{if(this.align=="left"){D="float: left;";}}}var i="";i+='<div id="player'+x+'-parent" style="text-align: center;'+D+'">\n';i+='<div style="border-style: none; height: '+E+"px; width: "+y+"px; overflow: hidden; background-color: rgb(220, 220, 220); background-image: url("+oEditor.FCKConfig.PluginsPath+"flvPlayer/flvPlayer.gif); background-repeat:no-repeat; background-position:center;"+z+'">';i+='<script src="'+oEditor.FCKConfig.PluginsPath+'flvPlayer/swfobject.js" type="text/javascript"><\/script>\n';i+='<div id="player'+x+'">';i+='<a href="http://www.macromedia.com/go/getflashplayer">Get the Flash Player</a> to see this player.';i+='<div id="player'+x+'-config" style="display: none;visibility: hidden;width: 0px;height:0px;overflow: hidden;">';for(var B in this){if(!B||!this[B]){continue;}if(!B.match(/(set|get)/)){i+=B+"="+this[B]+" ";}}i+="</div>";i+="</div>";i+='<script type="text/javascript">\n';i+='	var s1 = new SWFObject("'+oEditor.FCKConfig.PluginsPath+'flvPlayer/mediaplayer.swf","'+C+'","'+y+'","'+E+'","7");\n';i+='	s1.addVariable("width","'+y+'");\n';i+='	s1.addVariable("height","'+E+'");\n';i+='	s1.addVariable("autostart","'+this.play+'");\n';if(C=="mpl"){i+='	s1.addVariable("file","'+this.purl+'");\n';i+='	s1.addVariable("autoscroll","true");\n';i+='	s1.addParam("allowscriptaccess","always");\n';var F=y;var v=E;var A=false;if(this.dispPlaylist!="none"){if(this.dispPlaylist=="right"){if(this.playlistDim.length>0){F=y-this.playlistDim;if(this.playlistDim<100){A=false;}else{A=true;}}else{if(y>=550){F=y-200;A=true;}else{if(y>=450){F=y-100;A=false;}else{if(y>=350){F=y-50;A=false;}}}}i+='	s1.addVariable("displaywidth","'+F+'");\n';}else{if(this.dispPlaylist=="below"){A=true;if(this.playlistDim.length>0){v=y-this.playlistDim;}else{if(E>=550){v=y-200;}else{if(E>=450){v=E-150;}else{if(E>=350){v=E-100;}}}}i+='	s1.addVariable("displayheight","'+v+'");\n';}}if(this.playlistThumbs=="false"){A=false;}i+='	s1.addVariable("thumbsinplaylist","'+A+'");\n';}i+='	s1.addVariable("shuffle","false");\n';if(this.loop==true){i+='	s1.addVariable("repeat","list");\n';}else{i+='	s1.addVariable("repeat","'+this.loop+'");\n';}i+='	//s1.addVariable("transition","bgfade");\n';}else{i+='	s1.addVariable("file","'+this.url+'");\n';i+='	s1.addVariable("repeat","'+this.loop+'");\n';i+='	s1.addVariable("image","'+this.iurl+'");\n';}i+='	s1.addVariable("showdownload","'+this.downloadable+'");\n';i+='	s1.addVariable("link","'+this.url+'");\n';i+='	s1.addParam("allowfullscreen","'+this.fullscreen+'");\n';i+='	s1.addVariable("showdigits","'+this.displayDigits+'");\n';i+='	s1.addVariable("shownavigation","'+this.displayNavigation+'");\n';var r=this.toolcolor;if(r.length>0){r=r.replace("#","0x");i+='	s1.addVariable("backcolor","'+r+'");\n';}var s=this.tooltcolor;if(s.length>0){s=s.replace("#","0x");i+='	s1.addVariable("frontcolor","'+s+'");\n';}var t=this.tooltrcolor;if(t.length>0){t=t.replace("#","0x");i+='	s1.addVariable("lightcolor","'+t+'");\n';}var u=this.bgcolor;if(u.length>0){u=u.replace("#","0x");i+='	s1.addVariable("screencolor","'+u+'");\n';}i+='	s1.addVariable("logo","'+this.wmurl+'");\n';if(this.rurl.length>0){i+='	s1.addVariable("recommendations","'+this.rurl+'");\n';}i+='	s1.write("player'+x+'");\n';i+="<\/script>\n";i+="</div>\n";i+="</div>\n";return i;};function SelectColor1(){oEditor.FCKDialog.OpenDialog("FCKDialog_Color",oEditor.FCKLang.DlgColorTitle,"dialog/fck_colorselector.html",400,330,SelectBackColor,window);}function SelectColor2(){oEditor.FCKDialog.OpenDialog("FCKDialog_Color",oEditor.FCKLang.DlgColorTitle,"dialog/fck_colorselector.html",400,330,SelectToolColor,window);}function SelectColor3(){oEditor.FCKDialog.OpenDialog("FCKDialog_Color",oEditor.FCKLang.DlgColorTitle,"dialog/fck_colorselector.html",400,330,SelectToolTextColor,window);}function SelectColor4(){oEditor.FCKDialog.OpenDialog("FCKDialog_Color",oEditor.FCKLang.DlgColorTitle,"dialog/fck_colorselector.html",400,330,SelectToolTextRColor,window);}function SelectBackColor(b){if(b&&b.length>0){GetE("txtBgColor").value=b;}}function SelectToolColor(b){if(b&&b.length>0){GetE("txtToolbarColor").value=b;}}function SelectToolTextColor(b){if(b&&b.length>0){GetE("txtToolbarTxtColor").value=b;}}function SelectToolTextRColor(b){if(b&&b.length>0){GetE("txtToolbarTxtRColor").value=b;}}