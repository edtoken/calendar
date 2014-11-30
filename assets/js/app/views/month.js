/**
 * Created by ed on 28.11.14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/day',
    'text!templates/month.html'
], function ($,
             _,
             Backbone,
             DayViewClass,
             monthTpl) {

    var MonthView = Backbone.View.extend({

        tagName: 'div',
        className: 'monthViewWrap',

        events: {
            "click #js_MonthPrev": "getMonthPrev",
            "click #js_MonthNext": "getMonthNext"
        },

        initialize: function () {
            this.model = this.app.models.month;
            this.model.bind('calc:ready', this.render, this);
        },

        getMonthPrev: function () {

            var year = this.model.get('year');
            var month = this.model.get("month");
            if (month <= 0) {
                month = 12;
                year = year - 1;
            }
            this.app.router.navigate('#/' + year + '/' + month);

        },

        getMonthNext: function () {

            var year = this.model.get('year');
            var month = this.model.get("month") + 2;
            if (month > 12) {
                month = 1;
                year = year + 1;
            }
            this.app.router.navigate('#/' + year + '/' + month);
        },

        render: function () {

            var data = {};
            data.monthName = this.model.get('monthName');
            data.year = this.model.get('year');
            var items = this.model.get('items');

            if (this.children) {
                for(var n in this.children){
                    this.children[n].remove();
                }
            }

            this.el.innerHTML = _.template(monthTpl)(data);
            this.children = [];

            for (var n in items) {
                var DayView = new DayViewClass({modelData: items[n]});
                this.el.appendChild(DayView.render().el);
            }

            return this;
        }
    });

    return MonthView;
});