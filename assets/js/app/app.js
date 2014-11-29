define([
    'jquery',
    'underscore',
    'backbone',
    'collections/todos',
    'models/month',
    'views/index',
    'localstorage'
], function ($,
             _,
             Backbone,
             TodosCollectionClass,
             MonthModelClass,
             IndexViewClass) {

    //Backbone.Collection.prototype.sync = BackboneLocalStorage.sync;

    /**
     * Backbone.View extend
     * recursively remove child views (nodes and events) if parent view remove
     * @type {Function|Backbone.View.remove}
     */
    var DefaultRemove = Backbone.View.prototype.remove;
    Backbone.View.prototype.remove = function () {
        if (this.children) {
            for (var n in this.children) {
                if (this.children[n].remove) {
                    this.children[n].remove();
                }
            }
        }
        return DefaultRemove.call(this, arguments);
    };


    /**
     * Parent App Object
     *
     * @type {
     * {attributes: {debug: boolean},
     * defaultOptions: {},
     * router: boolean,
     * collections: {},
     * models: {},
     * views: {}
     * }}
     */
    var App = {
        attributes: {
            debug: false
        },
        defaultOptions: {},
        router: false,
        collections: {},
        models: {},
        views: {}
    };

    /**
     * App log functions
     * print to console errors or messages
     * @param data
     */
    App.log = function (data) {
        if (App.attributes.debug) {
            console.info('[app log]', data);
        }
    };

    App.initialize = function () {

        App.attributes = _.extend(App.attributes, App.defaultOptions);

        Backbone.Router.prototype.app = App;
        Backbone.View.prototype.app = App;
        Backbone.Model.prototype.app = App;
        Backbone.Collection.prototype.app = App;

        App.collections.todos = new TodosCollectionClass();
        App.models.month = new MonthModelClass();
        App.views.index = new IndexViewClass();

        App.log({msg: 'App init', data: App, level: 1});
    };

    return App;
});