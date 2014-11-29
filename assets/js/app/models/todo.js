/**
 * Created by ed on 28.11.14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'localstorage'
], function ($,
             _,
             Backbone) {

    var TodoModel = Backbone.Model.extend({
        defaults: {
            year: false,
            month: false,
            date: false,
            state: 1,
            title: '',
            description: ''
        }
    });

    return TodoModel;
});