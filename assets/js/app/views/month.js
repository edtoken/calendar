/**
 * Created by ed on 28.11.14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/week',
    'text!templates/month.html'
], function ($,
             _,
             Backbone,
             WeekViewClass,
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
            var groupItems = this.model.get('groupItems');

            if (this.children) {
                this.children.forEach(function (item) {
                    item.remove();
                });
            }

            this.el.innerHTML = _.template(monthTpl)(data);
            this.children = [];

            for (var week in groupItems) {

                var WeekView = new WeekViewClass({dates: groupItems[week], week: week});
                this.children.push(WeekView);
                this.el.appendChild(WeekView.render().el);

            }

            return this;
        }
    });

    return MonthView;
});