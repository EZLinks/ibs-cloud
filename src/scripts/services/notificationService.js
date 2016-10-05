(function () {
    'use strict';
    /* jshint quotmark:false, bitwise:false */

    var fadeDuration = 400; // 400ms default. Can be overridden in .config phase (Please override there and not here).

    /**
     * Creates a new notification object
     * @param type The notification type (e.g. error, info, warn)
     * @param message The message to display for the notification
     * @param [options] An object containing custom options for the notification object
     * @param [options.fade] Whether or not the notification should fade
     * @param [options.timeout] The amount of time to pass before closing the notification (in milliseconds)
     * @param [options.autoClose] Whether or not the notification should automatically close
     * @constructor
     */
    function Notification(type, message, options) {
        if (!angular.isDefined(type)) {
            throw new Error("Notification requires type to be defined");
        }

        if (!angular.isDefined(message)) {
            throw new Error("Notification requires message to be defined");
        }

        if (-1 === "error|info|success|warning".indexOf(type)) {
            throw new Error("Notification type must be one of: error|info|success|warning");
        }

        Object.defineProperty(this, 'type', {
            enumerable: true,
            configurable: true,
            writable: false,
            value: type
        });

        Object.defineProperty(this, 'message', {
            enumerable: true,
            configurable: true,
            writable: false,
            value: message
        });

        var opt = options || { fade: true };

        Object.defineProperty(this, 'fade', {
            enumerable: true,
            configurable: true,
            writable: false,
            value: (true === opt.fade)
        });

        Object.defineProperty(this, 'timeout', {
            enumerable: true,
            configurable: true,
            writable: false,
            value: opt.timeout
        });

        Object.defineProperty(this, 'autoClose', {
            enumerable: true,
            configurable: true,
            writable: false,
            value: opt.autoClose
        });
    }

    /**
     * Notifications uses a provider instead of a service or factory so we can set configuration values in the .config phase of the app.
     * Example:
     *
     *      angular.module('myApp').config('NotificationsProvider', function(NotificationsProvider) {
     *          NotificationsProvider.setNotificationTimeoutMs(200);
     *          NotificationsProvider.setFadeDefault(true);
     *      });
     */
    var module = angular.module('ibs.notifications', []);

    module.provider('Notifications', function () {
        var notificationTimeoutMs = 3000; // 3 seconds default. Can be overridden in .config phase (Please override there and not here).
        var fadeDefault = false;
        var autoCloseDefault = true;

        /**
         * Sets the default notification timeout in milliseconds
         *
         * @param {Number} milliseconds The number of milliseconds before the notification times out (closes)
         */
        this.setNotificationTimeoutMs = function (milliseconds) {
            notificationTimeoutMs = milliseconds | 0;
        };

        /**
         * Sets whether or not notifications should "fade"
         *
         * @param {Boolean} fade Whether or not a notification should be 'faded' visually
         */
        this.setFadeDefault = function (fade) {
            fadeDefault = !!fade;
        };

        /**
         * Sets the expected length of time for a fade duration to occur. Value should be equal to the duration in a stylesheet rule. If the 
         * rule removes or otherwise makes the element not display (height/opacity/etc), you could get away with a slightly greater duration.
         * 
         * Be aware this is considered a global value. Meaning all notification types must respect this value in the stylesheet rules you apply.
         *
         * @param {Boolean} durationInMilliseconds Whether or not a notification should be 'faded' visually
         */
        this.setFadeDuration = function (durationInMilliseconds) {
            fadeDuration = durationInMilliseconds;
        };

        /**
         * Sets whether or not notifications should automatically close. This can be overridden when the notification is emitted.
         *
         * @param {Boolean} autoClose Whether or not the notification should automatically close by default.
         */
        this.autoClose = function (autoClose) {
            autoCloseDefault = autoClose;
        };

        // This is the actual service implementation. The array is the injector array
        this.$get = [
            '$timeout',
            function notificationService($timeout) {
                var listeners = [];

                var service = {};

                /**
                 * Bind a function to listen for new notifications to arrive. NOTE: There is no notification caching.
                 *
                 * @param $scope The angular scope of the caller
                 * @param {Function} listener The function that should execute when a new notification is emitted
                 */
                service.onNotification = function ($scope, listener) {
                    // only add new listeners.
                    if (-1 === listeners.indexOf(listener)) {
                        listeners.push(listener);

                        // This automatically de-registers the listener when the scope is destroyed.
                        // Usually it's bad form to pass scope into a service, but we'd rather not have memory leaks if someone forgets to
                        // remove a listener.
                        // This also allows us to define functions inline whenever this onNotification function is called.
                        $scope.$on('$destroy', function () {
                            var idx = listeners.indexOf(listener);
                            listeners.splice(idx, 1);
                        });
                    }
                };

                /**
                 * Emit a new notification. NOTE: There is no notification caching.
                 *
                 * @param {String|Object} type The type of notification to be displayed. Accepts an object of form {Key:'',Value:''}.
                 * @param {String} message The message of the notification
                 * @param {Boolean} autoClose Whether or not the notification automatically closes
                 */
                service.emit = function (type, message, autoClose, timeoutOverride) {
                    if (arguments.length === 1 && angular.isObject(type) && "Key" in type && "Value" in type) {
                        var data = type;
                        type = data.Key;
                        message = data.Value;
                    }

                    if (!angular.isDefined(autoClose)) {
                        autoClose = autoCloseDefault;
                    }

                    var notification = new Notification(type, message, {
                        fade: fadeDefault,
                        timeout: timeoutOverride || notificationTimeoutMs,
                        autoClose: !!autoClose
                    });

                    $timeout(function () {
                        angular.forEach(listeners, function (listener) {
                            $timeout(function () {
                                listener.call(null, notification);
                            });
                        });
                    });
                };

                return service;
            }
        ];
    });

    // Defining our NotificationListController on the module in this way allows for consumers to override or proxy what this controller does.
    module.controller('NotificationListController', ['$scope', '$sce', '$timeout', 'Notifications', function ($scope, $sce, $timeout, Notifications) {
        $scope.notifications = [];

        $scope.closeNotification = function (clickedEvent, notification, clicked) {
            if (clickedEvent != null && clickedEvent.target != null && clickedEvent.target.nodeName === "A") {
                var anchorTag = angular.element(clickedEvent.target);

                $scope[anchorTag.attr("data-invoke")](anchorTag.attr("data-invoke-args"));
            }

            if (clicked) {
                $timeout.cancel(notification.closeTimeoutId);
                notification.isFading = true;

                $timeout(function () {
                    $scope.closeNotification(clickedEvent, notification, false);
                }, fadeDuration);
            } else {
                var idx = $scope.notifications.indexOf(notification);
                if (-1 !== idx) {
                    $scope.notifications.splice(idx, 1);
                }
            }
        };

        Notifications.onNotification($scope, function (notification) {
            // Notification's message property is immutable.
            // This wraps the n.message text in a structure that tells an angular view to render as HTML instead of TEXT (the default).
            notification.$messageHTML = $sce.trustAs($sce.HTML, notification.message || "");

            $scope.notifications.push(notification);
            if (notification.autoClose) {
                notification.closeTimeoutId = $timeout(function () {
                    $scope.closeNotification(null, notification);
                }, notification.timeout);
            }
        });
    }]);

    module.directive('notificationList', [
        function () {
            return {
                // This directive can be either an element or an attribute
                restrict: 'AE',

                // Provides controller accountability for all notification events.
                controller: 'NotificationListController',

                // Referencing a template this way allows us to define a default within the template cache in the module.run.
                // This template can then be overridden by consuming applications simply by updating the templateCache.
                templateUrl: 'templates/notification-list.html',

                link: function(scope, elem, attr) {
                    scope.$on('$destroy', function() {
                        // Remove all events bound within this directive so elements and functions can be garbage collected
                        elem.off();
                    });
                }
            };
        }
    ]);

    module.directive('notificationCompileHtml', ['$parse', '$compile',
        function ($parse, $compile) {
            return {
                restrict: "A",
                link: function(scope, element, attributes) {

                    var parsed = $parse(attributes.ngBindHtml);

                    function getStringValue() { return (parsed(scope) || '').toString(); }

                    scope.$watch(getStringValue, function() {
                        $compile(element, null, -9999)(scope.$parent.$parent || scope.$parent); //The -9999 makes it skip directives so that we do not recompile ourselves
                    });
                }
            };
        }
    ]);
    /* jshint ignore:start */
    // We can also provide templates inline. See http://jsfiddle.net/pkozlowski_opensource/qSBHE/2/
    module.run(['$templateCache', function ($templateCache) {
        $templateCache.put('templates/notification-list.html', [
            '<div class="notification-list">',
            '   <div ng-repeat="notification in notifications" class="notification notify-{{notification.type}}" ng-class="{\'fade-out\': notification.isFading }" ng-click="closeNotification($event, notification, true)" >' +
            '       <span class="img {{notification.type}}"></span>' +
            '       <span notification-compile-html ng-bind-html="notification.$messageHTML" class="message"></span> ' +
            '       <span ng-click="closeNotification($event, notification, true)" class="close-notification" style="cursor: pointer">\u2718</span>' +
            '   </div>',
            '</div>'
            ].join(''));
    }]);
    /* jshint ignore:end */
})();

(function (window) {
    'use strict';

    /**
	 * Builds a new adapter bound to a target element that's been bootstrapped to an angular app.
	 * @property {NodeElement} a dom element bootstrapped with angular
	 */
    function adapterBuilder(e) {
        var el,
			listenerScopes = [];

        /**
		 * @prop {NodeElement} element the element to which Angular is applied 
	 	 * @constructor
		 */
        function Adapter(element) {
            el = element;
        }

        /**
		 * Emits a notification to the angular module
		 *  
         * @param {String|Object} type The type of notification to be displayed. Accepts an object of form {Key:'',Value:''}.
         * @param {String} message The message of the notification
         * @param {Boolean} autoClose Whether or not the notification automatically closes
		 */
        Adapter.prototype.emit = function (type, message, autoClose, timeoutOverride) {
            var injector = angular.element(el).injector(),
				notificationService = injector.get('Notifications');

            notificationService.emit(type, message, autoClose, timeoutOverride);
        };

        /**
		 * Adds a listener for notification events. Listen will receive a single Notification object,
		 * with the structure { type: string, message: string, fade: boolean, timeout: number, autoClose: boolean }
		 */
        Adapter.prototype.addListener = function (listener) {
            var scope = angular.element(el).scope().$new();

            // Because the angular notification service uses scopes to auto-unbind
            // we need to create a scope, then invoke $destroy later to get the 
            // listener removed from the internal private array of the Notification service.
            // NOTE: This results in two arrays holding a reference to the listener, but they get cleaned up
            // 		 so... no harm, no foul.
            listenerScopes.push({
                scope: scope,
                listener: listener
            });
        };

        /**
		 * Removes a listener that was bound for notification events.
		 * NOTE: listener must be the same function instance that was passed to addListener.
		 */
        Adapter.prototype.removeListener = function (listener) {
            for (var index = 0; index < listenerScopes.length; index++) {
                var element = listenerScopes[index];
                if (element.listener === listener) {
                    element.scope.$destroy();
                    break;
                }
            }
        };

        return new Adapter(e);
    }

    /**
     * IbsNotifications builds an adapter into our angular services for applications that *ARE NOT* using angular.
     * 
     * usage:
     * (HTML)
     * <div id="notifications">
     *      <notification-list/>
     * </div>
     * 
     * (JavaScript Setup)
     * (function(){
     *      var target = document.getElementById("notifications");
     *      angular.module('myApp', ['ibs.notifications']);
     *      angular.element(target).ready(function() {
     *          angular.bootstrap(target, ['myApp']);
     *      });
     * })();
     * 
     * (JavaScript Usage)
     * var adapter = new IbsNotifications(document.getElementById("notifications"));
     * adapter.emit('info', "Info Message");
     * adapter.emit('warning', "<i>Warning</i> Message");
     * adapter.emit('success', "Success Message (autoClose: false)<br/>Click to close.", false);
     * adapter.emit('error', "<b>Error</b> Message (timeout: 5000)", true, 5000);
     * 
     * NOTE: Angular must be included before this file and before the example code above (unless it is bound to DOMContentReady event).
     */
    window.IbsNotifications = adapterBuilder;
})(window);