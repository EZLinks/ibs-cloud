(function (angular) {
    'use strict';

    angular
    .module('ibs.cloud', [
        'ui.bootstrap',
        'ibs.notifications',
        'semantic-ui',
        'googlechart',
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'odata.ui.grid',
        'ui.grid.edit',
        'ui.grid.rowEdit',
		'ui.grid.cellNav'
    ])
    .config(config);
    
    config.$inject = [
        'NotificationsProvider',
        '$httpProvider',
        '$compileProvider'
    ];

    function config(
        NotificationsProvider,
        $httpProvider,
        $compileProvider
    ) {
        // to improve performance. (this removes the jquery .data() binding
        //      of angular data
        $compileProvider.debugInfoEnabled(false);

        // This is the amount of time in milliseconds that a notification will remain in-memory 
        // and viewable(unless autoClose: false on the notification or globally below)
        NotificationsProvider.setNotificationTimeoutMs(3500);
        
        // should "fade", applies a .fade-out style to the notification element.
        NotificationsProvider.setFadeDefault(true);
        
        // should match your CSS rule for fade, could be calculated from the rule itself and passed in here...
        NotificationsProvider.setFadeDuration(1500);
        
        // global behavior for automatically closing notifications. 
        // This can be overridden when emitting an notification.
        NotificationsProvider.autoClose(true);

        //$httpProvider.interceptors.push('server405Interceptor');
        //$httpProvider.interceptors.push('serverMetaDataInterceptor');
    }

})(window.angular);