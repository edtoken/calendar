/**
 * Created by ed on 28.11.14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/todo',
    'text!templates/todo.html'
], function ($,
             _,
             Backbone,
             TodoModelClass,
             todoTpl) {

    var TodoView = Backbone.View.extend({

        tagName: 'li',
        className: "todoWrap disable",

        events: {
            "click .title": "clickTitle",
            "click .remove": "clickRemoveTodo"
        },

        initialize: function (options) {

            this.model = new TodoModelClass(options.modelData);
            console.log('a', options);
            this.smallEl = document.createElement('li');
            this.smallEl.className = 'todoSmallItem item_' + this.model.cid;

            this.list = options.list;
            this.node = options.node;
            //this.$node = $(this.node);
            this.parent = options.parent;

            //this.smallElClick = function(){
            //    //todo need open task
            //    this.$node.toggleClass('active');
            //}.bind(this);

            //this.smallEl.addEventListener('click', this.smallElClick);
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.removeCustom, this);
            this.model.bind('destroy', this.remove, this);
        },

        clickTitle: function () {
            this.$el.toggleClass('disable');
        },

        clickRemoveTodo: function () {
            this.model.destroy();
        },

        renderTitle: function () {
            this.smallEl.innerHTML = this.model.get('title');
            return this;
        },

        render: function () {
            var data = this.model.toJSON();
            this.el.innerHTML = _.template(todoTpl)(data);
            return this;
        },

        removeCustom: function () {
            this.smallEl.removeEventListener('click', this.smallElClick);
            this.smallEl.remove(this.smallEl.selectedIndex);
        }
    });

    return TodoView;
});