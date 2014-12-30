
/*!
 *   @namespace BAT
 *   @element   bat.scroll
 *   @homepage  batjs.github.io
 *
 *   @status    beta
 *   @version   0.0.1
 *   @author    Nemes Ioan Sorin (modified by Jo Santana)
 *   @original  http://codepen.io/sorinnn/pen/ovzdq
 *   @license   Released under the MIT license
 *
 *   @usage:
 *
 *      Bat.scroll.to('topicID');
 *      Bat.scroll.top();
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
     *   BAT scroll
     */

     Bat.scroll = (function ()
     {
        var interval = 30,
            timeout = null, //timeout local variable

        stop = function ()
        {
            clearTimeout(timeout); // stop the timeout
            interval = 30; // reset milisec iterator to original value
        },

        getRealTop = function (element) // helper function
        {
            var el = element,
                top = 0;

            do
            {
                top += el.offsetTop;
                el = el.offsetParent;
            } while(el);

            return top;
        },

        getPageScroll = function()  // helper function
        {
            var top = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
            return top;
        },

        getPageHeight = function()  // helper function
        {
            var body = document.body,
            html = document.documentElement;

            var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            return height;
        },

        animate = function (ID) // Main function
        {
            stop(); // for click on another button or link

            var elementTop, // Element offset top
                elementRealTop, // Element real top
                pageTop, // Page offset top
                pageBottom, // Page offset bottom
                scrollPos, // Actual scroll value
                pos, // Position
                dir, // Direction
                step; // Step value

            pageTop = getPageScroll();
            pageBottom = getPageHeight();

            elementTop = (ID) ? document.getElementById(ID).offsetTop : 0;

            // If element offset top is not greater than the window height,
            // we should set it to stop above it

            if ((pageBottom - elementTop) < window.innerHeight) {
                elementTop = pageBottom - window.innerHeight;
            }

            elementRealTop = (ID) ? getRealTop(document.getElementById(ID).parentNode) : 0;

            if (pageTop === null || isNaN(pageTop) || pageTop === 'undefined') { pageTop = 0; }

            scrollPos = elementTop - pageTop;

            if (scrollPos > elementRealTop) {
                pos = (elementTop - elementRealTop - pageTop);
                dir = 1;
            }

            if (scrollPos < elementRealTop) {
                pos = (pageTop + elementRealTop) - elementTop;
                dir = -1;
            }

            if (scrollPos !== elementRealTop) {
                step = ~~((pos/4) + 1) * dir;

                if (interval > 1) {
                    interval -= 1;
                } else {
                    interval = 0; // decrease the timeout timer value but not below 0
                }

                window.scrollBy(0, step);
                timeout = window.setTimeout(function ()
                {
                    animate(ID);
                }, interval);
            }

            if (scrollPos === elementRealTop) {
                stop(); // reset function values
                return;
            }
        };

        return {

            /*
             *   Scroll to reference (id element) top position
             */

             to: function (ID)
             {
                return animate(ID);
            },

            /*
             *   Scroll to top position
             *
             *   @attribute name
             *   @type string
             */

             top: function ()
             {
                return animate();
            }

        };
    })();

    // Return a new element to BAT object

    root.Bat = Bat;

}).call(this);
