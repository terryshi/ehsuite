Ext.ns("Ext.ux.util");Ext.ux.util.MD5=function(n){var p=0;var s=8;function u(d,a){var b=(d&65535)+(a&65535);var c=(d>>16)+(a>>16)+(b>>16);return(c<<16)|(b&65535);}function q(b,a){return(b<<a)|(b>>>(32-a));}function y(a,d,e,f,b,c){return u(q(u(u(d,a),u(f,c)),b),e);}function t(e,f,a,b,g,c,d){return y((f&a)|((~f)&b),e,f,g,c,d);}function x(e,f,a,b,g,c,d){return y((f&b)|(a&(~b)),e,f,g,c,d);}function r(e,f,a,b,g,c,d){return y(f^a^b,e,f,g,c,d);}function v(e,f,a,b,g,c,d){return y(a^(f|(~b)),e,f,g,c,d);}function w(f,k){f[k>>5]|=128<<((k)%32);f[(((k+64)>>>9)<<4)+14]=k;var g=1732584193;var h=-271733879;var i=-1732584194;var j=271733878;for(var c=0;c<f.length;c+=16){var a=g;var b=h;var d=i;var e=j;g=t(g,h,i,j,f[c+0],7,-680876936);j=t(j,g,h,i,f[c+1],12,-389564586);i=t(i,j,g,h,f[c+2],17,606105819);h=t(h,i,j,g,f[c+3],22,-1044525330);g=t(g,h,i,j,f[c+4],7,-176418897);j=t(j,g,h,i,f[c+5],12,1200080426);i=t(i,j,g,h,f[c+6],17,-1473231341);h=t(h,i,j,g,f[c+7],22,-45705983);g=t(g,h,i,j,f[c+8],7,1770035416);j=t(j,g,h,i,f[c+9],12,-1958414417);i=t(i,j,g,h,f[c+10],17,-42063);h=t(h,i,j,g,f[c+11],22,-1990404162);g=t(g,h,i,j,f[c+12],7,1804603682);j=t(j,g,h,i,f[c+13],12,-40341101);i=t(i,j,g,h,f[c+14],17,-1502002290);h=t(h,i,j,g,f[c+15],22,1236535329);g=x(g,h,i,j,f[c+1],5,-165796510);j=x(j,g,h,i,f[c+6],9,-1069501632);i=x(i,j,g,h,f[c+11],14,643717713);h=x(h,i,j,g,f[c+0],20,-373897302);g=x(g,h,i,j,f[c+5],5,-701558691);j=x(j,g,h,i,f[c+10],9,38016083);i=x(i,j,g,h,f[c+15],14,-660478335);h=x(h,i,j,g,f[c+4],20,-405537848);g=x(g,h,i,j,f[c+9],5,568446438);j=x(j,g,h,i,f[c+14],9,-1019803690);i=x(i,j,g,h,f[c+3],14,-187363961);h=x(h,i,j,g,f[c+8],20,1163531501);g=x(g,h,i,j,f[c+13],5,-1444681467);j=x(j,g,h,i,f[c+2],9,-51403784);i=x(i,j,g,h,f[c+7],14,1735328473);h=x(h,i,j,g,f[c+12],20,-1926607734);g=r(g,h,i,j,f[c+5],4,-378558);j=r(j,g,h,i,f[c+8],11,-2022574463);i=r(i,j,g,h,f[c+11],16,1839030562);h=r(h,i,j,g,f[c+14],23,-35309556);g=r(g,h,i,j,f[c+1],4,-1530992060);j=r(j,g,h,i,f[c+4],11,1272893353);i=r(i,j,g,h,f[c+7],16,-155497632);h=r(h,i,j,g,f[c+10],23,-1094730640);g=r(g,h,i,j,f[c+13],4,681279174);j=r(j,g,h,i,f[c+0],11,-358537222);i=r(i,j,g,h,f[c+3],16,-722521979);h=r(h,i,j,g,f[c+6],23,76029189);g=r(g,h,i,j,f[c+9],4,-640364487);j=r(j,g,h,i,f[c+12],11,-421815835);i=r(i,j,g,h,f[c+15],16,530742520);h=r(h,i,j,g,f[c+2],23,-995338651);g=v(g,h,i,j,f[c+0],6,-198630844);j=v(j,g,h,i,f[c+7],10,1126891415);i=v(i,j,g,h,f[c+14],15,-1416354905);h=v(h,i,j,g,f[c+5],21,-57434055);g=v(g,h,i,j,f[c+12],6,1700485571);j=v(j,g,h,i,f[c+3],10,-1894986606);i=v(i,j,g,h,f[c+10],15,-1051523);h=v(h,i,j,g,f[c+1],21,-2054922799);g=v(g,h,i,j,f[c+8],6,1873313359);j=v(j,g,h,i,f[c+15],10,-30611744);i=v(i,j,g,h,f[c+6],15,-1560198380);h=v(h,i,j,g,f[c+13],21,1309151649);g=v(g,h,i,j,f[c+4],6,-145523070);j=v(j,g,h,i,f[c+11],10,-1120210379);i=v(i,j,g,h,f[c+2],15,718787259);h=v(h,i,j,g,f[c+9],21,-343485551);g=u(g,a);h=u(h,b);i=u(i,d);j=u(j,e);}return[g,h,i,j];}function z(a){var b=[];var d=(1<<s)-1;for(var c=0;c<a.length*s;c+=s){b[c>>5]|=(a.charCodeAt(c/s)&d)<<(c%32);}return b;}function o(b){var c=p?"0123456789ABCDEF":"0123456789abcdef";var a="";for(var d=0;d<b.length*4;d++){a+=c.charAt((b[d>>2]>>((d%4)*8+4))&15)+c.charAt((b[d>>2]>>((d%4)*8))&15);}return a;}return o(w(z(n),n.length*s));};Ext.ux.util.clone=function(h){if(!h||"object"!==typeof h){return h;}if("function"===typeof h.clone){return h.clone();}var g="[object Array]"===Object.prototype.toString.call(h)?[]:{};var c,f;for(c in h){if(h.hasOwnProperty(c)){f=h[c];if(f&&"object"===typeof f){g[c]=Ext.ux.util.clone(f);}else{g[c]=f;}}}return g;};Ext.ux.util.applyMatching=function(e,d){var d=d||this;for(var f in e){if(e.hasOwnProperty(f)&&undefined!==d[f]){e[f]=d[f];}}return e;};Ext.overrideIf="function"===typeof Ext.overrideIf?Ext.overrideIf:function(f,h){if(h){var e=f.prototype;for(var g in h){if(!e[g]){e[g]=h[g];}}}};if("function"!==typeof RegExp.escape){RegExp.escape=function(b){if("string"!==typeof b){return b;}return b.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g,"\\$1");};}Ext.overrideIf(RegExp,{clone:function(){return new RegExp(this);}});Ext.overrideIf(Array,{copy:function(){var f=[];for(var e=0,a=this.length;e<a;e++){f.push(this[e]);}return f;},indexOf:function(g,b){for(var f=+b||0,h=this.length;f<h;f++){if(this[f]===g){return f;}}return -1;},intersect:function(){if(!arguments.length){return[];}var l=this,a,m;for(var k=0,i=arguments.length;k<i;k++){m=[];a=arguments[k]||[];for(var j=0,n=l.length;j<n;j++){if(-1<a.indexOf(l[j])){m.push(l[j]);}}l=m;}return m.unique();},lastIndexOf:function(f,b){b=+b||0;var e=this.length;while(e-->b){if(this[e]===f){return e;}}return -1;},union:function(){var k=this.copy(),l;for(var j=0,h=arguments.length;j<h;j++){l=arguments[j]||[];for(var i=0,a=l.length;i<a;i++){k.push(l[i]);}}return k.unique();},unique:function(){var f=[],e,a=this.length;for(e=0;e<a;e++){if(f.indexOf(this[e])<0){f.push(this[e]);}}return f;}});