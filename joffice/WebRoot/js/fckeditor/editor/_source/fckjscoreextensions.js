String.prototype.Contains=function(b){return(this.indexOf(b)>-1);};String.prototype.Equals=function(){var c=arguments;if(c.length==1&&c[0].pop){c=c[0];}for(var d=0;d<c.length;d++){if(this==c[d]){return true;}}return false;};String.prototype.IEquals=function(){var f=this.toUpperCase();var d=arguments;if(d.length==1&&d[0].pop){d=d[0];}for(var e=0;e<d.length;e++){if(f==d[e].toUpperCase()){return true;}}return false;};String.prototype.ReplaceAll=function(g,e){var h=this;for(var f=0;f<g.length;f++){h=h.replace(g[f],e[f]);}return h;};String.prototype.StartsWith=function(b){return(this.substr(0,b.length)==b);};String.prototype.EndsWith=function(h,j){var i=this.length;var f=h.length;if(f>i){return false;}if(j){var g=new RegExp(h+"$","i");return g.test(this);}else{return(f==0||this.substr(i-f,f)==h);}};String.prototype.Remove=function(f,d){var e="";if(f>0){e=this.substring(0,f);}if(f+d<this.length){e+=this.substring(f+d,this.length);}return e;};String.prototype.Trim=function(){return this.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g,"");};String.prototype.LTrim=function(){return this.replace(/^[ \t\n\r]*/g,"");};String.prototype.RTrim=function(){return this.replace(/[ \t\n\r]*$/g,"");};String.prototype.ReplaceNewLineChars=function(b){return this.replace(/\n/g,b);};String.prototype.Replace=function(e,d,f){if(typeof d=="function"){return this.replace(e,function(){return d.apply(f||this,arguments);});}else{return this.replace(e,d);}};Array.prototype.IndexOf=function(c){for(var d=0;d<this.length;d++){if(this[d]==c){return d;}}return -1;};