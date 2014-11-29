/**
 * Created by ed on 26.11.14.
 */

define([
    'appdir/app',
    'appdir/router'
], function (App,
             Router) {

    App.defaultOptions = {
        version: "0.0.1",
        debug: true
    };

    if (document.readyState === "complete") {

        App.router = new Router();
        App.initialize();
        Backbone.history.start({pushState: false});

    } else {

        document.addEventListener("DOMContentLoaded", function () {

            window.removeEventListener('load', arguments.callee, false);
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);

            App.router = new Router();
            App.initialize();
            Backbone.history.start({pushState: false});
        });

        window.addEventListener("load", function () {

            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            window.removeEventListener('load', arguments.callee, false);

            App.router = new Router();
            App.initialize();
            Backbone.history.start({pushState: false});

        }, false);
    }
});