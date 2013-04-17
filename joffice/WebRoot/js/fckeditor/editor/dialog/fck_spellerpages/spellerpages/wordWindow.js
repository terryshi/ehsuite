function wordWindow(){this._forms=[];this._getWordObject=_getWordObject;this._wordInputStr=_wordInputStr;this._adjustIndexes=_adjustIndexes;this._isWordChar=_isWordChar;this._lastPos=_lastPos;this.wordChar=/[a-zA-Z]/;this.windowType="wordWindow";this.originalSpellings=new Array();this.suggestions=new Array();this.checkWordBgColor="pink";this.normWordBgColor="white";this.text="";this.textInputs=new Array();this.indexes=new Array();this.resetForm=resetForm;this.totalMisspellings=totalMisspellings;this.totalWords=totalWords;this.totalPreviousWords=totalPreviousWords;this.getTextVal=getTextVal;this.setFocus=setFocus;this.removeFocus=removeFocus;this.setText=setText;this.writeBody=writeBody;this.printForHtml=printForHtml;}function resetForm(){if(this._forms){for(var b=0;b<this._forms.length;b++){this._forms[b].reset();}}return true;}function totalMisspellings(){var c=0;for(var d=0;d<this.textInputs.length;d++){c+=this.totalWords(d);}return c;}function totalWords(b){return this.originalSpellings[b].length;}function totalPreviousWords(i,g){var h=0;for(var j=0;j<=i;j++){for(var f=0;f<this.totalWords(j);f++){if(j==i&&f==g){break;}else{h++;}}}return h;}function getTextVal(d,e){var f=this._getWordObject(d,e);if(f){return f.value;}}function setFocus(d,e){var f=this._getWordObject(d,e);if(f){if(f.type=="text"){f.focus();f.style.backgroundColor=this.checkWordBgColor;}}}function removeFocus(d,e){var f=this._getWordObject(d,e);if(f){if(f.type=="text"){f.blur();f.style.backgroundColor=this.normWordBgColor;}}}function setText(q,o,n){var r=this._getWordObject(q,o);var m;var p;if(r){var l=this.indexes[q][o];var j=r.value;m=this.textInputs[q].substring(0,l);p=this.textInputs[q].substring(l+j.length,this.textInputs[q].length);this.textInputs[q]=m+n+p;var k=n.length-j.length;this._adjustIndexes(q,o,k);r.size=n.length;r.value=n;this.removeFocus(q,o);}}function writeBody(){var s=window.document;var v=false;s.open();for(var i=0;i<this.textInputs.length;i++){var j=0;var o=0;s.writeln('<form name="textInput'+i+'">');var d=this.textInputs[i];this.indexes[i]=[];if(d){var p=this.originalSpellings[i];if(!p){break;}s.writeln('<div class="plainText">');for(var t=0;t<p.length;t++){do{o=d.indexOf(p[t],j);j=o+p[t].length;if(o==-1){break;}var q=d.charAt(o-1);var r=d.charAt(j);}while(this._isWordChar(q)||this._isWordChar(r));this.indexes[i][t]=o;for(var u=this._lastPos(i,t);u<o;u++){s.write(this.printForHtml(d.charAt(u)));}s.write(this._wordInputStr(p[t]));if(t==p.length-1){s.write(printForHtml(d.substr(j)));}}s.writeln("</div>");}s.writeln("</form>");}this._forms=s.forms;s.close();}function _lastPos(c,d){if(d>0){return this.indexes[c][d-1]+this.originalSpellings[c][d-1].length;}else{return 0;}}function printForHtml(b){return b;}function _isWordChar(b){if(b.search(this.wordChar)==-1){return false;}else{return true;}}function _getWordObject(c,d){if(this._forms[c]){if(this._forms[c].elements[d]){return this._forms[c].elements[d];}}return null;}function _wordInputStr(d){var c="<input readonly ";c+='class="blend" type="text" value="'+d+'" size="'+d.length+'">';return c;}function _adjustIndexes(g,f,e){for(var h=f+1;h<this.originalSpellings[g].length;h++){this.indexes[g][h]=this.indexes[g][h]+e;}}