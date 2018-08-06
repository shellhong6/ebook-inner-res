module.exports["HbsTemplates"] = module.exports["HbsTemplates"] || {};
module.exports["HbsTemplates"]["applist"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.app : depth0),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.app : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"2":function(container,depth0,helpers,partials,data) {
    return "<li></li>";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "<li><i class=\"app-logo lazyload\" data-original=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.app : depth0)) != null ? stack1.icon : stack1), depth0))
    + "\"></i><p class=\"text-overflow\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.app : depth0)) != null ? stack1.name : stack1), depth0))
    + "</p><button class=\"install-btn\" data-exposure=\"1\" data-apkname=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.app : depth0)) != null ? stack1.name : stack1), depth0))
    + "\" data-pkgname=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.app : depth0)) != null ? stack1.packageName : stack1), depth0))
    + "\" data-appid=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.app : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" data-version=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.app : depth0)) != null ? stack1.versionCode : stack1), depth0))
    + "\" data-iscpd=\""
    + alias2(((helper = (helper = helpers.iscpd || (depth0 != null ? depth0.iscpd : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"iscpd","hash":{},"data":data}) : helper)))
    + "\" data-pos=\""
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" data-track=\""
    + alias2(((helper = (helper = helpers.trackUrl || (depth0 != null ? depth0.trackUrl : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"trackUrl","hash":{},"data":data}) : helper)))
    + "\" data-track-info='{\"pos\":\""
    + alias2((helpers.inc || (depth0 && depth0.inc) || alias4).call(alias3,(data && data.index),{"name":"inc","hash":{},"data":data}))
    + "\",\"appname\":\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.app : depth0)) != null ? stack1.name : stack1), depth0))
    + "\",\"business_type\":\""
    + alias2(((helper = (helper = helpers.businessType || (depth0 != null ? depth0.businessType : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"businessType","hash":{},"data":data}) : helper)))
    + "\"}'>安装</button></li>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"applist clearfix\">"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.applist : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});
module.exports["HbsTemplates"]["signInTmpl"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"sign-content\"><i class=\"sign-app\" style=\"background-image:url("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.signInApp : depth0)) != null ? stack1.appIcon : stack1), depth0))
    + ")\"></i><span class=\"install-btn signin-tip signin-btn\" data-apkname=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.signInApp : depth0)) != null ? stack1.appName : stack1), depth0))
    + "\" data-pkgname=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.signInApp : depth0)) != null ? stack1.packageName : stack1), depth0))
    + "\" data-appid=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.signInApp : depth0)) != null ? stack1.appId : stack1), depth0))
    + "\" data-version=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.signInApp : depth0)) != null ? stack1.versionCode : stack1), depth0))
    + "\" data-status_text_neverinstallstatus=\"每日打卡任务\" data-status_text_neverupdatestatus=\"每日打卡任务\" data-status_text_installcompletestatus=\"打开领竹子\" data-prefixdownloading=\"下载 \" data-haslotterytxt=\"已完成打卡\" data-exposure=\"1\">每日打卡任务</span></div>";
},"useData":true});
module.exports["HbsTemplates"]["topBtn"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<style type=\"text/css\">"
    + ((stack1 = ((helper = (helper = helpers.customCss || (depth0 != null ? depth0.customCss : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"customCss","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</style>";
},"useData":true});