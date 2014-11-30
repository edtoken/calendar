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
            //this.app.collections.todos.bind('add', this.addItem, this);

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
            if (item.get('date') === this.options.date
                && item.get('year') === this.options.year
                && item.get('month') == this.options.month
            ) {
                //TODO BAAAAD
                //this.render();
            }
        },

        render: function () {

            var data = this.options.modelData;
            var items = this.app.collections.todos.where({
                date:data.date,
                year:data.year,
                month:data.month
            });

            data.count = items.length;

            if (data.hidden) {
                this.el.className += ' disable';
            }

            if(data.dir){
                this.el.className += ' right';
            }
            //this.el.className += (data.dir)? 'left' : 'right';

            this.el.innerHTML = _.template(dayTpl)(this.options.modelData);
            this.elItems = this.el.querySelectorAll('.itemsNode');
            this.elHiddenItemsWrap = this.el.querySelectorAll('.hiddenItemsNodeWrap');
            this.elAddForm = this.el.querySelectorAll('.todoAddForm');
            this.$elAddForm = $(this.elAddForm);

            for(var i in items){
                var TodoView = new TodoViewClass({model:items[i]});
                this.elItems.appendChild(TodoView.renderTitle().smallEl);
            }

            return this;
        }

    });

    return DayView;
});