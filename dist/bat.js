/*!
 * Bat.js - Utility belt for JS ninjas
 * @author Jo Santana
 * @version v0.0.1
 * @link http://batjs.github.io
 * @license Released under the MIT license
 */

(function(){"use strict";var e=this,n=e.Bat||{};n.cookie=function(){return{set:function(e,t,o){var r;if(o){var i=new Date;i.setTime(i.getTime()+24*o*60*60*1e3),r="; expires="+i.toUTCString()}else r="";document.cookie=e+"="+t+r+"; path=/",-1!==o&&n.log.info("Cookie: "+e+" [CREATED]")},get:function(e){var n,t=e+"=",o=document.cookie.split(";");for(n=0;n<o.length;n++){for(var r=o[n];" "===r.charAt(0);)r=r.substring(1,r.length);if(0===r.indexOf(t))return r.substring(t.length,r.length)}return null},"delete":function(e){this.set(e,"",-1),n.log.info("Cookie: "+e+" [DELETED]")}}}(),e.Bat=n}).call(this),function(){"use strict";var e=this,n=e.Bat||{};n.log=function(){for(var e,t=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],o=t.length,r=function(){},i=window.console=window.console||{};o--;)e=t[o],i[e]||(i[e]=r);var a=function(){return"enabled"===n.cookie.get("Bat.log")?!0:!1};return{enable:function(){n.cookie.set("Bat.log","enabled",1)},disable:function(){n.cookie.delete("Bat.log")},info:function(e){a&&i.info(e)},trace:function(e){a&&i.trace(e)},warn:function(e){a&&i.warn(e)},error:function(e){a&&i.error(e)},group:function(e){a&&e&&i.group(e)},ungroup:function(){a&&i.groupEnd()}}}(),e.Bat=n}.call(this),function(){"use strict";var e=this,n=e.Bat||{};n.ajax=function(){var e=function(){var e=new XMLHttpRequest;return e},n=function(e){var n="";for(var t in e)n+=t+"="+encodeURIComponent(e[t])+"&";return n=n.slice(0,-1)},t=function(e,t,o){e.url=e.url||location.href,e.data=e.data?n(e.data):null,e.beforeSend=e.beforeSend||function(){},o=o||function(){}},o=function(e,n){var t=e.callback||"JSONP_"+(new Date).getTime();e.url+=(-1===e.url.indexOf("?")?"?":"&")+"callback="+t,window[t]=n;var o=document.createElement("script");o.src=e.url,document.body.appendChild(o)},r=function(n,t,o){var r=e(),i=t.data?t.url+"?"+t.data:t.url;r.open(n,i,!0),t.beforeSend(r),"POST"===n&&r.setRequestHeader("content-type","application/x-www-form-urlencoded"),r.onreadystatechange=function(){4===r.readyState&&o(0===r.status.toString().indexOf(20)?r.responseText:'{"status": "ERROR","code": "'+r.status.toString()+'","message": "'+r.statusText.toString()+'" }')},r.send(t.data)};return{getJSON:function(e,n){t(e,n),r("GET",e,n)},getJSONP:function(e,n){t(e,n),o(e,n),r("GET",e,n)},getHTML:function(e,n){t(e,n),r("GET",e,n)},post:function(e,n){t(e,n),r("POST",e,n)}}}(),e.Bat=n}.call(this),function(){"use strict";var e=this,n=e.Bat||{};n.md5=function(){var e="0123456789abcdef",n={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,a:10,b:11,c:12,d:13,e:14,f:15,A:10,B:11,C:12,D:13,E:14,F:15},t=[7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21],o=[3614090360,3905402710,606105819,3250441966,4118548399,1200080426,2821735955,4249261313,1770035416,2336552879,4294925233,2304563134,1804603682,4254626195,2792965006,1236535329,4129170786,3225465664,643717713,3921069994,3593408605,38016083,3634488961,3889429448,568446438,3275163606,4107603335,1163531501,2850285829,4243563512,1735328473,2368359562,4294588738,2272392833,1839030562,4259657740,2763975236,1272893353,4139469664,3200236656,681279174,3936430074,3572445317,76029189,3654602809,3873151461,530742520,3299628645,4096336452,1126891415,2878612391,4237533241,1700485571,2399980690,4293915773,2240044497,1873313359,4264355552,2734768916,1309151649,4149444226,3174756917,718787259,3951481745],r=function(n){for(var t="",o=0;4>o;o++){var r=o<<3;t+=e.charAt(n>>r+4&15)+e.charAt(n>>r&15)}return t},i=function(e){for(var n=e.length;n--;)if(e.charCodeAt(n)>127)return!0;return!1},a=function(e){var n,t=e.length,o=(t+8>>6)+1,r=o<<4,i=[];for(n=0;r>n;++n)i[n]=0;for(n=0;t>n;++n)i[n>>2]|=e.charCodeAt(n)<<(n%4<<3);return i[n>>2]|=128<<(n%4<<3),i[r-2]=t<<3,i},c=function(e){for(var t=encodeURIComponent(e),o=[],r=0,i=0,a=t.length;a>r;++r){var c=t.charCodeAt(r);o[i>>2]|=37==c?(n[t.charAt(++r)]<<4|n[t.charAt(++r)])<<(i%4<<3):c<<(i%4<<3),++i}var u=(i+8>>6)+1,l=u<<4,s=i>>2;for(o[s]|=128<<(i%4<<3),r=s+1;l>r;++r)o[r]=0;return o[l-2]=i<<3,o};return function(e){for(var n=i(e)?new c(e):new a(e),u=1732584193,l=4023233417,s=2562383102,d=271733878,f=0,g=n.length;g>f;f+=16){for(var p,w,h,m,v,E=u,b=l,x=s,R=d,T=0;64>T;++T)16>T?(p=R^b&(x^R),w=T):32>T?(p=x^R&(b^x),w=(5*T+1)%16):48>T?(p=b^x^R,w=(3*T+5)%16):(p=x^(b|~R),w=7*T%16),h=R,R=x,x=b,m=E+p+o[T]+n[f+w],v=t[T],b+=m<<v|m>>>32-v,E=h;u=u+E|0,l=l+b|0,s=s+x|0,d=d+R|0}return r(u)+r(l)+r(s)+r(d)}}(),e.Bat=n}.call(this),function(){"use strict";var e=this,n=e.Bat||{};n.Timer=function(){var e,n;return{start:function(t){e=this,e.enabled=!0,e.enabled&&(e.timerID=setInterval(n,1e3*t))},tick:function(e){n=e},stop:function(){e.enabled=!1,clearInterval(e.timerID)}}},e.Bat=n}.call(this),function(){"use strict";var e=this,n=e.Bat||{};n.scroll=function(){var e=30,n=null,t=window,o=function(){clearTimeout(n),e=30},r=function(e){var n=e,t=0;do t+=n.offsetTop,n=n.offsetParent;while(n);return t},i=function(){var e;return e=t!==window?t.scrollTop:window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop},a=function(){var e;return e=t!==window?t.scrollTop+t.clientHeight:(window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop)+window.innerHeight},c=function(){var e,n=document.body,o=document.documentElement;return e=t!==window?t.scrollHeight:Math.max(n.scrollHeight,n.offsetHeight,o.clientHeight,o.scrollHeight,o.offsetHeight)},u=function(a){o();var l,s,d,f,g,p,w,h;return d=i(),f=c(),l=a?document.getElementById(a).offsetTop:0,t!==window?f-l<t.clientHeight&&(l=f-t.clientHeight):f-l<window.innerHeight&&(l=f-window.innerHeight),s=a?r(document.getElementById(a).parentNode):0,(null===d||isNaN(d)||"undefined"===d)&&(d=0),g=l-d,g>s&&(p=l-s-d,w=1),s>g&&(p=d+s-l,w=-1),g!==s&&(h=~~(p/4+1)*w,e>1?e-=1:e=0,t!==window?w?t.scrollTop+=h:t.scrollTop-=h:window.scrollBy(0,h),n=window.setTimeout(function(){u(a)},e)),g===s?void o():void 0},l=function(e,n){function o(){[].forEach.call(e,function(e){e.classList.remove(n)})}function a(){for(u=0;u<d.length;u++)if(i()>=d[u]&&i()<d[u+1]&&l!==s[u]){l=s[u],o(),e[u].classList.add(n);var t=new CustomEvent("scrollPosition",{detail:{id:s[u],number:u}});window.dispatchEvent(t)}}var u,l,s=[],d=[];for(n=n?n:"on",u=0;u<e.length;u++)s.push(e[u].dataset.scroll);for(l=s[0],u=0;u<e.length;u++)if(null===document.getElementById(e[u].dataset.scroll))d.push(0);else{var f=t!==window?r(t):0;d.push(r(document.getElementById(e[u].dataset.scroll))-f)}d.push(c()),t.addEventListener("scroll",a),document.body.hasAttributes("unresolved")?document.addEventListener("polymer-ready",a):window.addEventListener("load",a)},s=function(e){function n(){if(a()>=o){var r=new CustomEvent("scrollPassing",{detail:{element:e}});window.dispatchEvent(r),t.removeEventListener("scroll",n)}}var o=0,i=t!==window?r(t):0;o=r(e)+e.clientHeight-i,t.addEventListener("scroll",n),document.body.hasAttributes("unresolved")?document.addEventListener("polymer-ready",n):window.addEventListener("load",n)};return{window:function(e){t=e},to:function(e){return u(e)},top:function(){return u(null)},update:function(e,n){return l(e,n)},below:function(e){return s(e)}}}(),e.Bat=n}.call(this),function(){"use strict";var e=this,n=e.Bat||{};n.url=function(){var e=window.location;return{address:function(){return e.href},path:function(){return e.pathname},subdomain:function(){var n=e.hostname.split(".");return n=n.length>2?n[0]:null},domain:function(){var n=e.hostname.split(".");switch(n.length){case 1:n=e.hostname;break;case 2:n=n[0];break;case 3:n=n[1];break;default:n=n[1]}return n},tld:function(){var n=e.hostname;return n.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))?n.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))[0].replace(new RegExp(/^\./i),""):n.match(new RegExp(/\.[a-z]{2,4}$/i))?n.match(new RegExp(/\.[a-z]{2,4}$/i))[0].replace(new RegExp(/^\./i),""):null},param:function(n,t,o){var r,i=t?t.substring(t.indexOf("?")):e.search,a=i.substring(1).split("&"),o=o?o:!1;for(o&&a.reverse(),r=0;r<a.length;r++){var c=a[r].split("=");if(n===c[0])return c[1]}return null},slugfy:function(e,n){var t=e.toLowerCase();return n=n?n:!1,t=t.replace(new RegExp(/\s/g),"-"),t=t.replace(new RegExp(/[àáâãäå]/g),"a"),t=t.replace(new RegExp(/æ/g),"ae"),t=t.replace(new RegExp(/ç/g),"c"),t=t.replace(new RegExp(/[èéêë]/g),"e"),t=t.replace(new RegExp(/[ìíîï]/g),"i"),t=t.replace(new RegExp(/ñ/g),"n"),t=t.replace(new RegExp(/[òóôõö]/g),"o"),t=t.replace(new RegExp(/œ/g),"oe"),t=t.replace(new RegExp(/[ùúûü]/g),"u"),t=t.replace(new RegExp(/[ýÿ]/g),"y"),n&&(t=t.replace(new RegExp(/\W/g),"")),t},encode:function(e,n){var t;return n=n?n:!0,t=n?encodeURIComponent(e):encodeURI(e)},decode:function(e,n){var t;return n=n?n:!0,t=n?decodeURIComponent(e):decodeURI(e)}}}(),e.Bat=n}.call(this);