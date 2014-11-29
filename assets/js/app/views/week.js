/**
 * Created by ed on 28.11.14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/day',
    'functions/calendar',
    'text!templates/week.html'
], function ($,
             _,
             Backbone,
             DayViewClass,
             CalendarFunc,
             weekTpl) {
    var WeekView = Backbone.View.extend({

        tagName: "div",
        className: "monthWeekItem",

        initialize: function (options) {
            this.options = options;
            this.children = [];
        },

        render: function () {

            var data = {};
            data.weekName = CalendarFunc.getWeekNameByNum(this.options.week);

            this.el.innerHTML = _.template(weekTpl)(data);

            for (var date in this.options.dates) {
                var DayView = new DayViewClass(this.options.dates[date]);
                this.children.push(DayView);
                this.el.appendChild(DayView.render().el);
            }

            return this;
        }
    });

    return WeekView;
});