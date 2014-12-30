
/*!
 *   @namespace BAT
 *   @element   bat.timer
 *   @homepage  batjs.github.io
 *
 *   @status    beta
 *   @version   0.0.1
 *   @author    Jo Santana
 *   @license   Released under the MIT license
 *
 *   @usage:
 *
 *      var clock = new Bat.Timer;
 *      clock.tick(tackFunction); // Callback function
 *      clock.start(5); // Seconds
 *      clock.stop();
 */

 (function()
 {
    'use strict';

    // Declare root variable - window in the browser, global on the server
    // Get already define BAT object (if available) or create a new object

    var root = this,
    Bat  = root.Bat || {};

    /*
     *   BAT timer
     */

     Bat.Timer = function ()
     {
        var instance, // Hold an instance of this class
            tack;     // Timer tick event

        return {

            /*
             *   Start a new timer
             */

             start: function (seconds)
             {
                instance = this;
                instance.enabled = true;

                if (instance.enabled)
                {
                    instance.timerID = setInterval( tack, (seconds * 1000));
                }
            },

            /*
             *   Sets the Tick function event
             *
             *   @attribute callback
             *   @type function
             */

             tick: function (callback)
             {
                tack = callback;
            },

            /*
             *   Stops the timer
             */

             stop: function ()
             {
                instance.enabled = false;
                clearInterval(instance.timerID);
            }
        };
    };

    // Return a new element to BAT object

    root.Bat = Bat;

}).call(this);
