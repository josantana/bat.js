
/*!
 *   @namespace BAT
 *   @element   bat.url
 *   @homepage  batjs.github.io
 *
 *   @status    beta
 *   @version   0.0.1
 *   @author    Jo Santana
 *   @license   Released under the MIT license
 *
 *   @usage:
 *
 *      Bat.url.tld(true);
 *      Bat.url.param('heroId');
 *
 *   @test: Use http://www.jsontest.com for testing purposes.
 */

(function()
{
    'use strict';

    // Declare root variable - window in the browser, global on the server
    // Get already define BAT object (if available) or create a new object

    var root = this,
        Bat  = root.Bat || {};

    /*
     *   BAT url
     */

    Bat.url = (function ()
    {
        var _data = window.location,
            _path = _data.pathname;
     
        return {

            /*
             *   Return the TLD domain
             *
             *   @attribute ignoreSubdomain (TRUE if not using "www" or something like it)
             *   @type boolean
             */
     
            tld: function (ignoreSubdomain)
            {
                var response = _data.hostname.split('.');
                if (!ignoreSubdomain) { response.shift(); }
                response.shift();
                response = response.join('.');
             
                return response;
            },

            /*
             *   Return the URL parameters
             *
             *   @attribute name
             *   @type string
             */

            param: function (name)
            {
                var i, params = _data.search.substring(1).split('&');
             
                for (i = 0; i < params.length; i++)
                {
                    var parts = params[i].split('=');
             
                    if (name === parts[0])
                    {
                        return parts[1];
                    }
                }
             
                return null;
            }

        };
    })();

    // Return a new element to BAT object

    root.Bat = Bat;

}).call(this);
