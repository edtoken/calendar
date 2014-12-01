/**
 * Created by ed on 28.11.14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/todo',
    'text!templates/day.html'
], function ($,
             _,
             Backbone,
             TodoViewClass,
             dayTpl) {

    var DayView = Backbone.View.extend({

        tagName: "div",
        className: "monthDay",

        options: {
            ctrl: false
        },

        events: {
            'click': 'clickEvent',
            'submit': 'saveNewItem'
        },

        initialize: function (options) {

            var self = this;
            this.options = options;
            this.options.modelData = options.modelData;
            this.children = {};

            this.$el.keydown(function (e) {
                if (e.ctrlKey) {
                    self.options.ctrl = true;
                }
                if (e.keyCode === 13 && self.options.ctrl) {
                    self.saveNewItem(false);
                }
                self.options.ctrl = false;
            });

            this.app.collections.todos.bind('add', this.addItem, this);
        },

        clickEvent: function (e) {

            if (e.target === this.el
                || e.target.className.indexOf('itemsNode') >= 0
            ) {

                $('.monthDay').not(this.el).removeClass('show_items');
                this.$el.toggleClass('show_items');

                var top = (this.elHiddenItemsWrap.offsetHeight - this.el.offsetHeight) / 2;
                this.elHiddenItemsWrap.style.top = -top + 'px';
            }
        },

        saveNewItem: function (e) {

            if (e) {
                e.preventDefault();
            }

            var data = {};
            data.description = this.el.querySelector('textarea').value;
            if(!data.description || !data.description.split(' ').join('')){
                alert('incorrect data');
                return false;
            }

            data.date = this.options.modelData.date;
            data.month = this.options.modelData.month;
            data.year = this.options.modelData.year;

            data.title = data.description.substr(0,8).trim();

            if(data.title.length >= 6){
                data.title += '...';
            }

            this.app.collections.todos.create(data);
        },

        addItem: function (item) {

            if (item.get('date') === this.options.modelData.date
                && item.get('year') === this.options.modelData.year
                && item.get('month') === this.options.modelData.month
            ) {
                this.render();
            }
        },

        render: function () {

            var items = this.app.collections.todos.where({
                date: this.options.modelData.date,
                year: this.options.modelData.year,
                month: this.options.modelData.month
            });

            this.options.modelData.count = items.length;

            if (this.options.modelData.hidden) {
                this.$el.addClass('disable');
            }

            if (this.options.modelData.dir) {
                this.$el.addClass('right');
            }

            this.el.innerHTML = _.template(dayTpl)(this.options.modelData);
            this.elItems = this.el.querySelector('.itemsNode');
            this.elHiddenItemsWrap = this.el.querySelector('.hiddenItemsNodeWrap');
            this.elhiddenItemsNode = this.el.querySelector('.hiddenItemsNode');
            this.elAddForm = this.el.querySelector('.todoAddForm');
            this.$elAddForm = $(this.elAddForm);

            if (this.children) {
                for(var n in this.children){
                    this.children[n].remove();
                }
            }

            this.children = [];

            for (var i=0;i<items.length;i++) {
                var TodoView = new TodoViewClass({model: items[i], parent: this});
                if(i < 3){
                    this.elItems.appendChild(TodoView.renderTitle().smallEl);
                }
                this.elhiddenItemsNode.appendChild(TodoView.render().el);
                this.children.push(TodoView);
            }

            var top = (this.elHiddenItemsWrap.offsetHeight - this.el.offsetHeight) / 2;
            this.elHiddenItemsWrap.style.top = -top + 'px';

            return this;
        }

    });

    return DayView;
});