(function () {
	'use strict';
	
	angular
        .module('ibs.cloud')
        .service('serverValidation', ServerValidation);
	
	ServerValidation.$inject = [
	];
	
	function ServerValidation() {
		
		var service = this, 
			errors = {};
		
		service.validate = validate;
		service.getErrorsForKey = getErrorsForKey;
		service.hasErrorsForKey = hasErrorsForKey;
		service.hasErrorsForForm = hasErrorsForForm;
		service.clearErrorsForKey = clearErrorsForKey;
		service.clearAllFormErrors = clearAllFormErrors;
		service.getAllFormErrors = getAllFormErrors;
		
		Object.defineProperty(service, 'errors', {
			get: function () {
				return errors;
			},
			enumerable: true,
			configurable: false
		});
		
		function clearErrorsForKey(formName, key) {
			if (hasErrorsForKey(formName, key)) {
				delete errors[formName][key];
			}
		}
		
		function hasErrorsForKey(formName, key) {
			return !!errors[formName] && !!errors[formName][key] && !!errors[formName][key].length;
		}
		
		function hasErrorsForForm(formName) {
			return !!errors[formName] && !!Object.keys(errors[formName]).length;
		}
		
		function getErrorsForKey(formName, key) {
			
			if (hasErrorsForKey(formName, key)) {
				return errors[formName][key];
			}
			
			return [];
		}
		
		function getAllFormErrors(formName) {
			
			if (hasErrorsForForm(formName)) {
				
				var allErrs = [];

				Object.keys(errors[formName]).forEach(function (key) {
					if (angular.isArray(errors[formName][key])) {
						for (var i = 0; i < errors[formName][key].length; i++) {
							allErrs.push(errors[formName][key][i]);
						}
					}
				});
				
				return allErrs;
			}		

		}
		
		function validate(formName, respData) {
			
			clearAllFormErrors(formName);
			if (respData.hasServerValidationErrors === true) {
				
				errors[formName] = respData.errors;
			}

		}
		
		function clearAllFormErrors(formName) {
			errors[formName] = {};
		}
		
		return service;
	}
})();