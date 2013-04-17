var FCKDialogCommand=function(o,k,p,n,j,i,l,m){this.Name=o;this.Title=k;this.Url=p;this.Width=n;this.Height=j;this.CustomValue=m;this.GetStateFunction=i;this.GetStateParam=l;this.Resizable=false;};FCKDialogCommand.prototype.Execute=function(){FCKDialog.OpenDialog("FCKDialog_"+this.Name,this.Title,this.Url,this.Width,this.Height,this.CustomValue,this.Resizable);};FCKDialogCommand.prototype.GetState=function(){if(this.GetStateFunction){return this.GetStateFunction(this.GetStateParam);}else{return FCK.EditMode==FCK_EDITMODE_WYSIWYG?FCK_TRISTATE_OFF:FCK_TRISTATE_DISABLED;}};var FCKUndefinedCommand=function(){this.Name="Undefined";};FCKUndefinedCommand.prototype.Execute=function(){alert(FCKLang.NotImplemented);};FCKUndefinedCommand.prototype.GetState=function(){return FCK_TRISTATE_OFF;};var FCKFormatBlockCommand=function(){};FCKFormatBlockCommand.prototype={Name:"FormatBlock",Execute:FCKStyleCommand.prototype.Execute,GetState:function(){return FCK.EditorDocument?FCK_TRISTATE_OFF:FCK_TRISTATE_DISABLED;}};var FCKFontNameCommand=function(){};FCKFontNameCommand.prototype={Name:"FontName",Execute:FCKStyleCommand.prototype.Execute,GetState:FCKFormatBlockCommand.prototype.GetState};var FCKFontSizeCommand=function(){};FCKFontSizeCommand.prototype={Name:"FontSize",Execute:FCKStyleCommand.prototype.Execute,GetState:FCKFormatBlockCommand.prototype.GetState};var FCKPreviewCommand=function(){this.Name="Preview";};FCKPreviewCommand.prototype.Execute=function(){FCK.Preview();};FCKPreviewCommand.prototype.GetState=function(){return FCK_TRISTATE_OFF;};var FCKSaveCommand=function(){this.Name="Save";};FCKSaveCommand.prototype.Execute=function(){var c=FCK.GetParentForm();if(typeof(c.onsubmit)=="function"){var d=c.onsubmit();if(d!=null&&d===false){return;}}if(typeof(c.submit)=="function"){c.submit();}else{c.submit.click();}};FCKSaveCommand.prototype.GetState=function(){return FCK_TRISTATE_OFF;};var FCKNewPageCommand=function(){this.Name="NewPage";};FCKNewPageCommand.prototype.Execute=function(){FCKUndo.SaveUndoStep();FCK.SetData("");FCKUndo.Typing=true;FCK.Focus();};FCKNewPageCommand.prototype.GetState=function(){return FCK_TRISTATE_OFF;};var FCKSourceCommand=function(){this.Name="Source";};FCKSourceCommand.prototype.Execute=function(){if(FCKConfig.SourcePopup){var d=FCKConfig.ScreenWidth*0.65;var c=FCKConfig.ScreenHeight*0.65;FCKDialog.OpenDialog("FCKDialog_Source",FCKLang.Source,"dialog/fck_source.html",d,c,null,true);}else{FCK.SwitchEditMode();}};FCKSourceCommand.prototype.GetState=function(){return(FCK.EditMode==FCK_EDITMODE_WYSIWYG?FCK_TRISTATE_OFF:FCK_TRISTATE_ON);};var FCKUndoCommand=function(){this.Name="Undo";};FCKUndoCommand.prototype.Execute=function(){FCKUndo.Undo();};FCKUndoCommand.prototype.GetState=function(){if(FCK.EditMode!=FCK_EDITMODE_WYSIWYG){return FCK_TRISTATE_DISABLED;}return(FCKUndo.CheckUndoState()?FCK_TRISTATE_OFF:FCK_TRISTATE_DISABLED);};var FCKRedoCommand=function(){this.Name="Redo";};FCKRedoCommand.prototype.Execute=function(){FCKUndo.Redo();};FCKRedoCommand.prototype.GetState=function(){if(FCK.EditMode!=FCK_EDITMODE_WYSIWYG){return FCK_TRISTATE_DISABLED;}return(FCKUndo.CheckRedoState()?FCK_TRISTATE_OFF:FCK_TRISTATE_DISABLED);};var FCKPageBreakCommand=function(){this.Name="PageBreak";};FCKPageBreakCommand.prototype.Execute=function(){FCKUndo.SaveUndoStep();var h=FCK.EditorDocument.createElement("DIV");h.style.pageBreakAfter="always";h.innerHTML='<span style="DISPLAY:none">&nbsp;</span>';var e=FCKDocumentProcessor_CreateFakeImage("FCK__PageBreak",h);var g=new FCKDomRange(FCK.EditorWindow);g.MoveToSelection();var f=g.SplitBlock();g.InsertNode(e);FCK.Events.FireEvent("OnSelectionChange");};FCKPageBreakCommand.prototype.GetState=function(){if(FCK.EditMode!=FCK_EDITMODE_WYSIWYG){return FCK_TRISTATE_DISABLED;}return 0;};var FCKUnlinkCommand=function(){this.Name="Unlink";};FCKUnlinkCommand.prototype.Execute=function(){FCKUndo.SaveUndoStep();if(FCKBrowserInfo.IsGeckoLike){var b=FCK.Selection.MoveToAncestorNode("A");if(b){FCKTools.RemoveOuterTags(b);}return;}FCK.ExecuteNamedCommand(this.Name);};FCKUnlinkCommand.prototype.GetState=function(){if(FCK.EditMode!=FCK_EDITMODE_WYSIWYG){return FCK_TRISTATE_DISABLED;}var d=FCK.GetNamedCommandState(this.Name);if(d==FCK_TRISTATE_OFF&&FCK.EditMode==FCK_EDITMODE_WYSIWYG){var f=FCKSelection.MoveToAncestorNode("A");var e=(f&&f.name.length>0&&f.href.length==0);if(e){d=FCK_TRISTATE_DISABLED;}}return d;};var FCKVisitLinkCommand=function(){this.Name="VisitLink";};FCKVisitLinkCommand.prototype={GetState:function(){if(FCK.EditMode!=FCK_EDITMODE_WYSIWYG){return FCK_TRISTATE_DISABLED;}var c=FCK.GetNamedCommandState("Unlink");if(c==FCK_TRISTATE_OFF){var d=FCKSelection.MoveToAncestorNode("A");if(!d.href){c=FCK_TRISTATE_DISABLED;}}return c;},Execute:function(){var j=FCKSelection.MoveToAncestorNode("A");var g=j.getAttribute("_fcksavedurl")||j.getAttribute("href",2);if(!/:\/\//.test(g)){var e=FCKConfig.BaseHref;var h=FCK.GetInstanceObject("parent");if(!e){e=h.document.location.href;e=e.substring(0,e.lastIndexOf("/")+1);}if(/^\//.test(g)){try{e=e.match(/^.*:\/\/+[^\/]+/)[0];}catch(i){e=h.document.location.protocol+"://"+h.parent.document.location.host;}}g=e+g;}if(!window.open(g,"_blank")){alert(FCKLang.VisitLinkBlocked);}}};var FCKSelectAllCommand=function(){this.Name="SelectAll";};FCKSelectAllCommand.prototype.Execute=function(){if(FCK.EditMode==FCK_EDITMODE_WYSIWYG){FCK.ExecuteNamedCommand("SelectAll");}else{var b=FCK.EditingArea.Textarea;if(FCKBrowserInfo.IsIE){b.createTextRange().execCommand("SelectAll");}else{b.selectionStart=0;b.selectionEnd=b.value.length;}b.focus();}};FCKSelectAllCommand.prototype.GetState=function(){if(FCK.EditMode!=FCK_EDITMODE_WYSIWYG){return FCK_TRISTATE_DISABLED;}return FCK_TRISTATE_OFF;};var FCKPasteCommand=function(){this.Name="Paste";};FCKPasteCommand.prototype={Execute:function(){if(FCKBrowserInfo.IsIE){FCK.Paste();}else{FCK.ExecuteNamedCommand("Paste");}},GetState:function(){if(FCK.EditMode!=FCK_EDITMODE_WYSIWYG){return FCK_TRISTATE_DISABLED;}return FCK.GetNamedCommandState("Paste");}};var FCKRuleCommand=function(){this.Name="Rule";};FCKRuleCommand.prototype={Execute:function(){FCKUndo.SaveUndoStep();FCK.InsertElement("hr");},GetState:function(){if(FCK.EditMode!=FCK_EDITMODE_WYSIWYG){return FCK_TRISTATE_DISABLED;}return FCK.GetNamedCommandState("InsertHorizontalRule");}};var FCKCutCopyCommand=function(b){this.Name=b?"Cut":"Copy";};FCKCutCopyCommand.prototype={Execute:function(){var e=false;if(FCKBrowserInfo.IsIE){var g=function(){e=true;};var f="on"+this.Name.toLowerCase();FCK.EditorDocument.body.attachEvent(f,g);FCK.ExecuteNamedCommand(this.Name);FCK.EditorDocument.body.detachEvent(f,g);}else{try{FCK.ExecuteNamedCommand(this.Name);e=true;}catch(h){}}if(!e){alert(FCKLang["PasteError"+this.Name]);}},GetState:function(){return FCK.EditMode!=FCK_EDITMODE_WYSIWYG?FCK_TRISTATE_DISABLED:FCK.GetNamedCommandState("Cut");}};var FCKAnchorDeleteCommand=function(){this.Name="AnchorDelete";};FCKAnchorDeleteCommand.prototype={Execute:function(){if(FCK.Selection.GetType()=="Control"){FCK.Selection.Delete();}else{var b=FCK.Selection.GetSelectedElement();if(b){if(b.tagName=="IMG"&&b.getAttribute("_fckanchor")){oAnchor=FCK.GetRealElement(b);}else{b=null;}}if(!b){oAnchor=FCK.Selection.MoveToAncestorNode("A");if(oAnchor){FCK.Selection.SelectNode(oAnchor);}}if(oAnchor.href.length!=0){oAnchor.removeAttribute("name");if(FCKBrowserInfo.IsIE){oAnchor.className=oAnchor.className.replace(FCKRegexLib.FCK_Class,"");}return;}if(b){b.parentNode.removeChild(b);return;}if(oAnchor.innerHTML.length==0){oAnchor.parentNode.removeChild(oAnchor);return;}FCKTools.RemoveOuterTags(oAnchor);}if(FCKBrowserInfo.IsGecko){FCK.Selection.Collapse(true);}},GetState:function(){if(FCK.EditMode!=FCK_EDITMODE_WYSIWYG){return FCK_TRISTATE_DISABLED;}return FCK.GetNamedCommandState("Unlink");}};var FCKDeleteDivCommand=function(){};FCKDeleteDivCommand.prototype={GetState:function(){if(FCK.EditMode!=FCK_EDITMODE_WYSIWYG){return FCK_TRISTATE_DISABLED;}var d=FCKSelection.GetParentElement();var c=new FCKElementPath(d);return c.BlockLimit&&c.BlockLimit.nodeName.IEquals("div")?FCK_TRISTATE_OFF:FCK_TRISTATE_DISABLED;},Execute:function(){FCKUndo.SaveUndoStep();var e=FCKDomTools.GetSelectedDivContainers();var f=new FCKDomRange(FCK.EditorWindow);f.MoveToSelection();var g=f.CreateBookmark();for(var h=0;h<e.length;h++){FCKDomTools.RemoveNode(e[h],true);}f.MoveToBookmark(g);f.Select();}};var FCKNbsp=function(){this.Name="Non Breaking Space";};FCKNbsp.prototype={Execute:function(){FCK.InsertHtml("&nbsp;");},GetState:function(){return(FCK.EditMode!=FCK_EDITMODE_WYSIWYG?FCK_TRISTATE_DISABLED:FCK_TRISTATE_OFF);}};