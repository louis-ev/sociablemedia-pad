// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.


/*!
 * jQuery scrollsync Plugin
 * version: 1.0 (30 -Jun-2009)
 * Copyright (c) 2009 Miquel Herrera
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
*/
;(function($) {
    $.fn.scrollsync = function(options) {
        var settings = $.extend({
            targetSelector: ':first',
            axis: 'xy'
        }, options || {});


        function scrollHandler(event) {
            if (event.data.xaxis) {
                event.data.followers.scrollLeft(event.data.target.scrollLeft());
            }
            if (event.data.yaxis) {
                event.data.followers.scrollTop(event.data.target.scrollTop());
            }
        }

        // Find target to follow and separate from followers
        settings.target = this.filter(settings.targetSelector).filter(':first');
        settings.followers = this.not(settings.target); // the rest of elements
        // Parse axis
        settings.xaxis = (settings.axis === 'xy' || settings.axis === 'x') ? true : false;
        settings.yaxis = (settings.axis === 'xy' || settings.axis === 'y') ? true : false;
        if (!settings.xaxis && !settings.yaxis) {
            // No axis left
            return;
        }

        // bind scroll event passing array of followers
        settings.target.bind('scroll', settings, scrollHandler);

    };
})(jQuery);


/*!
 * jQuery dragscrollable Plugin
 * version: 1.0 (25-Jun-2009)
 * Copyright (c) 2009 Miquel Herrera
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
*/
;(function($, window, document) {
    $.fn.dragscrollable = function(options) {

        var settings = $.extend({
            dragSelector: '>:first',
            speed: 60,
            easing: 'easeOutQuint',
            acceptPropagatedEvent: true,
            preventDefault: true
        }, options || {});


        var dragscroll = {
            mouseDownHandler: function(event) {

                // mousedown, left click, check propagation
                if (event.which !== 1 || (!event.data.acceptPropagatedEvent && event.target !== this)) {
                    return false;
                }

                // stop momentum
                event.data.scrollable.stop(true);

                // Initial coordinates will be the last when dragging
                event.data.lastCoord = {
                    top: event.clientY,
                    left: event.clientX
                };

                $(settings.dragSelector).toggleClass('mouseup mousedown');
                $.event.add(document, "mouseup", dragscroll.mouseUpHandler, event.data);
                $.event.add(document, "mousemove", dragscroll.mouseMoveHandler, event.data);
                if (event.data.preventDefault) {
                    event.preventDefault();
                    return false;
                }
            },
            mouseMoveHandler: function(event) { // User is dragging

                // How much did the mouse move?
                var delta = {
                    top: (event.clientY - event.data.lastCoord.top),
                    left: (event.clientX - event.data.lastCoord.left)
                };

                // Set the scroll position relative to what ever the scroll is now
                event.data.scrollable.scrollTop(event.data.scrollable.scrollTop() - delta.top);
                event.data.scrollable.scrollLeft(event.data.scrollable.scrollLeft() - delta.left);

                // Save data for modern browsers
                if (!($.browser.msie && Number($.browser.version) <= 8)) {
                    event.data.lastCoord = {
                        top: event.clientY,
                        left: event.clientX,
                        delta: delta,
                        lastmove: Date.now()
                    };
                }
                if (event.data.preventDefault) {
                    event.preventDefault();
                    return false;
                }

            },
            mouseUpHandler: function(event) { // Stop scrolling
                $(settings.dragSelector).toggleClass('mouseup mousedown');
                $.event.remove(document, "mousemove", dragscroll.mouseMoveHandler);
                $.event.remove(document, "mouseup", dragscroll.mouseUpHandler);
                if (event.data.lastCoord.delta) {

                    var momentumtop = event.data.lastCoord.delta.top,
                        momentumtoppos = momentumtop < 0 ? -momentumtop : momentumtop,

                        momentumleft = event.data.lastCoord.delta.left,
                        momentumleftpos = momentumleft < 0 ? -momentumleft : momentumleft,
                        lastmove = Date.now() - event.data.lastCoord.lastmove;


                    if (momentumtoppos > 5 && lastmove < 100) {
                        $.event.add(document, "mousewheel", dragscroll.wheelHandler, event.data);
                        event.data.scrollable.animate({
                            scrollTop: event.data.scrollable.scrollTop() - momentumtop * 20
                        }, momentumtoppos * settings.speed, settings.easing);
                    } else if (momentumleftpos > 5 && lastmove < 100) {
                        event.data.scrollable.animate({
                            scrollLeft: event.data.scrollable.scrollLeft() - momentumleft * 20
                        }, momentumleftpos * settings.speed, settings.easing);
                    }
                }
                if (event.data.preventDefault) {
                    event.preventDefault();
                    return false;
                }
            },
            wheelHandler: function(event) {
                $.event.remove(document, "mousewheel", dragscroll.wheelHandler);
                event.data.scrollable.stop(true);
            }
        };

        // set up the initial events
        this.each(function() {
            // closure object data for each scrollable element
            var data = {
                scrollable: $(this),
                acceptPropagatedEvent: settings.acceptPropagatedEvent,
                preventDefault: settings.preventDefault
            };
            // Set mouse initiating event on the desired descendant
            $(this).find(settings.dragSelector).bind('mousedown', data, dragscroll.mouseDownHandler).addClass('mouseup');
        });
    };
})(jQuery, window, document);
