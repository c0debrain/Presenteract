analyticsInit = function() {
  // Mixpanel
  if (mixpanelId = getSetting("mixpanelId")){
    (function (c, a) {
    window.mixpanel = a;
    var b, d, h, e;
    b = c.createElement("script");
    b.type = "text/javascript";
    b.async = !0;
    b.src = ("https:" === c.location.protocol ? "https:" : "http:") + '//cdn.mxpnl.com/libs/mixpanel-2.1.min.js';
    d = c.getElementsByTagName("script")[0];
    d.parentNode.insertBefore(b, d);
    a._i = [];
    a.init = function (b, c, f) {
        function d(a, b) {
            var c = b.split(".");
            2 == c.length && (a = a[c[0]], b = c[1]);
            a[b] = function () {
                a.push([b].concat(Array.prototype.slice.call(arguments, 0)))
            }
        }
        var g = a;
        "undefined" !== typeof f ? g = a[f] = [] : f = "mixpanel";
        g.people = g.people || [];
        h = "disable track track_pageview track_links track_forms register register_once unregister identify name_tag set_config people.identify people.set people.increment".split(" ");
        for (e = 0; e < h.length; e++) d(g, h[e]);
        a._i.push([b, c, f])
    };
    a.__SV = 1.1
    })(document, window.mixpanel || []);
    mixpanel.init(mixpanelId);
  }

  // GoSquared
  if (goSquaredId = getSetting("goSquaredId")) {
    window.GoSquared = {};
    GoSquared.acct = goSquaredId;
    window._gstc_lt = +new Date;
    var d = document, g = d.createElement("script");
    g.type = "text/javascript";
    g.src = "//d1l6p2sc9645hc.cloudfront.net/tracker.js";
    var s = d.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(g, s);
  }

  // Clicky
  if ((clickyId = getSetting("clickyId"))){
    clicky_site_ids = [];
    clicky_site_ids.push(clickyId);
    (function() {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = '//static.getclicky.com/js';
      ( document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0] ).appendChild( s );
    })();
  }

  // Google Analytics
  if ((googleAnalyticsId = getSetting("googleAnalyticsId"))){
    window._gaq = window._gaq || [];
    _gaq.push(['_setAccount', googleAnalyticsId]);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
  }
}



analyticsRequest = function() {

  // Google Analytics
  if ((googleAnalyticsId = getSetting("googleAnalyticsId"))) {
    window._gaq.push(['_trackPageview', window.location.pathname]);
  }

  // Mixpanel
  if(typeof mixpanel !== 'undefined' && typeof mixpanel.people !== 'undefined'){
    if(Meteor.user()){
      var currentUserEmail=getCurrentUserEmail();
      mixpanel.people.identify(currentUserEmail);
      mixpanel.people.set({
          'username': getDisplayName(Meteor.user()),
          '$last_login': new Date(),
          '$created': moment(Meteor.user().createdAt)._d,
          '$email': currentUserEmail
      });
      mixpanel.register({
          'username': getDisplayName(Meteor.user()),
          'createdAt': moment(Meteor.user().createdAt)._d,
          'email': currentUserEmail
      });
      mixpanel.name_tag(currentUserEmail);
    }
  }

  // GoSquared
  if (typeof GoSquared !== 'undefined' && typeof GoSquared.DefaultTracker !== 'undefined') {
    GoSquared.DefaultTracker.TrackView(window.location.pathname, Meteor.Router.page());
  }

  // Clicky
  if(typeof clicky !== 'undefined'){
    clicky.log(encodeURIComponent(window.location.pathname), Meteor.Router.page(), "pageview");
  }

}

Meteor.startup(function() { analyticsInit(); })
