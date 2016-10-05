(function () {
    'use strict';
    
    angular
        .module('ibs.cloud')
        .filter('ibsTime', timeFilter);

    timeFilter.$inject = ['Time'];

    function timeFilter(Time) {
        return function (input) {
            if (!input) { return null; }
            
            var out = new Time(input);
            return out.toShortMeridiemTime();
        };
    }
})();