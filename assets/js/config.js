/**
 * Created by ed on 26.11.14.
 */
define(
    'config',
    [], function () {

        return {

            "paths": {
                "jquery": "libs/jquery-1.11.1",
                "underscore": "libs/underscore",
                "backbone": "libs/backbone",
                "localstorage":"libs/localstorage",
                "text": "libs/text",
                "appdir": "app",
                "collections": "app/collections",
                "models": "app/models",
                "views": "app/views",
                "plugins": "plugins",
                "functions": "functions",
                "templates": "../templates"
            },

            "shim": {
                "underscore": {
                    "deps": ['jquery'],
                    "exports": '_'
                },
                "backbone": {
                    "deps": ["jquery", "underscore"],
                    "exports": "Backbone"
                },
                "localstorage": {
                    "deps": ["jquery", "underscore", "backbone"],
                    "exports": "Backbone"
                },
                "plugins": {
                    "deps": ["jquery"]
                },
                "functions": {
                    "deps": ["jquery"]
                }
            },

            "waitSeconds": 200
        };

    });