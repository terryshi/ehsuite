var FCKURLParams=new Object();(function(){var i=document.location.search.substr(1).split("&");for(var j=0;j<i.length;j++){var h=i[j].split("=");var f=decodeURIComponent(h[0]);var g=decodeURIComponent(h[1]);FCKURLParams[f]=g;}})();