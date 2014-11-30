/**
 * Created by ed on 28.11.14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/todo',
    'localstorage'
], function ($,
             _,
             Backbone,
             TodoModelClass) {

    /**
     * cleaning local storage
     */
    //for(var n in localStorage){
    //    if(n.indexOf('CalendarAppTask') >= 0){
    //        localStorage.removeItem(n);
    //    }
    //}

    var IndexCollection = Backbone.Collection.extend({

        model: TodoModelClass,
        localStorage: new Backbone.LocalStorage('CalendarAppTask'),

        initialize: function () {

            this.fetch({reset: true});
            /**
             * add test default item
             */
            //var d = {};
            //d.title = "test title item: #" + this.length;
            //d.description = 'test descr';
            //d.month = 10;
            //d.year = 2014;
            //d.date = 12;
            //d.state = 1;
            //this.add(d);
            //console.log('save', d, this.at(this.length -1).save());

        },

        comparator: function (todo) {

            var date = '';
            var month = todo.get('month').toString();
            var day= todo.get('date').toString();

            date += todo.get('year').toString();
            date += (month.length === 1)? '0' + month : month;
            date += (day.length === 1)? '0' + day : day;

            return parseInt(date);
        }

    });

    return IndexCollection;
});