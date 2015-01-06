
/*!
 *   @namespace BAT
 *   @element   bat.ajax
 *   @homepage  batjs.github.io
 *
 *   @status    beta
 *   @version   0.0.2
 *   @author    Jo Santana
 *   @license   Released under the MIT license
 *
 *   @usage:
 *
 *      Bat.ajax.getJSON(
 *      {
 *        url:  'http://www.some-rest-api.com/data',
 *        data: { 'number': 123 }
 *      }, function (response) { console.log(response); });
 *
 *      Bat.ajax.getJSONP(
 *      {
 *        url:  'http://www.some-rest-api.com/data',
 *        callback: 'jsonpResponse',
 *        beforeSend: function (request)
 *        {
 *          request.setRequestHeader('key', 'value');
 *        }
 *      }, function (response) { console.log(response); });
*/

(function()
{
    'use strict';

    // Declare root variable - window in the browser, global on the server
    // Get already define BAT object (if available) or create a new object

    var root = this,
    Bat  = root.Bat || {};

    /*
     *   BAT ajax
     */

     Bat.ajax = (function ()
     {
        var xhr = function ()
        {
            var instance = new XMLHttpRequest();
            return instance;
        },

        serializeData = function (obj)
        {
            var data = '';

            for (var key in obj) {
                data += key + '=' + encodeURIComponent(obj[key]) + '&';
            }

            data = data.slice(0,-1);

            return data;
        },

        extendOptions = function (options, callback)
        {
            options.url = options.url || location.href;
            options.data = options.data ? serializeData(options.data) : null;
            options.beforeSend = options.beforeSend || function() {};

            callback = callback || function() {};
        },

        insertScript = function (options, callback)
        {
            var jsonpCallback = options.callback || ('JSONP_' + new Date().getTime());

            options.url += ((options.url.indexOf('?') === -1) ? '?' : '&') + 'callback=' + jsonpCallback;

            window[jsonpCallback] = callback; // Now our callback method is globally visible

            var script = document.createElement('script');
            script.src = options.url;
            document.body.appendChild(script);
        },

        sendData = function (options, callback)
        {
            var xhttp = xhr(),
                uri = options.data ? (options.url + '?' + options.data) : options.url;

            xhttp.open('GET', uri, true);

            options.beforeSend(xhttp);

            xhttp.onreadystatechange = function ()
            {
                if (xhttp.status === 200 && xhttp.readyState === 4)
                {
                    callback(xhttp.responseText);
                }
            };

            xhttp.send(options.data);
        };

        return {

            /*
             *   Function to get a JSON response from ajax call
             *
             *   @attribute options
             *   @type object
             *
             *   @attribute callback
             *   @type function
             */

             getJSON: function (options, callback)
             {
                extendOptions (options, callback);
                sendData (options, callback);
            },

            /*
             *   Function to get a JSONP response from ajax call
             */

             getJSONP: function (options, callback)
             {
                extendOptions (options, callback);
                insertScript (options, callback);
                sendData (options, callback);
            }

        };
    })();

    // Return a new element to BAT object

    root.Bat = Bat;

}).call(this);
