(function () {
    'use strict';

    angular
        .module('ibs.cloud')
        .service('smModalService', SmModalService);

    SmModalService.$inject = ['$timeout'];

    function SmModalService($timeout) {
        var service = this;

        service.removeModal = removeModal;
        service.hideModal = hideModal;
        service.refreshModal = refreshModal;

        // #region pulbic methods
		
		/**
         * hides modal dialog with animation
         */
        function hideModal() {
			$('.ui.modal').modal('hide');
		}

        /**
         * removes the modal from dom
         */
        function removeModal() {
            // jshint validthis:true
            $(this).remove();
        }

        /**
         * refreshes the modal window. This is used to get the correct size for the window
         * after angular has loaded the content.
         */
        function refreshModal() {
            $timeout(function () {
                // jshint validthis:true
                $('.ui.modal').modal('refresh');
            });
        }

        // #endregion

        return service;
    }
})();