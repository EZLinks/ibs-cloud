(function () {
	'use strict';
	
	var invalidInputClass = 'error';
	
	angular.module('ibs.cloud')
        .directive('validateServerModel', 		
		[	
		'serverValidation',	
		'$timeout',		
		function (
			serverValidation,
			$timeout
) {
			return {
				link: function (scope, element, attrs, ctrl) {
					
					$timeout(function () {
						
						var modelName = attrs.validateServerModel;
						var formName = null;
						
						var $parentForm = $(element).closest('[data-form-id]');
						if ($parentForm.length) {
							formName = $parentForm.attr('data-form-id');
						}
						
						// we need formId
						if (!formName) {
							throw new Error('validateServerModel : Please provide form id');
						}
						
						// need to init our form obj to support watch,
						// we can implement subscriber maybe, but it's a bit of work, for now I guess it would be ok
						if (!serverValidation.errors[formName]) {
							serverValidation.clearAllFormErrors(formName);
						}
						
						// choose validateServerModel or just ngModel 
						var modelStateKey = modelName || attrs.ngModel;
						
						if (!modelStateKey) {
							throw new Error('validateServerModel : Please provide field name');
						}
						
						// for dealing with arrays
						modelStateKey = modelStateKey.replace('$index', scope.$index);
						
						scope.$watch(function () {
							
							return serverValidation.errors[formName][modelStateKey];
					
						}, function () {
							
							$(element).parent().removeClass(invalidInputClass);
							
							if (serverValidation.hasErrorsForKey(formName, modelStateKey)) {
								$(element).parent().addClass(invalidInputClass);
							}

						});
						
						// clear server-side validation classes and ngModel state when the input value changes
						element.parent().bind('click', function (evt) {
							
							scope.$apply(function () {
								serverValidation.clearErrorsForKey(formName, modelStateKey);
							});

						});

					});
				}
			};
		}
	]);
})();