FCKCommands.RegisterCommand("dradiobutton",new FCKDialogCommand("dradiobutton",FCKLang.RadioButtonProp,FCKPlugins.Items["dradiobutton"].Path+"fck_dradiobutton.html",340,160));var oSItem=new FCKToolbarButton("dradiobutton",FCKLang.RadioButtonProp,null,null,null,true,50);FCKToolbarItems.RegisterItem("dradiobutton",oSItem);FCK.ContextMenu.RegisterListener({AddItems:function(f,e,d){if(d=="INPUT"&&e.type=="radio"&&e.getAttribute("cfckradio")){f.RemoveAllItems();f.AddItem("Cut",FCKLang.Cut,7,FCKCommands.GetCommand("Cut").GetState()==FCK_TRISTATE_DISABLED);f.AddItem("Copy",FCKLang.Copy,8,FCKCommands.GetCommand("Copy").GetState()==FCK_TRISTATE_DISABLED);f.AddItem("Paste",FCKLang.Paste,9,FCKCommands.GetCommand("Paste").GetState()==FCK_TRISTATE_DISABLED);f.AddItem("dradiobutton",FCKLang.RadioButtonProp,50);}}});