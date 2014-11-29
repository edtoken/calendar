/**
 * Created by ed on 28.11.14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/todos',
    'text!templates/day.html'
], function ($,
             _,
             Backbone,
             TodosViewClass,
             dayTpl) {

    var DayView = Backbone.View.extend({

        tagName: "div",
        className: "monthDay",

        events: {
            'click': 'clickEvent'
        },

        initialize: function (options) {
            this.options = options;
            this.children = {};
            this.app.collections.todos.bind('add', this.addItem, this);
        },

        clickEvent: function (e) {
            if (e.target === this.el
                || e.target.className.indexOf('todoSmallItem') >= 0
            ) {
                var itemsNode = this.children.todosList.hiddenItemsNode;
                $('.hiddenItemsNode').not(itemsNode).removeClass('active');
                $(itemsNode).toggleClass('active');
            }
        },

        addItem: function (item) {
            if (item.get('date') === this.options.date
                && item.get('year') === this.options.year
                && item.get('month') == this.options.month
            ) {
                //TODO BAAAAD
                this.render();
            }
        },

        render: function () {

            var data = {};

            data.date = this.options.date;
            data.count = this.options.models.length;

            this.children.todosList = new TodosViewClass({parent: this});

            if (this.options.hidden) {
                this.el.className += ' disable';
            }

            this.el.innerHTML = _.template(dayTpl)(data);
            this.el.appendChild(this.children.todosList.render().el);

            return this;
        }

    });

    return DayView;
});