
/*!
 *   @namespace BAT
 *   @element   bat.scroll
 *   @homepage  batjs.github.io
 *
 *   @status    beta
 *   @version   0.0.2
 *   @author    Nemes Ioan Sorin (modified by Jo Santana)
 *   @original  http://codepen.io/sorinnn/pen/ovzdq
 *   @license   Released under the MIT license
 *
 *   @usage:
 *
 *      Bat.scroll.window(element); // Sets an element as the window
 *      Bat.scroll.to('topicID');
 *      Bat.scroll.top();
 *      Bat.scroll.update('allAnchorElements');
 *      Bat.scroll.below(element);
 *      Bat.scroll.belowEnabled = true; // Activate below again, after used
 *      Bat.scroll.below('stop'); // Remove scroll listener
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
            target = window,
            firstTime = true,
            belowElement = null,

        stop = function ()
        {
            clearTimeout(timeout); // stop the timeout
            interval = 30; // reset milisec iterator to original value
        },

        // helper function

        getRealTop = function (element)
        {
            var el = element,
                top = 0;

            // Can't run below loop function on window. In fact, we don't need to.

            if (target === window) {
                return top;
            }

            //

            do
            {
                top += el.offsetTop;
                el = el.offsetParent;
            } while(el);

            return top;
        },

        // helper function

        getPageScrollTop = function()
        {
            var top;

            if (target !== window) {
                top = target.scrollTop;
            } else {
                top = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
            }

            return top;
        },

        // helper function

        getPageScrollBottom = function()
        {
            var top;

            if (target !== window) {
                top = target.scrollTop + target.clientHeight;
            } else {
                top = (window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight;
            }

            return top;
        },

        // helper function

        getPageHeight = function()
        {
            var body = document.body,
                html = document.documentElement,
                height;

            if (target !== window) {
                height = target.scrollHeight;
            } else {
                height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            }

            return height;
        },

        // Main function

        animateFunction = function (ID)
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

            pageTop = getPageScrollTop();
            pageBottom = getPageHeight();

            elementTop = (ID) ? document.getElementById(ID).offsetTop : 0;

            // If element offset top is not greater than the window height,
            // we should set it to stop above it

            if (target !== window) {
                if ((pageBottom - elementTop) < target.clientHeight) {
                    elementTop = pageBottom - target.clientHeight;
                }
            } else {
                if ((pageBottom - elementTop) < window.innerHeight) {
                    elementTop = pageBottom - window.innerHeight;
                }
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

                if (target !== window) {
                    if (dir) {
                        target.scrollTop += step;
                    } else {
                        target.scrollTop -= step;
                    }
                } else {
                    window.scrollBy(0, step);
                }

                timeout = window.setTimeout(function ()
                {
                    animateFunction(ID);
                }, interval);
            }

            if (scrollPos === elementRealTop) {
                stop(); // reset function values
                return;
            }
        },

        updateFunction = function (elements, selector) {

            var i,
                ids = [],
                topPos = [],
                currentItem;

            selector = selector ? selector : 'on';

            // Get all element IDs

            for (i=0; i < elements.length; i++) {
                ids.push(elements[i].dataset.scroll);
            }

            currentItem = ids[0];
            // console.log(ids);

            // Get all elements top position

            for (i=0; i < elements.length; i++) {
                if (document.getElementById(elements[i].dataset.scroll) === null) {
                    topPos.push(0);
                } else {
                    // Added realTop subtraction to fix target window position
                    var targetDiff = (target !== window) ? getRealTop(target) : 0;
                    topPos.push(getRealTop(document.getElementById(elements[i].dataset.scroll)) - targetDiff);
                }
            }

            // Push an extra topPos, for the last element

            topPos.push(getPageHeight());
            // console.log(topPos);

            function removeSelector () {
                [].forEach.call(elements, function (el) {
                  el.classList.remove(selector);
                });
            }

            function updateScrollElement () {

                for (i=0; i < topPos.length; i++) {
                    // Update element
                    if (getPageScrollTop() >= topPos[i] && getPageScrollTop() < topPos[i+1]) {

                        // Only once on change, do THIS
                        if (currentItem !== ids[i]) {
                            currentItem = ids[i];
                            removeSelector();
                            elements[i].classList.add(selector);

                            // Dispatch event with the ID of this scroll Position
                            var event = new CustomEvent('scrollPosition', { 'detail': { 'id': ids[i], 'number': i }});
                            window.dispatchEvent(event);
                        }

                        // console.log(currentItem + ': ' + topPos[i] + ' - ' + topPos[i+1]);
                    }
                }
            }

            // Add a scroll function

            target.addEventListener('scroll', updateScrollElement);

            // Update at Start

            if (document.body.hasAttributes('unresolved')) {
                document.addEventListener('polymer-ready', updateScrollElement);
            } else {
                window.addEventListener('load', updateScrollElement);
            }
        },

        monitorScrollBelow = function () {

            // If window page scroll if below the

            if (Bat.scroll.belowEnabled && getPageScrollBottom() >= (belowElement.clientHeight + (getRealTop(belowElement) - getRealTop(target)))) {
                // Dispatch event with the ID of this scroll Position
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('scrollPassing', true, true, { 'detail': { 'element': belowElement }});
                window.dispatchEvent(event);
                Bat.scroll.belowEnabled = false;
            }
        },

        belowFunction = function () {

            if (belowElement !== 'stop') {

                // console.log('monitorScrollBelow: ON');

                // Update at Start
                window.addEventListener('load', monitorScrollBelow, false);

                // Add a scroll function
                target.addEventListener('scroll', monitorScrollBelow, false);

            } else {

                // console.log('monitorScrollBelow: OFF');

                // Remove Listener
                target.removeEventListener('scroll', monitorScrollBelow, false);

            }
        };

        return {

            /*
             *   Set scroll target window
             */

             window: function (element)
             {
                target = element;
            },

            /*
             *   Scroll to reference (id element) top position
             */

             to: function (ID)
             {
                return animateFunction(ID);
            },

            /*
             *   Scroll to top position
             */

             top: function ()
             {
                return animateFunction(null);
            },

            /*
             *   Automatically update navigation targets based on scroll position
             */

             update: function (elements, selector)
             {
                return updateFunction(elements, selector);
            },

            /*
             *   Check if target window was scrolled below a given element
             */

             belowEnabled: true,

             below: function (element)
             {
                belowElement = element;
                return belowFunction();
            }

        };
    })();

    // Return a new element to BAT object

    root.Bat = Bat;

}).call(this);
