var FCKStyleCommand=function(){};FCKStyleCommand.prototype={Name:"Style",Execute:function(d,c){FCKUndo.SaveUndoStep();if(c.Selected){FCK.Styles.RemoveStyle(c.Style);}else{FCK.Styles.ApplyStyle(c.Style);}FCKUndo.SaveUndoStep();FCK.Focus();FCK.Events.FireEvent("OnSelectionChange");},GetState:function(){if(FCK.EditMode!=FCK_EDITMODE_WYSIWYG||!FCK.EditorDocument){return FCK_TRISTATE_DISABLED;}if(FCKSelection.GetType()=="Control"){var b=FCKSelection.GetSelectedElement();if(!b||!FCKStyles.CheckHasObjectStyle(b.nodeName.toLowerCase())){return FCK_TRISTATE_DISABLED;}}return FCK_TRISTATE_OFF;}};