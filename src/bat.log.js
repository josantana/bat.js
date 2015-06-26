
/*!
 *   @namespace BAT
 *   @element   bat.log
 *   @homepage  batjs.github.io
 *
 *   @status    beta
 *   @version   0.0.1
 *   @author    Jo Santana
 *   @license   Released under the MIT license
 *
 *   @usage:
 *
 *      Bat.log.enable();
 *      Bat.log.disable();
 *
 *      Bat.log.info('Message');
 *      Bat.log.trace('Message');
 *      Bat.log.warn('Message');
 *      Bat.log.error('Message');
 *
 *      Bat.log.group('Group Name');
 *      Bat.log.ungroup();
 *
 *   @dependencies:
 *
 *      Bat.cookie();
 */

 (function()
 {
    'use strict';

    // Declare root variable - window in the browser, global on the server
    // Get already define BAT object (if available) or create a new object

    var root = this,
    Bat  = root.Bat || {};

    /*
     *   BAT log
     */

     Bat.log = (function ()
     {
        /*
         *   Avoid "console" errors in browsers that lack a console.
         */

        var method,

        methods =
        [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'
        ],

        length = methods.length,

        noop = function () {},

        console = (window.console = window.console || {});

        while (length--)
        {
            method = methods[length];

            // Only stub undefined methods.

            if (!console[method]) {
                console[method] = noop;
            }
        }

        /*
         *   Check if logging is enabled
         */

        var enabled = function ()
        {
            if (Bat.keep.get('Bat.log') === 'enabled') {
                return true;
            } else {
                return false;
            }
        };

        return {

            /*
             *   Enable logging
             */

            enable: function () {
                Bat.keep.set('Bat.log', 'enabled', 1);
            },

            /*
             *   Disable logging
             */

            disable: function () {
                Bat.keep.delete('Bat.log');
            },

            /*
             *   Fire info message
             *
             *   @attribute message
             *   @type string
             */

            info: function (message) {
                if (enabled) { console.info(message); }
            },

            /*
             *   Fire trace message
             *
             *   @attribute message
             *   @type string
             */

            trace: function (message) {
                if (enabled) { console.trace(message); }
            },

            /*
             *   Fire warn message
             *
             *   @attribute message
             *   @type string
             */

            warn: function (message) {
                if (enabled) { console.warn(message); }
            },

            /*
             *   Fire error message
             *
             *   @attribute message
             *   @type string
             */

            error: function (message) {
                if (enabled) { console.error(message); }
            },

            /*
             *   Start/end a log group
             *
             *   @attribute name
             *   @type string
             */

            group: function (name) {
                if (enabled && name) { console.group(name); }
            },

            /*
             *   End a log group
             */

            ungroup: function () {
                if (enabled) { console.groupEnd(); }
            }

        };
    })();

    // Return a new element to BAT object

    root.Bat = Bat;

}).call(this);
