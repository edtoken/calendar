/**
 * Created by ed on 29.11.14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/todosfullwrap.html'
], function ($,
             _,
             Backbone,
             formTpl) {

    var TodoAddView = Backbone.View.extend({

        options: {
            ctrl: false
        },

        tagName: "form",
        className: "todoAddForm",

        initialize: function (options) {

            var self = this;
            this.parent = options.parent;

            this.$el.keydown(function (e) {

                if (e.ctrlKey) {
                    self.options.ctrl = true;
                }

                if (e.keyCode === 13 && self.options.ctrl) {
                    self.saveItem();
                }

                self.options.ctrl = false;
            });
        },

        saveItem: function () {

            var data = {};
            var dataArray = this.$el.serializeArray();
            for (var n in dataArray) {
                if (dataArray[n].value === '') {
                    alert('not valid data');
                    break;
                }
                data[dataArray[n].name] = dataArray[n].value;
            }

            data.date = this.parent.parent.options.date;
            data.month = this.parent.parent.options.month;
            data.year = this.parent.parent.options.year;

            this.app.collections.todos.create(data);

        },

        render: function () {
            this.el.innerHTML = formTpl;
            return this;
        }
    });

    return TodoAddView;
});