(function () {
	'use strict';
	
	angular
        .module('ibs.cloud')
        .directive('validateServerMessages', validateServerMessages);
	
	validateServerMessages.$inject = [];
	
	function validateServerMessages() {
		// Usage:
		//     <validate-server-messages vms-model="your-model-name-goes-here"></validate-server-messages>
		// Creates:
		//
		var directive = {
			link: link,
			restrict: 'E',
			controller: Controller,
			controllerAs: 'vsm',
			templateUrl: 'scripts/components/validate-server-messages/validate-server-messages.html',
			scope: {
				modelName: '@vsmModel',
				wholeForm : '@vsmWholeFormErrors'
			},
			bindToController: true
		};
		return directive;
		
		function link(scope, element, attrs) {
		}

	}
	
	Controller.$inject = [
		'serverValidation',
		'$element',
		'$timeout'
	];
	
	function Controller(
        serverValidation,
		$element,
		$timeout
	) {
		
		var vm = this;
		var formName;

		vm.getErrors = getErrors;
		vm.hasErrors = hasErrors;
		vm.clearAllErrors = clearAllErrors;	
		
		init();
		
		function init() {
			
			$timeout(function () {
								
				var $parentForm = $element.closest('[data-form-id]');
				if ($parentForm.length) {
					formName = $parentForm.attr('data-form-id');
				}
				
				if (!formName) {
					throw new Error('validateServerMessages : Please provide form id');
				}

			});
		}		

		function isWholeFormErrors() { 
			return angular.isDefined(vm.wholeForm);
		}

		function getErrors() {
			
			var errors = [];

			if (isWholeFormErrors()) {
				errors = serverValidation.getAllFormErrors(formName);
			} else { 
				errors = serverValidation.getErrorsForKey(formName, vm.modelName);	
			}

			// we want to have only unique error messages, duplicates are not good
			return _.uniq(errors);
		}
		
		function hasErrors() {
						
			if (isWholeFormErrors()) {
				return serverValidation.hasErrorsForForm(formName);
			}
				
			return serverValidation.hasErrorsForKey(formName, vm.modelName);
		}

		function clearAllErrors() { 
			serverValidation.clearAllFormErrors(formName);
		}

	}
	
})();
