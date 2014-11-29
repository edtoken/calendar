/**
 * Created by ed on 28.11.14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/todo',
    'views/todoAdd'
], function ($,
             _,
             Backbone,
             TodoViewClass,
             TodoAddClass) {

    var TodosView = Backbone.View.extend({

        tagName: "div",
        className: "dayTodosList",

        initialize: function (options) {
            this.options = {};
            this.parent = options.parent;
            this.options.models = this.app.collections.todos.where({
                date:this.parent.options.date,
                month:this.parent.options.month,
                year:this.parent.options.year
            });
            this.children = {};
            this.children.addform = new TodoAddClass({parent: this});
        },

        render: function () {

            this.el.innerHTML = '';
            this.hiddenItemsNode = document.createElement('ul');
            this.itemsNode = document.createElement('ul');

            this.itemsNode.className = 'itemsNode';
            this.hiddenItemsNode.className = 'hiddenItemsNode';

            _.each(this.options.models, function (model) {

                var TodoView = new TodoViewClass({
                    parent: this,
                    list: this.itemsNode,
                    node: this.hiddenItemsNode,
                    model: model
                });

                this.hiddenItemsNode.appendChild(TodoView.render().el);
                this.itemsNode.appendChild(TodoView.renderTitle().smallEl);
                this.children[TodoView.cid] = TodoView;

            }, this);

            this.hiddenItemsNode.appendChild(this.children.addform.render().el);
            this.el.appendChild(this.itemsNode);
            this.el.appendChild(this.hiddenItemsNode);

            return this;
        }
    });

    return TodosView;
});