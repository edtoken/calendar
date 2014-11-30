/**
 * Created by ed on 28.11.14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/day',
    'views/todo',
    'text!templates/day.html'
], function ($,
             _,
             Backbone,
             DayModelClass,
             TodoViewClass,
             dayTpl) {

    var DayView = Backbone.View.extend({

        tagName: "div",
        className: "monthDay",

        options:{
            ctrl:false
        },

        events: {
            'click': 'clickEvent',
            'submit':'saveNewItem'
        },

        initialize: function (options) {
            var self = this;
            //this.model = new DayModelClass(options.modelData);
            this.options = options;
            this.options.modelData = options.modelData;
            this.children = {};
            this.app.collections.todos.bind('add', this.addItem, this);

            this.$el.keydown(function (e) {

                if (e.ctrlKey) {
                    self.options.ctrl = true;
                }

                if (e.keyCode === 13 && self.options.ctrl) {
                    self.saveNewItem(false);
                }

                self.options.ctrl = false;
            });
        },

        clickEvent: function (e) {
            if (e.target === this.el
                || e.target.className.indexOf('todoSmallItem') >= 0
                || e.target.className.indexOf('itemsNode') >= 0
            ) {
                $('.monthDay').not(this.el).removeClass('show_items');
                this.$el.toggleClass('show_items');
            }
        },

        saveNewItem:function(e){
            if(e){
                e.preventDefault();
            }

            var data = {};
            var dataArray = this.$elAddForm.serializeArray();
            for (var n in dataArray) {
                if (dataArray[n].value === '') {
                    alert('not valid data');
                    return false;
                }
                data[dataArray[n].name] = dataArray[n].value;
            }

            data.date = this.options.modelData.date;
            data.month = this.options.modelData.month;
            data.year = this.options.modelData.year;
            this.app.collections.todos.create(data);
        },

        addItem: function (item) {

            if (item.get('date') === this.options.modelData.date
                && item.get('year') === this.options.modelData.year
                && item.get('month') == this.options.modelData.month
            ) {
                this.render();
            }
        },

        render: function () {

            var items = this.app.collections.todos.where({
                date:this.options.modelData.date,
                year:this.options.modelData.year,
                month:this.options.modelData.month
            });

            this.options.modelData.count = items.length;

            if (this.options.modelData.hidden) {
                this.el.className += ' disable';
            }

            if(this.options.modelData.dir){
                this.el.className += ' right';
            }

            this.el.innerHTML = _.template(dayTpl)(this.options.modelData);
            this.elCounter = this.el.querySelector('.todosCount');
            this.elItems = this.el.querySelector('.itemsNode');
            this.elhiddenItemsNode = this.el.querySelector('.hiddenItemsNode');
            this.elAddForm = this.el.querySelector('.todoAddForm');
            this.$elAddForm = $(this.elAddForm);

            if(this.children){
                for(var n in this.children){
                    this.children[n].remove();
                }
            }

            this.children = [];

            for(var i in items){
                var TodoView = new TodoViewClass({model:items[i], parent:this});
                this.elItems.appendChild(TodoView.renderTitle().smallEl);
                this.elhiddenItemsNode.appendChild(TodoView.render().el);
                this.children.push(TodoView);
            }

            return this;
        }

    });

    return DayView;
});