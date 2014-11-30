/**
 * Created by ed on 28.11.14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'functions/calendar',
    'localstorage'
], function ($,
             _,
             Backbone,
             CalendarFunc) {

    var MonthModel = Backbone.Model.extend({

        defaults: {
            date: false,
            daysArr: [],
            daysCount: 0,
            monthName: '',
            firstDay: 0
        },

        initialize: function () {
            this.bind('change:date', this.calcData, this);
        },

        calcData: function () {

            var self = this;
            var data = {};
            data.items = [];
            data.currentItems = [];
            data.prevItems = [];
            data.nextItems = [];

            data.daysCount = 33 - new Date(this.get('year'), this.get('month'), 33).getDate();
            data.monthName = CalendarFunc.getMonthNameByNum(this.get('month'));
            data.firstDay = this.get('date').getDay();

            if (data.firstDay !== 0) {

                var prevMonthDaysCount = 33 - new Date(
                        this.get('year'),
                        this.get('month') - 1, 33).getDate();

                var prevStartDate = prevMonthDaysCount - data.firstDay + 1;

                var dataObjPrev = {};
                dataObjPrev.month = (this.get('month') === 0) ? 11 : this.get('month') - 1;
                dataObjPrev.year = (this.get('month') === 0) ? this.get('year') - 1: this.get('year');

                for (var pi = prevStartDate; pi <= prevMonthDaysCount; pi++) {

                    data.prevItems.push({
                        hidden: true,
                        date: pi,
                        month: dataObjPrev.month,
                        year: dataObjPrev.year
                    });

                }
            }

            for (var i = 1; i <= data.daysCount; i++) {

                data.currentItems.push({
                    date: i,
                    month: this.get('month'),
                    year: this.get('year')
                });
            }

            var nextMonthDaysCount = (7 * Math.ceil((data.prevItems.length + data.currentItems.length) / 7)) - (data.prevItems.length + data.currentItems.length);
            if (nextMonthDaysCount > 0) {

                var dataObjNext = {};
                dataObjNext.month = (this.get('month') === 11) ? 0 : this.get('month') + 1;
                dataObjNext.year = (this.get('month') === 11) ? this.get('year') + 1 : this.get('year');

                for (var ni = 1; ni <= nextMonthDaysCount; ni++) {

                    data.nextItems.push({
                        hidden: true,
                        date: ni,
                        month: dataObjNext.month,
                        year: dataObjNext.year
                    });
                }

            }

            data.currentItems.sort(function(a, b){
                if(a.date < b.date){
                    return -1;
                }
                return 1;
            });

            data.prevItems.sort(function(a, b){
                if(a.date < b.date){
                    return -1;
                }
                return 1;
            });

            data.nextItems.sort(function(a, b){
                if(a.date < b.date){
                    return -1;
                }
                return 1;
            });

            data.items = data.items.concat(data.prevItems, data.currentItems, data.nextItems);

            //TODO calc week
            data.items = data.items.map(function(item, i){
                var week = new Date(item.year, item.month, item.date).getDay();
                item.dir = (week < 3) ? 0 : 1;
                return item;
            });

            this.set(data);
            this.trigger('calc:ready');
        }
    });

    return MonthModel;
});