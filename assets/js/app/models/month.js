/**
 * Created by ed on 28.11.14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'functions/calendar'
], function ($,
             _,
             Backbone,
             CalendarFunc) {

    var MonthModel = Backbone.Model.extend({

        defaults: {
            date: false,
            groupItems: {},
            items: [],
            daysArr: [],
            prevItems: [],
            nextItems: [],
            daysCount: 0,
            monthName: '',
            firstDay: 0
        },

        initialize: function () {
            this.bind('change:date', this.calcData, this);
        },

        calcData: function () {

            var data = {};
            data.groupItems = {};
            data.daysArr = [];
            data.prevItems = [];
            data.nextItems = [];

            data.daysCount = 33 - new Date(this.get('year'), this.get('month'), 33).getDate();

            data.monthName = CalendarFunc.getMonthNameByNum(this.get('month'));
            data.firstDay = this.get('date').getDay();
            data.items = this.app.collections.todos.where({
                year: this.get('year'),
                month: this.get('month')
            });

            if (data.firstDay !== 0) {

                var prevMonthDaysCount = 33 - new Date(
                        this.get('year'),
                        this.get('month') - 1, 33).getDate();

                var prevStartDate = prevMonthDaysCount - data.firstDay + 1;

                var dataObjPrev = {};
                dataObjPrev.month = (this.get('month') === 0) ? 11 : this.get('month') - 1;
                dataObjPrev.year = (this.get('month') === 0) ? this.get('year') - 1: this.get('year');

                data.prevItems = this.app.collections.todos.where({
                    year: dataObjPrev.year,
                    month: dataObjPrev.month
                }).filter(function (item) {
                    if (item.get('date') >= prevStartDate) {
                        return true;
                    }
                });

                for (var pi = prevStartDate; pi <= prevMonthDaysCount; pi++) {

                    var dayTodosArr = data.prevItems.filter(function (item) {
                        return item.get('date') === pi;
                    });

                    data.daysArr.push({
                        hidden: true,
                        date: pi,
                        models: dayTodosArr,
                        month: dataObjPrev.month,
                        year: dataObjPrev.year
                    });

                }
            }

            for (var i = 1; i <= data.daysCount; i++) {

                var dayTodosArr = data.items.filter(function (item) {
                    return item.get('date') === i;
                });

                data.daysArr.push({
                    date: i,
                    models: dayTodosArr,
                    month: this.get('month'),
                    year: this.get('year')
                });
            }

            var nextMonthDaysCount = (7 * Math.ceil(data.daysArr.length / 7)) - data.daysArr.length;
            if (nextMonthDaysCount > 0) {

                var dataObjNext = {};
                dataObjNext.month = (this.get('month') === 11) ? 0 : this.get('month') + 1;
                dataObjNext.year = (this.get('month') === 11) ? this.get('year') + 1 : this.get('year');

                data.nextItems = this.app.collections.todos.where({
                    year: dataObjNext.year,
                    month: dataObjNext.month
                }).filter(function (item) {
                    if (item.get('date') <= nextMonthDaysCount) {
                        return true;
                    }
                });

                for (var ni = 1; ni <= nextMonthDaysCount; ni++) {
                    var dayTodosArr = data.nextItems.filter(function (item) {
                        return item.get('date') === ni;
                    });
                    data.daysArr.push({
                        hidden: true,
                        date: ni,
                        models: dayTodosArr,
                        month: dataObjNext.month,
                        year: dataObjNext.year
                    });
                }

            }

            data.groupItems = _.groupBy(data.daysArr, function (item) {
                return new Date(item.year, item.month, item.date).getDay();
            }, this);

            this.set(data);
            this.trigger('calc:ready');
        }
    });

    return MonthModel;
});