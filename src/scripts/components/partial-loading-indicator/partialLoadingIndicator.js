(function () {
    'use strict';
    
    angular
    .module('ibs.cloud')
    .directive('partialLoadingIndicator', partialLoadingIndicator);
    
	partialLoadingIndicator.$inject = [];
    
    function partialLoadingIndicator() {
        
        var directive = {
            restrict: 'E',
            controller: Controller,
            controllerAs: 'pli',
            templateUrl: 'scripts/components/partial-loading-indicator/partial-loading-indicator.html',
            bindToController: true,
            scope: {
				message : '@pliMessage',
				disableParentClasses : '@pliNoParentClass'
            }
        };
        
        return directive;
    }
    
	Controller.$inject = [ '$element'
	];
    
	function Controller($element) {

        var vm = this;			

		$element.addClass('hidden');
		
		// we need ui segment classes to show spinner
		// for grids the layout says we don't need them
		if (!angular.isDefined(vm.disableParentClasses)) {
			$element.parent().addClass('ui');
			$element.parent().addClass('segment');	    
		}

    }


})();
