/**
 * Created by ed on 27.11.14.
 */

define([
    'underscore'
], function (_) {

    /**
     * CalendarFunctions object
     * @type {{attributes: {weekNames: string[], monthNames: string[]}}}
     */

    var C = {
        attributes: {
            weekNames: ['SUN', 'MON', 'TUES', 'WED', 'THU', 'FRI', 'SAT'],
            monthNames: ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"]
        }
    };

    /**
     * getWeekNameByNum
     * returned week name by number (0-6)
     * @type {function(this:{attributes: {weekNames: string[], monthNames: string[]}})}
     */
    C.getWeekNameByNum = function (num) {
        if (this.attributes.weekNames[num]) {
            return this.attributes.weekNames[num];
        }
        return false;
    }.bind(C);

    /**
     * getMonthNameByNum
     * returned month name by num (0, 11)
     * @type {function(this:{attributes: {weekNames: string[], monthNames: string[]}})}
     */
    C.getMonthNameByNum = function (num) {
        if (this.attributes.monthNames[num]) {
            return this.attributes.monthNames[num];
        }
        return false;
    }.bind(C);

    return C;
});