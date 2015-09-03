
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
 *
 *      Bat.ajax.getHTML(
 *      {
 *        url:  'http://www.some-website.com/page',
 *        data: { 'number': 123 }
 *      }, function (response) { console.log(response); });
 *
 *      Bat.ajax.post(
 *      {
 *        url:  'http://www.some-rest-api.com/data',
 *        data: { 'number': 123 }
 *      }, function (response) { console.log(response); });
 *
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

        extendOptions = function (options, method, callback)
        {
            options.url = options.url || location.href;
            options.data = options.data ? serializeData(options.data) : null;
            options.beforeSend = options.beforeSend || function() {};

            callback = callback || function() {};
        },

        insertScript = function (options, callback)
        {
            var jsonpCallback = options.callback || ('JSONP_' + new Date().getTime());

            options.url += (options.url.match(/\?/g) ? '&' : '?') + 'callback=' + jsonpCallback;

            window[jsonpCallback] = callback; // Now our callback method is globally visible

            var script = document.createElement('script');
            script.src = options.url;
            document.body.appendChild(script);
        },

        sendData = function (method, options, callback)
        {
            var xhttp = xhr(),
                glue = options.url.match(/\?/g) ? '&' : '?',
                uri = options.data ? (options.url + glue + options.data) : options.url;

            xhttp.open(method, uri, true);

            options.beforeSend(xhttp);

            if (method === 'POST') {
                xhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            }

            xhttp.onreadystatechange = function ()
            {
                if (xhttp.readyState === 4)
                {
                    if (xhttp.status.toString().indexOf(20) === 0) {
                        callback(xhttp.responseText);
                    } else {
                        callback('{' +
                            '"status": "ERROR",' +
                            '"code": "' + xhttp.status.toString() + '",'+
                            '"message": "' + xhttp.statusText.toString() + '" }');
                    }
                }
            };

            xhttp.send(options.data);
        };

        return {

            /*
             *   Function to get a JSON response
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
                sendData ('GET', options, callback);
            },

            /*
             *   Function to get a JSONP response
             */

             getJSONP: function (options, callback)
             {
                extendOptions (options, callback);
                insertScript (options, callback);
                sendData ('GET', options, callback);
            },

            /*
             *   Function to get a HTML response
             *
             *   @attribute options
             *   @type object
             *
             *   @attribute callback
             *   @type function
             */

             getHTML: function (options, callback)
             {
                extendOptions (options, callback);
                sendData ('GET', options, callback);
            },

            /*
             *   Function to post
             *
             *   @attribute options
             *   @type object
             *
             *   @attribute callback
             *   @type function
             */

             post: function (options, callback)
             {
                extendOptions (options, callback);
                sendData ('POST', options, callback);
            },

        };
    })();

    // Return a new element to BAT object

    root.Bat = Bat;

}).call(this);
