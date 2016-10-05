(function () {
    'use strict';
    
    angular
    .module('ibs.cloud')
    .constant('CustomUIGridConstants', {

		debounceDelay : 400,
		headerCellTemplate : 'template/ui-grid-search-header/ui-grid-search-header.html',
		filterHeaderTemplate : 'template/ui-grid-filter/ui-grid-filter.html',
        cellTemplate : 'template/ui-grid-centered-cell/ui-grid-centered-cell.html'
    });

})();