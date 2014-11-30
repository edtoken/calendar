/**
 * Created by ed on 28.11.14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/todo.html'
], function ($,
             _,
             Backbone,
             todoTpl) {

    var TodoView = Backbone.View.extend({

        tagName: 'li',
        className: "todoWrap disable",

        events: {
            "click .title": "clickTitle",
            "click .remove": "clickRemoveTodo"
        },

        initialize: function (options) {

            this.smallEl = document.createElement('li');
            this.smallEl.className = 'todoSmallItem item_' + this.model.cid;
            this.parent = options.parent;

            //this.smallElClick = function(){
            //    //todo need open task
            //    this.$node.toggleClass('active');
            //}.bind(this);

            this.model.bind('change', this.render, this);
        },

        clickTitle: function () {
            this.$el.toggleClass('disable');
        },

        clickRemoveTodo: function () {
            var self = this;
            this.model.destroy({
                wait: true,
                success:function(){
                    self.parent.render();
                }
            })
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
            //this.parent.elCounter.innerHTML.replace(/[0-9]*/, value);
            this.smallEl.removeEventListener('click', this.smallElClick);
            this.smallEl.remove(this.smallEl.selectedIndex);
        }
    });

    return TodoView;
});