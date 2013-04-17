function spellChecker(b){this.popUpUrl="fck_spellerpages/spellerpages/spellchecker.html";this.popUpName="spellchecker";this.popUpProps=null;this.replWordFlag="R";this.ignrWordFlag="I";this.replAllFlag="RA";this.ignrAllFlag="IA";this.fromReplAll="~RA";this.fromIgnrAll="~IA";this.wordFlags=new Array();this.currentTextIndex=0;this.currentWordIndex=0;this.spellCheckerWin=null;this.controlWin=null;this.wordWin=null;this.textArea=b;this.textInputs=arguments;this._spellcheck=_spellcheck;this._getSuggestions=_getSuggestions;this._setAsIgnored=_setAsIgnored;this._getTotalReplaced=_getTotalReplaced;this._setWordText=_setWordText;this._getFormInputs=_getFormInputs;this.openChecker=openChecker;this.startCheck=startCheck;this.checkTextBoxes=checkTextBoxes;this.checkTextAreas=checkTextAreas;this.spellCheckAll=spellCheckAll;this.ignoreWord=ignoreWord;this.ignoreAll=ignoreAll;this.replaceWord=replaceWord;this.replaceAll=replaceAll;this.terminateSpell=terminateSpell;this.undo=undo;window.speller=this;}function checkTextBoxes(){this.textInputs=this._getFormInputs("^text$");this.openChecker();}function checkTextAreas(){this.textInputs=this._getFormInputs("^textarea$");this.openChecker();}function spellCheckAll(){this.textInputs=this._getFormInputs("^text(area)?$");this.openChecker();}function openChecker(){this.spellCheckerWin=window.open(this.popUpUrl,this.popUpName,this.popUpProps);if(!this.spellCheckerWin.opener){this.spellCheckerWin.opener=window;}}function startCheck(e,f){this.wordWin=e;this.controlWin=f;this.wordWin.resetForm();this.controlWin.resetForm();this.currentTextIndex=0;this.currentWordIndex=0;this.wordFlags=new Array(this.wordWin.textInputs.length);for(var d=0;d<this.wordFlags.length;d++){this.wordFlags[d]=[];}this._spellcheck();return true;}function ignoreWord(){var d=this.currentWordIndex;var c=this.currentTextIndex;if(!this.wordWin){alert("Error: Word frame not available.");return false;}if(!this.wordWin.getTextVal(c,d)){alert('Error: "Not in dictionary" text is missing.');return false;}if(this._setAsIgnored(c,d,this.ignrWordFlag)){this.currentWordIndex++;this._spellcheck();}return true;}function ignoreAll(){var g=this.currentWordIndex;var i=this.currentTextIndex;if(!this.wordWin){alert("Error: Word frame not available.");return false;}var h=this.wordWin.getTextVal(i,g);if(!h){alert('Error: "Not in dictionary" text is missing');return false;}this._setAsIgnored(i,g,this.ignrAllFlag);for(var j=i;j<this.wordWin.textInputs.length;j++){for(var f=0;f<this.wordWin.totalWords(j);f++){if((j==i&&f>g)||j>i){if((this.wordWin.getTextVal(j,f)==h)&&(!this.wordFlags[j][f])){this._setAsIgnored(j,f,this.fromIgnrAll);}}}}this.currentWordIndex++;this._spellcheck();return true;}function replaceWord(){var e=this.currentWordIndex;var h=this.currentTextIndex;if(!this.wordWin){alert("Error: Word frame not available.");return false;}if(!this.wordWin.getTextVal(h,e)){alert('Error: "Not in dictionary" text is missing');return false;}if(!this.controlWin.replacementText){return false;}var f=this.controlWin.replacementText;if(f.value){var g=new String(f.value);if(this._setWordText(h,e,g,this.replWordFlag)){this.currentWordIndex++;this._spellcheck();}}return true;}function replaceAll(){var l=this.currentTextIndex;var h=this.currentWordIndex;if(!this.wordWin){alert("Error: Word frame not available.");return false;}var j=this.wordWin.getTextVal(l,h);if(!j){alert('Error: "Not in dictionary" text is missing');return false;}var i=this.controlWin.replacementText;if(!i.value){return false;}var k=new String(i.value);this._setWordText(l,h,k,this.replAllFlag);for(var m=l;m<this.wordWin.textInputs.length;m++){for(var n=0;n<this.wordWin.totalWords(m);n++){if((m==l&&n>h)||m>l){if((this.wordWin.getTextVal(m,n)==j)&&(!this.wordFlags[m][n])){this._setWordText(m,n,k,this.fromReplAll);}}}}this.currentWordIndex++;this._spellcheck();return true;}function terminateSpell(){var f="";var e=this._getTotalReplaced();if(e==0){if(!this.wordWin){f="";}else{if(this.wordWin.totalMisspellings()){f+=FCKLang.DlgSpellNoChanges;}else{f+=FCKLang.DlgSpellNoMispell;}}}else{if(e==1){f+=FCKLang.DlgSpellOneChange;}else{f+=FCKLang.DlgSpellManyChanges.replace(/%1/g,e);}}if(f){alert(f);}if(e>0){for(var d=0;d<this.textInputs.length;d++){if(this.wordWin){if(this.wordWin.textInputs[d]){this.textInputs[d].value=this.wordWin.textInputs[d];}}}}if(typeof(this.OnFinished)=="function"){this.OnFinished(e);}return true;}function undo(){var m=this.currentTextIndex;var i=this.currentWordIndex;if(this.wordWin.totalPreviousWords(m,i)>0){this.wordWin.removeFocus(m,i);do{if(this.currentWordIndex==0&&this.currentTextIndex>0){this.currentTextIndex--;this.currentWordIndex=this.wordWin.totalWords(this.currentTextIndex)-1;if(this.currentWordIndex<0){this.currentWordIndex=0;}}else{if(this.currentWordIndex>0){this.currentWordIndex--;}}}while(this.wordWin.totalWords(this.currentTextIndex)==0||this.wordFlags[this.currentTextIndex][this.currentWordIndex]==this.fromIgnrAll||this.wordFlags[this.currentTextIndex][this.currentWordIndex]==this.fromReplAll);var k=this.currentTextIndex;var j=this.currentWordIndex;var p=this.wordWin.originalSpellings[k][j];if(this.wordWin.totalPreviousWords(k,j)==0){this.controlWin.disableUndo();}var n,o,l;switch(this.wordFlags[k][j]){case this.replAllFlag:for(n=k;n<this.wordWin.textInputs.length;n++){for(o=0;o<this.wordWin.totalWords(n);o++){if((n==k&&o>=j)||n>k){l=this.wordWin.originalSpellings[n][o];if(l==p){this._setWordText(n,o,l,undefined);}}}}break;case this.ignrAllFlag:for(n=k;n<this.wordWin.textInputs.length;n++){for(o=0;o<this.wordWin.totalWords(n);o++){if((n==k&&o>=j)||n>k){l=this.wordWin.originalSpellings[n][o];if(l==p){this.wordFlags[n][o]=undefined;}}}}break;case this.replWordFlag:this._setWordText(k,j,p,undefined);break;}this.wordFlags[k][j]=undefined;this._spellcheck();}}function _spellcheck(){var c=this.wordWin;if(this.currentWordIndex==c.totalWords(this.currentTextIndex)){this.currentTextIndex++;this.currentWordIndex=0;if(this.currentTextIndex<this.wordWin.textInputs.length){this._spellcheck();return;}else{this.terminateSpell();return;}}if(this.currentWordIndex>0){this.controlWin.enableUndo();}if(this.wordFlags[this.currentTextIndex][this.currentWordIndex]){this.currentWordIndex++;this._spellcheck();}else{var d=c.getTextVal(this.currentTextIndex,this.currentWordIndex);if(d){this.controlWin.evaluatedText.value=d;c.setFocus(this.currentTextIndex,this.currentWordIndex);this._getSuggestions(this.currentTextIndex,this.currentWordIndex);}}}function _getSuggestions(g,f){this.controlWin.clearSuggestions();var h=this.wordWin.suggestions[g][f];if(h){for(var e=0;e<h.length;e++){this.controlWin.addSuggestion(h[e]);}}this.controlWin.selectDefaultSuggestion();}function _setAsIgnored(f,d,e){this.wordWin.removeFocus(f,d);this.wordFlags[f][d]=e;return true;}function _getTotalReplaced(){var f=0;for(var d=0;d<this.wordFlags.length;d++){for(var e=0;e<this.wordFlags[d].length;e++){if((this.wordFlags[d][e]==this.replWordFlag)||(this.wordFlags[d][e]==this.replAllFlag)||(this.wordFlags[d][e]==this.fromReplAll)){f++;}}}return f;}function _setWordText(g,e,h,f){this.wordWin.setText(g,e,h);this.wordFlags[g][e]=f;return true;}function _getFormInputs(e){var f=new Array();for(var g=0;g<document.forms.length;g++){for(var h=0;h<document.forms[g].elements.length;h++){if(document.forms[g].elements[h].type.match(e)){f[f.length]=document.forms[g].elements[h];}}}return f;}