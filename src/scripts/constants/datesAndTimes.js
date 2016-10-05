(function () {
    'use strict';

    angular
        .module('ibs.cloud')
        .constant('DATE_ONLY_FORMAT', 'YYYY-MM-DD')
        .constant('TIME_UNIX_HOUR_MULTIPLIER', 3600)
        .constant('TIME_UNIX_MINUTE_MULTIPLIER', 60);

})();