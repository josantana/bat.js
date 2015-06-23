
/*!
 *   @namespace BAT
 *   @element   bat.keep
 *   @homepage  batjs.github.io
 *
 *   @status    beta
 *   @version   0.0.1
 *   @author    Jo Santana
 *   @license   Released under the MIT license
 *
 *   @usage:
 *
 *      Bat.keep.set('batman', 'hero', 7);
 *      Bat.keep.get('batman');    // Returns "hero".
 *      Bat.keep.delete('batman'); // Goodbye, Bruce.
 */

 (function()
 {
    'use strict';

    // Declare root variable - window in the browser, global on the server
    // Get already define BAT object (if available) or create a new object

    var root = this,
    Bat  = root.Bat || {};

    /*
     *   BAT keep
     */

    Bat.keep = (function ()
    {
        return {

            /*
             *   Return the supported storage type
             *
             *   @attribute remaining
             *   @type object
             */

            storageType: function ()
            {
                return ('localStorage' in window && window.localStorage !== null) ? 'localStorage' : 'cookie';
            },

            /*
             *   Return string in timestamp format
             *
             *   @attribute remaining
             *   @type object
             */

            timestamper: function (days, format) {

                days = (typeof days !== 'undefined') ? days : 0;
                format = (typeof format !== 'undefined') ? format : false;

                var date = new Date(),
                    milliseconds = (24 * 60 * 60 * 1000);

                date.setTime(date.getTime() + (days * milliseconds));

                if (format) { date.toUTCString(); }

                return date;
            },

            /*
             *   Remaining time till data expires
             *
             *   @attribute remaining
             *   @type object
             */

            remaining: {
                days: 0,
                hours: 0
            },

            /*
             *   Set a new data to be kept
             *
             *   @attribute name
             *   @type string
             *
             *   @attribute value
             *   @type string/number
             *
             *   @attribute days
             *   @type int
             */

            set: function (name, value, days)
            {
                if (value) {
                    this[this.storageType()].set(name, value, days);
                    console.log('BAT keep: ' + name + ' [CREATED with '+ this.storageType() +']');
                } else {
                    console.log('BAT keep: Can\'t store empty data');
                    return false;
                }
            },

            /*
             *   Return the data value
             *
             *   @attribute name
             *   @type string
             */

            get: function (name)
            {
                var data = this[this.storageType()].get(name);

                if (data) {

                    // console.log(this.remaining);
                    var logMessage = 'BAT keep: "' + name + '" will expire in ';
                    logMessage += (this.remaining.days > 0) ? [this.remaining.days, ' day'].join('') : '';
                    logMessage += (this.remaining.days > 1) ? 's' : '';
                    logMessage += (this.remaining.days > 0 && this.remaining.hours > 0) ? ' and ' : '';
                    logMessage += (this.remaining.days === 0 && this.remaining.hours > 0) ? [this.remaining.hours, ' hours'].join('') : 'few minutes';
                    logMessage += ' from ' + this.storageType();
                    console.log(logMessage);

                    return data;

                } else {
                    return null;
                }
            },

            /*
             *   Delete data
             *
             *   @attribute name
             *   @type string
             */

            delete: function (name)
            {
                this[this.storageType()].delete(name);
                console.log('BAT keep: ' + name + ' [DELETED from '+ this.storageType() +']');
            },

            cookie: {

                /*
                 *   Set a new data to be kept
                 *
                 *   @attribute name
                 *   @type string
                 *
                 *   @attribute value
                 *   @type string/number
                 *
                 *   @attribute days
                 *   @type int
                 */

                set: function (name, value, days)
                {
                    var expires;

                    if (days) {
                        expires = '; expires=' + Bat.keep.timestamper(days, true);
                    } else {
                        expires = '';
                    }

                    document.cookie = name + '-expires=' + Bat.keep.timestamper(days, true) + '; path=/';
                    document.cookie = name + '=' + value + expires + '; path=/';
                },

                /*
                 *   Return the cookie value
                 *
                 *   @attribute name
                 *   @type string
                 */

                get: function (name)
                {
                    var i,
                        nameXP = name + "-expires=",
                        nameEQ = name + "=",
                        cookies = document.cookie.split(';');

                    for (i = 0; i < cookies.length; i++)
                    {
                        var cookie = cookies[i];

                        while (cookie.charAt(0) === ' ')
                        {
                            cookie = cookie.substring(1, cookie.length);
                        }

                        if (cookie.indexOf(nameXP) === 0)
                        {
                            var difference = new Date(cookie.substring(nameXP.length, cookie.length) - Bat.keep.timestamper());
                            Bat.keep.remaining.days = difference.getUTCDate() - 1;
                            Bat.keep.remaining.hours = difference.getUTCHours();
                        }

                        if (cookie.indexOf(nameEQ) === 0)
                        {
                            return cookie.substring(nameEQ.length, cookie.length);
                        }
                    }

                    return null;
                },

                /*
                 *   Detele a cookie
                 *
                 *   @attribute name
                 *   @type string
                 */

                delete: function (name)
                {
                    this.set(name + '-expires', '', -1);
                    this.set(name, '', -1);
                }
            },

            localStorage: {

                /*
                 *   Set a new data on localStorage
                 *
                 *   @attribute name
                 *   @type string
                 *
                 *   @attribute value
                 *   @type string/number
                 *
                 *   @attribute days
                 *   @type int
                 */

                set: function (name, value, days)
                {
                    window.localStorage.setItem(name, JSON.stringify({
                        'value': value,
                        'timestamp': Bat.keep.timestamper(days)
                    }));
                },

                /*
                 *   Return localStorage value
                 *
                 *   @attribute name
                 *   @type string
                 */

                get: function (name)
                {
                    var data = window.localStorage.getItem(name);

                    if (data) {

                        data = JSON.parse(data);

                        var now = new Date(Bat.keep.timestamper()),
                            exp = new Date(data.timestamp);

                        if (now < exp) {

                            var difference = new Date(Math.abs(now.getTime() - exp.getTime()));
                            Bat.keep.remaining.days = difference.getUTCDate() - 1;
                            Bat.keep.remaining.hours = difference.getUTCHours();

                        // console.log('-------');
                        // console.log('localStorage get');
                        // console.log(data);
                        // console.log(now);
                        // console.log(exp);
                        // console.log(difference);
                        // console.log(Bat.keep.remaining);
                        // console.log('-------');

                            return data.value;

                        } else {
                            this.delete(name);
                            return null;
                        }

                    } else {
                        return null;
                    }
                },

                /*
                 *   Detele localStorage data
                 *
                 *   @attribute name
                 *   @type string
                 */

                delete: function (name)
                {
                    window.localStorage.removeItem(name);
                }
            }
        };
    })();

    // Return a new element to BAT object

    root.Bat = Bat;

}).call(this);
