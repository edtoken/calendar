define([
    'jquery',
    'underscore',
    'backbone'
], function ($,
             _,
             Backbone) {

    /**
     * App router
     */
    var Router = Backbone.Router.extend({

        routes: {
            '': 'index',
            ':year/:month(/)': 'openMonth',
            '*path': 'defaultAction'
        },

        index: function () {

            var date = new Date();
            var url = '#/' + date.getFullYear().toString() + '/';
            url += date.getMonth() + 1;

            this.navigate(url);

        },

        openMonth: function (year, month) {

            if (year.toString().length !== 4
                || !parseInt(year)
                || !parseInt(month)
                || (parseInt(month) < 1 || parseInt(month) > 12)
            ) {
                alert('incorrect data, show console');
                throw "incorrect data year:" + year + ' month:' + month;
            }

            var openDate = new Date(year, month - 1, 1);

            if (isNaN(Date.parse(openDate))) {
                alert('incorrect data, show console');
                throw "incorrect data year:" + year + ' month:' + month;
            }

            this.app.models.month.clear({silent: true});
            this.app.models.month.set({
                date: openDate,
                year: openDate.getFullYear(),
                month: openDate.getMonth()
            });
        },

        defaultAction: function () {
            alert('incorrect route');
            throw "incorrect route";
        }
    });

    return Router;
});