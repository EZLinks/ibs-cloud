(function() {
    'use strict';

    angular
        .module('ibs.cloud')
        .directive('note', note);

    note.$inject = [];
    
    function note () {
        var directive = {
            restrict: 'E',
            requires: '^ngModel',
            controller: Controller,
            bindToController: true,
            controllerAs: '$ctrl',
            scope: {
                note: '=ngModel',
                header: '=header'
            },
            templateUrl: 'scripts/components/note/note.html'
        };
        return directive;
    }

    Controller.$inject = [];
    // ReSharper disable once InconsistentNaming
    function Controller() {
        /* jshint validthis:true */
        var vm = this;

        vm.header = 'Note Details';
    }
})();