(function () {
    'use strict';

    angular
        .module('ibs.cloud')
        .service('processing', Processing);

    Processing.$inject = [];

    /**
     * A service responsible for indicating processing of operations on pages (not refreshing data).
     * 
     * @returns {Object} 
     */
    // ReSharper disable once InconsistentNaming
    function Processing() {
        var service = this,
            showOverlay = false;

        service.showOverlayIndicator = showOverlayIndicator;
        service.hideOverlayIndicator = hideOverlayIndicator;

        service.showPartialLoadingIndicator = showPartialLoadingIndicator;
        service.hidePartialLoadingIndicator = hidePartialLoadingIndicator;

        /**
         * @property {String} text The text to display
         * @property {Boolean} show Whether or not to show the text of the overlay
         */
        service.overlay = {
            text: null
        };

        // Ensure overlay is not overwritten with a different variable so the show property works as designed.
        Object.defineProperty(service, 'overlay', {
            configurable: false,
            writable: false
        });

        // If show is set to null empty out the text field.
        Object.defineProperty(service.overlay, 'show', {
            get: function () { return showOverlay; },
            set: function (val) {
                showOverlay = val;
                if (showOverlay === false) {
                    this.text = null;
                }
            },
            enumerable: true,
            configurable: true
        });

        /**
         * Displays a message for the application's loading indicator
         * 
         * @param {String} message The user-friendly text to display below the loading indicator
         * @returns {} 
         */
        function showOverlayIndicator(message) {
            service.overlay.text = message;
            service.overlay.show = true;
        }

       /**
        * Hides the application's loading indicator
        * 
        * @returns {} 
        */
        function hideOverlayIndicator() {
            service.overlay.show = false;
        }
		
		
		// NOTE : those functions here because it is the most fast way to get loading 
		// indicator and it does not init scope digest or something

		function showPartialLoadingIndicator(id) { 
			$('#' + id).removeClass('hidden');
		}
		
		function hidePartialLoadingIndicator(id) {
			$('#' + id).addClass('hidden');
		}
		
		//************************

        return service;
    }
})();