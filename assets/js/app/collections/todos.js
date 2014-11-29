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
             TodoModel) {

    /**
     * cleaning local storage
     */
    //for(var n in localStorage){
    //    if(n.indexOf('CalendarAppTask') >= 0){
    //        localStorage.removeItem(n);
    //    }
    //}

    var IndexCollection = Backbone.Collection.extend({

        model: TodoModel,
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
            return parseInt(
                todo.get('year').toString()
                + todo.get('month').toString()
                + todo.get('date').toString()
            );
        }

    });

    return IndexCollection;
});