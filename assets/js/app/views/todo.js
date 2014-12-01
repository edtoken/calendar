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
        className: "todoWrap",

        events: {
            "click .title": "clickTitle",
            "click .remove": "clickRemoveTodo"
        },

        initialize: function (options) {

            this.smallEl = document.createElement('li');
            this.$smallEl = $(this.smallEl);

            this.smallEl.className = 'todoSmallItem item_' + this.model.cid;
            this.parent = options.parent;

            /**
             * click small title
             */
            this.smallElClick = function(){

                $('.monthDay').not(this.parent.el).removeClass('show_items');


                if(this.parent.el.className.indexOf('show_items') < 0){
                    var top = (this.parent.elHiddenItemsWrap.offsetHeight - this.parent.el.offsetHeight) / 2;
                    this.parent.elHiddenItemsWrap.style.top = top + 'px';
                }

                this.parent.$el.addClass('show_items');
                this.$el.toggleClass('active');
                this.$smallEl.toggleClass('active');

            }.bind(this);

            this.model.bind('change', this.render, this);
            this.smallEl.addEventListener('click', this.smallElClick);
        },

        clickTitle: function () {
            this.$el.toggleClass('active');
        },

        clickRemoveTodo: function () {
            var self = this;
            this.model.destroy({
                wait: true,
                success: function () {
                    self.parent.render();
                }
            })
        },

        renderTitle: function () {

            var title = this.model.escape('title').substr(0, 8).trim();
            if(title.length >= 6){
                title += '...';
            }

            this.smallEl.innerHTML = title;
            return this;
        },

        render: function () {

            var data = this.model.toJSON();
            if(data.title.length >= 15){
                data.title += '...';
            }

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