/**
 * Created by ed on 28.11.14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/month'
], function ($,
             _,
             Backbone,
             MonthViewClass) {

    var IndexView = Backbone.View.extend({

        el: $('body'),

        initialize: function () {
            this.$el.addClass('preload');
            this.children = {};
            this.children.month = new MonthViewClass({parent: this});
            this.render();
        },

        render: function () {
            this.el.innerHTML = '';
            this.el.appendChild(this.children.month.el);
            return this;
        }
    });

    return IndexView;
});