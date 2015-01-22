
/*!
 *   @namespace BAT
 *   @element   bat.url
 *   @homepage  batjs.github.io
 *
 *   @status    beta
 *   @version   0.0.2
 *   @author    Jo Santana
 *   @license   Released under the MIT license
 *
 *   @usage:
 *
 *      Bat.url.address();
 *      Bat.url.path();
 *      Bat.url.subdomain();
 *      Bat.url.domain();
 *      Bat.url.tld();
 *      Bat.url.param('heroId');
 *      Bat.url.slugfy('New URL Link');
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
        var data = window.location;

        return {

            /*
             *   Return the entire address
             */

             address: function ()
             {
                return data.href;
            },

            /*
             *   Return the path (everything after the domain)
             */

             path: function ()
             {
                return data.pathname;
            },

            /*
             *   Return the subdomain
             */

             subdomain: function ()
             {
                var response = data.hostname.split('.');

                if (response.length > 2)
                {
                    response = response[0];
                }
                else
                {
                    response = null;
                }

                return response;
            },

            /*
             *   Return the domain
             */

             domain: function ()
             {
                var response = data.hostname.split('.');

                switch (response.length)
                {
                    case 1:
                        response = data.hostname; // localhost (?)
                        break;

                        case 2:
                        response = response[0]; // domain.com
                        break;

                        case 3:
                        response = response[1]; // www.domain.com
                        break;

                        default:
                        response = response[1]; // www.domain.com.br
                        break;
                    }

                    return response;
                },

            /*
             *   Return the TLD domain
             */

             tld: function ()
             {
                var response = data.hostname;

                if (response.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i)))
                {
                    return response.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))[0].replace(new RegExp(/^\./i), '');
                }
                else if (response.match(new RegExp(/\.[a-z]{2,4}$/i)))
                {
                    return response.match(new RegExp(/\.[a-z]{2,4}$/i))[0].replace(new RegExp(/^\./i), '');
                }

                return null;
            },

            /*
             *   Return the URL parameters
             *
             *   @attribute name
             *   @type string
             */

             param: function (name)
             {
                var i, params = data.search.substring(1).split('&');

                for (i = 0; i < params.length; i++)
                {
                    var parts = params[i].split('=');

                    if (name === parts[0])
                    {
                        return parts[1];
                    }
                }

                return null;
            },

            /*
             *   Return the slug formated string for URL build
             *
             *   @attribute string
             *   @type string
             */

             slugfy: function (string, whitespace) {

                var slug = string.toLowerCase();

                whitespace = whitespace ? whitespace : false;

                slug = slug.replace(new RegExp(/\s/g),'-');
                slug = slug.replace(new RegExp(/[àáâãäå]/g),'a');
                slug = slug.replace(new RegExp(/æ/g),'ae');
                slug = slug.replace(new RegExp(/ç/g),'c');
                slug = slug.replace(new RegExp(/[èéêë]/g),'e');
                slug = slug.replace(new RegExp(/[ìíîï]/g),'i');
                slug = slug.replace(new RegExp(/ñ/g),'n');
                slug = slug.replace(new RegExp(/[òóôõö]/g),'o');
                slug = slug.replace(new RegExp(/œ/g),'oe');
                slug = slug.replace(new RegExp(/[ùúûü]/g),'u');
                slug = slug.replace(new RegExp(/[ýÿ]/g),'y');

                if (whitespace) {
                    slug = slug.replace(new RegExp(/\W/g),'');
                }

                return slug;
            },

            /*
             *   Return an encoded string
             *
             *   @attribute string
             *   @type string
             */

             encode: function (string, specialChars) {

                var result;

                // If true, this function encodes these special characters: , / ? : @ & = + $ #
                specialChars = specialChars ? specialChars : true;

                if (specialChars) {
                    result = encodeURIComponent(string);
                } else {
                    result = encodeURI(string);
                }

                return result;
            },

            /*
             *   Return an decoded string
             *
             *   @attribute string
             *   @type string
             */

             decode: function (string, specialChars) {

                var result;

                // If true, this function decodes these special characters: , / ? : @ & = + $ #
                specialChars = specialChars ? specialChars : true;

                if (specialChars) {
                    result = decodeURIComponent(string);
                } else {
                    result = decodeURI(string);
                }

                return result;
            }

        };
    })();

    // Return a new element to BAT object

    root.Bat = Bat;

}).call(this);
