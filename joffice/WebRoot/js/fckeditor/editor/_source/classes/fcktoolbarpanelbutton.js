var FCKToolbarPanelButton=function(n,h,k,l,m){this.CommandName=n;var j;if(m==null){j=FCKConfig.SkinPath+"toolbar/"+n.toLowerCase()+".gif";}else{if(typeof(m)=="number"){j=[FCKConfig.SkinPath+"fck_strip.gif",16,m];}}var i=this._UIButton=new FCKToolbarButtonUI(n,h,k,j,l);i._FCKToolbarPanelButton=this;i.ShowArrow=true;i.OnClick=FCKToolbarPanelButton_OnButtonClick;};FCKToolbarPanelButton.prototype.TypeName="FCKToolbarPanelButton";FCKToolbarPanelButton.prototype.Create=function(d){d.className+="Menu";this._UIButton.Create(d);var c=FCK.ToolbarSet.CurrentInstance.Commands.GetCommand(this.CommandName)._Panel;this.RegisterPanel(c);};FCKToolbarPanelButton.prototype.RegisterPanel=function(d){if(d._FCKToolbarPanelButton){return;}d._FCKToolbarPanelButton=this;var e=d.Document.body.appendChild(d.Document.createElement("div"));e.style.position="absolute";e.style.top="0px";var f=d._FCKToolbarPanelButtonLineDiv=e.appendChild(d.Document.createElement("IMG"));f.className="TB_ConnectionLine";f.style.position="absolute";f.src=FCK_SPACER_PATH;d.OnHide=FCKToolbarPanelButton_OnPanelHide;};function FCKToolbarPanelButton_OnButtonClick(g){var e=this._FCKToolbarPanelButton;var i=e._UIButton.MainElement;e._UIButton.ChangeState(FCK_TRISTATE_ON);var h=FCK.ToolbarSet.CurrentInstance.Commands.GetCommand(e.CommandName);var j=h._Panel;j._FCKToolbarPanelButtonLineDiv.style.width=(i.offsetWidth-2)+"px";h.Execute(0,i.offsetHeight-1,i);}function FCKToolbarPanelButton_OnPanelHide(){var b=this._FCKToolbarPanelButton;b._UIButton.ChangeState(FCK_TRISTATE_OFF);}FCKToolbarPanelButton.prototype.RefreshState=FCKToolbarButton.prototype.RefreshState;FCKToolbarPanelButton.prototype.Enable=FCKToolbarButton.prototype.Enable;FCKToolbarPanelButton.prototype.Disable=FCKToolbarButton.prototype.Disable;