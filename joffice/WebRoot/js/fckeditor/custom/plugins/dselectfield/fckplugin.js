FCKCommands.RegisterCommand("dselectfield",new FCKDialogCommand("dselectfield",FCKLang.SelectionFieldProp,FCKPlugins.Items["dselectfield"].Path+"fck_dselectfield.html",380,210));var oSItem=new FCKToolbarButton("dselectfield",FCKLang.SelectionFieldProp,null,null,null,true,53);FCKToolbarItems.RegisterItem("dselectfield",oSItem);FCK.ContextMenu.RegisterListener({AddItems:function(f,e,d){if(d=="SELECT"&&e.getAttribute("isNew")){f.RemoveAllItems();f.AddItem("Cut",FCKLang.Cut,7,FCKCommands.GetCommand("Cut").GetState()==FCK_TRISTATE_DISABLED);f.AddItem("Copy",FCKLang.Copy,8,FCKCommands.GetCommand("Copy").GetState()==FCK_TRISTATE_DISABLED);f.AddItem("Paste",FCKLang.Paste,9,FCKCommands.GetCommand("Paste").GetState()==FCK_TRISTATE_DISABLED);f.AddItem("dselectfield",FCKLang.SelectionFieldProp,53);}}});