!function(){function e(e){return"[object Function]"===Object.prototype.toString.call(e)}function o(o,r,t){if(n[o])throw new Error("Module "+o+" has been defined already.");e(r)&&(t=r),n[o]={factory:t,inited:!1,exports:null}}function r(o){var r,a,s,i;if(r=n[o],a={},s={exports:{}},!e(r.factory))throw new Error("Module "+o+" has no factory.");if(i=r.factory.call(void 0,t,a,s),void 0!==i)r.exports=i;else if(s.hasOwnProperty("exports")&&"object"==typeof s.exports&&s.exports instanceof Object==!0){var c,p=!1;for(c in s.exports)s.exports.hasOwnProperty(c)&&(p=!0);p===!1?r.exports=a:r.exports=s.exports}else r.exports=s.exports;r.inited=!0}function t(e){var o;if(o=n[e],!o)throw new Error("Module "+e+" is not defined.");return o.inited===!1&&r(e),o.exports}var n={};o("C:/Users/haoyan/AppData/Roaming/npm/node_modules/mdevp/cache/www/cy-user-avatar/cy-user-avatar.js",function(e,o,r){window.changyan.api.ready(function(e){})}),r("C:/Users/haoyan/AppData/Roaming/npm/node_modules/mdevp/cache/www/cy-user-avatar/cy-user-avatar.js")}();