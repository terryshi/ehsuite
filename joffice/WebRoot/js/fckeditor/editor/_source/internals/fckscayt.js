var FCKScayt;(function(){var u=[];var D=(FCK&&FCK.EditorWindow&&FCK.EditorWindow.parent.parent.scayt)?true:false;var y=false;var w=false;function A(a){if(D){return;}D=true;var d=FCK.EditorWindow.parent.parent;var b=function(){window.scayt=d.scayt;C();var i=FCKToolbarItems.LoadedItems["ScaytCombobox"];i&&i.SetEnabled(scyt_control&&scyt_control.disabled);z();};if(d.scayt){b();return;}if(FCK.Config.ScaytCustomUrl){FCK.Config.ScaytCustomUrl=new String(FCK.Config.ScaytCustomUrl).replace(new RegExp("^http[s]*://"),"");}var c=document.location.protocol;var f=FCK.Config.ScaytCustomUrl||"svc.spellchecker.net/spellcheck3/lf/scayt/scayt4.js";var h=c+"//"+f;var e=q(h).path+"/";var g=d.window.CKEDITOR||(d.window.CKEDITOR={});g._djScaytConfig={baseUrl:e,addOnLoad:function(){b();},isDebug:false};if(a){u.push(a);}B(h);}function B(c){if(!c){return false;}var a=FCK.EditorWindow.parent.parent;var b=a.document.createElement("script");b.type="text/javascript";b.src=c;a.document.getElementsByTagName("head")[0].appendChild(b);return true;}function q(a){var b=a.match(/(.*)[\/\\]([^\/\\]+\.\w+)$/);return b?{path:b[1],file:b[2]}:a;}function t(){var d={};var c=FCK.EditorWindow.parent.parent;d.srcNodeRef=FCK.EditingArea.IFrame;d.customerid=FCK.Config.ScaytCustomerid;d.customDictionaryName=FCK.Config.ScaytCustomDictionaryName;d.userDictionaryName=FCK.Config.ScaytUserDictionaryName;d.defLang=FCK.Config.ScaytDefLang;var b=c.scayt;var a=window.scayt_control=new b(d);}function C(){t();var a=window.scayt_control;if(a){a.setDisabled(false);w=true;y=!a.disabled;var d=FCKToolbarItems.LoadedItems["ScaytCombobox"];d&&d.Enable();v();}for(var c=0;c<u.length;c++){try{u[c].call(this);}catch(b){}}}var s=function(){name="Scayt";};s.prototype.Execute=function(a){switch(a){case"Options":case"Langs":case"About":if(D&&w&&!y){x("SCAYT is not enabled");break;}if(D&&w){FCKDialog.OpenDialog("Scayt","SCAYT Settings","dialog/fck_scayt.html?"+a.toLowerCase(),343,343);}break;default:if(!D){var b=this;A(function(){b.SetEnabled(!window.scayt_control.disabled);});return true;}else{if(w){if(y){this.Disable();}else{this.Enable();}v();}}}if(!D){return x("SCAYT is not loaded")||false;}if(!w){return x("SCAYT is not ready")||false;}return true;};s.prototype.Enable=function(){window.scayt_control.setDisabled(false);y=true;};s.prototype.Disable=function(){window.scayt_control.setDisabled(true);y=false;};s.prototype.SetEnabled=function(a){if(a){this.Enable();}else{this.Disable();}v();return true;};s.prototype.GetState=function(){return FCK_TRISTATE_OFF;};function v(){var b=FCKToolbarItems.GetItem("SpellCheck");if(!b||!b._Combo||!b._Combo._OuterTable){return;}var c=b._Combo._OuterTable.getElementsByTagName("img")[1];var a=b._Combo.Items["trigger"];if(y){c.style.opacity="1";a.innerHTML=r();}else{c.style.opacity="0.5";a.innerHTML=r();}}function r(){if(!w){return"<b>Enable SCAYT</b>";}return y?"<b>Disable SCAYT</b>":"<b>Enable SCAYT</b>";}var F=function(a,b){this.Command=FCKCommands.GetCommand("Scayt");this.CommandName="Scayt";this.Label=this.GetLabel();this.Tooltip=FCKLang.ScaytTitle;this.Style=FCK_TOOLBARITEM_ONLYTEXT;};F.prototype=new FCKToolbarSpecialCombo;F.prototype.CreateItems=function(){this._Combo.AddItem("Trigger","<b>Enable SCAYT</b>");this._Combo.AddItem("Options",FCKLang.ScaytTitleOptions||"Options");this._Combo.AddItem("Langs",FCKLang.ScaytTitleLangs||"Languages");this._Combo.AddItem("About",FCKLang.ScaytTitleAbout||"About");};F.prototype.GetLabel=function(){var a=FCKConfig.SkinPath+"fck_strip.gif";return FCKBrowserInfo.IsIE?'<div class="TB_Button_Image"><img src="'+a+'" style="top:-192px"></div>':'<img class="TB_Button_Image" src="'+FCK_SPACER_PATH+'" style="background-position: 0px -192px;background-image: url('+a+');">';};function x(a){a&&alert(a);}var E=function(){name="ScaytContext";};E.prototype.Execute=function(e){var c=e&&e.action,d=c&&e.node,a=window.scayt_control;if(d){switch(c){case"Suggestion":a.replace(d,e.suggestion);break;case"Ignore":a.ignore(d);break;case"Ignore All":a.ignoreAll(d);break;case"Add Word":var b=FCK.EditorWindow.parent.parent;b.scayt.addWordToUserDictionary(d);break;}}};function z(){FCK.ContextMenu.RegisterListener({AddItems:function(a){var c=FCK.EditorWindow.parent.parent;var i=window.scayt_control,b=c.scayt;if(!i){return;}var j=i.getScaytNode();if(!j){return;}var f=b.getSuggestion(i.getWord(j),i.getLang());if(!f||!f.length){return;}a.AddSeparator();var d=FCK.Config.ScaytMaxSuggestions||5;var e=(d==-1)?f.length:d;for(var g=0;g<e;g+=1){if(f[g]){a.AddItem("ScaytContext",f[g],null,false,{"action":"Suggestion","node":j,"suggestion":f[g]});}}a.AddSeparator();a.AddItem("ScaytContext","Ignore",null,false,{"action":"Ignore","node":j});a.AddItem("ScaytContext","Ignore All",null,false,{"action":"Ignore All","node":j});a.AddItem("ScaytContext","Add Word",null,false,{"action":"Add Word","node":j});try{if(w&&y){i.fireOnContextMenu(null,FCK.ContextMenu._InnerContextMenu);}}catch(h){}}});FCK.Events.AttachEvent("OnPaste",function(){window.scayt_control.refresh();return true;});}FCK.Events.AttachEvent("OnAfterSetHTML",function(){if(FCKConfig.SpellChecker=="SCAYT"){if(!D&&FCK.Config.ScaytAutoStartup){A();}if(FCK.EditMode==FCK_EDITMODE_WYSIWYG&&D&&w){t();}v();}});FCK.Events.AttachEvent("OnBeforeGetData",function(){w&&window.scayt_control.reset();});FCK.Events.AttachEvent("OnAfterGetData",function(){w&&window.scayt_control.refresh();});FCKScayt={CreateCommand:function(){return new s();},CreateContextCommand:function(){return new E();},CreateToolbarItem:function(){return new F();}};})();