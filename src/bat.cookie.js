
/*!
 *   @namespace BAT
 *   @element   bat.cookie
 *   @homepage  batjs.github.io
 *
 *   @status    beta
 *   @version   0.0.1
 *   @author    Jo Santana
 *   @license   Released under the MIT license
 *
 *   @usage:
 *
 *      Bat.cookie.set('batman', 'hero', 7);
 *      Bat.cookie.get('batman');    // Returns "hero".
 *      Bat.cookie.delete('batman'); // Goodbye, Bruce.
 */

 (function()
 {
    'use strict';

    // Declare root variable - window in the browser, global on the server
    // Get already define BAT object (if available) or create a new object

    var root = this,
    Bat  = root.Bat || {};

    /*
     *   BAT cookie
     */

     Bat.cookie = (function ()
     {
        return {

            /*
             *   Set a new cookie
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

             set: function (name, value, days, customDomain)
             {
                var expires;
                var domain;

                if (days)
                {
                    var date = new Date();
                    date.setTime(date.getTime()+(days*24*60*60*1000));
                    expires = '; expires=' + date.toUTCString();
                }
                    else
                {
                    expires = '';
                }

                 if (customDomain) domain = ' domain=' + customDomain + ';';
                 document.cookie = name + '=' + value + expires + '; path=/;' + domain;

                if (days !== -1) { Bat.log.info('Cookie: ' + name + ' [CREATED]'); }
            },

            /*
             *   Return the cookie value
             *
             *   @attribute name
             *   @type string
             */

             get: function (name)
             {
                var i, nameEQ = name + "=",
                cookies = document.cookie.split(';');

                for (i = 0; i < cookies.length; i++)
                {
                    var cookie = cookies[i];

                    while (cookie.charAt(0) === ' ')
                    {
                        cookie = cookie.substring(1, cookie.length);
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
                this.set(name, '', -1);

                Bat.log.info('Cookie: ' + name + ' [DELETED]');
            }

        };
    })();

    // Return a new element to BAT object

    root.Bat = Bat;

}).call(this);
