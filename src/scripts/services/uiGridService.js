
/*
 * This service provides a reset function to fix an issue with the 
 * tab indexes set on an angular ui grid. The service first removes 
 * the tab indexes from the column header labels, then adds tab
 * indexes to the column header inputs, in order.
 * 
 * There is an existing issue on Github for this to be fixed in 
 * v4.0 of angular ui grid.
 * https://github.com/angular-ui/ui-grid/issues/4951
 * 
 */

(function () {
    'use strict';

    // #region defaults

    var defaultRowsCount = 10;
    var defaultRowHeight = 30;
    var defaultHeaderHeight = 62;
    var defaultFooterHeight = 45;

    // #endregion defaults

    angular
        .module('ibs.cloud')
        .service('uiGridService', UIGridService);

    UIGridService.$inject = [];

    function UIGridService() {
        var service = this;

        service.resetTabIndex = resetTabIndex;
        service.getTableHeight = getTableHeight;
        service.hasSelectedRow = hasSelectedRow;
        service.getSelectedRow = getSelectedRow;
        service.unSelectRows = unSelectRows;
		service.initFilterRequest = initFilterRequest;
		service.mergeFilterRequest = mergeFilterRequest;
		service.filterChanged = filterChanged;
		service.responseHasNoItems = responseHasNoItems;

        // #region pulbic methods
		
		/**
         * checks if response has no items(response must have no items and grid should contain no filters)
	     * @param {Object} gridApi - gridApi main object
	     * @param {Object[]} data - any array with information
	     * @returns {Boolean} true if has no items and no filter, otherwise false
	     */
		function responseHasNoItems(gridApi, data) {
					
			if (data && data.length === 0) {
				
				var hasFilter = _.some(gridApi.grid.columns, function (col) {
					return col.filter.term && col.filter.term.trim() !== '';
				});
				
				if (!hasFilter) {
					return true;
				}

			}

			return false;
		}
		
		/**
         * inits filter request object for ui-grid
	     * @param {Object} gridOptions - grid options object
	     * @returns {Object} filter request Obj
	     */
		function initFilterRequest(gridOptions) { 
		
			return {
				pageSize : gridOptions.paginationPageSize,
				page : 1,
				sort: null,
				filters : []
			};
		}
		
		/**
         * copies data from filterRequestPart to filterRequest 
	     * @param {Object} filterRequest - base filter request Object
	     * @param {Object} filterRequestPart - filter part object
	     */
		function mergeFilterRequest(filterRequest, filterRequestPart) { 
		
			var properties = ['sort', 'page', 'pageSize', 'filters'];
			
			for (var i = 0; i < properties.length; i++) {
    
				var propName = properties[i];

				if (angular.isDefined(filterRequestPart[propName])) {
					filterRequest[propName] = filterRequestPart[propName];
				}

			}

		}
		
		/**
         * handles callback invocation when ui-grid paging/filtering/sorting changed
		 * provides part of the filter that changed in the callback
	     * @param {Object} $scope - app scope
	     * @param {Object} gridApi - grid api object
	     * @param {Function} callback - to call on successful grid events change
	     */
		function filterChanged($scope, gridApi, callback) {
			
			gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
				
				var filterRequest = {};

				if (sortColumns.length === 0) {
					filterRequest.sort = null;
				} else {
					filterRequest.sort = {
						direction : sortColumns[0].sort.direction,
						memberName : sortColumns[0].field 
					};
				}

				if (angular.isFunction(callback)) {
					callback(filterRequest);
				}
			});

			gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
				
				var filterRequest = {};

				filterRequest.page = newPage;
				filterRequest.pageSize = pageSize;

				if (angular.isFunction(callback)) {
					callback(filterRequest);
				}
			});


			gridApi.core.on.filterChanged($scope, function () {
				
				var filters = [];
				var filterRequest = { filters : filters, page : 1 };

				gridApi.grid.columns.forEach(function (column) {
					if (column.filters && column.filters.length > 0 && column.filters[0].term && column.filters[0].condition) {
						filters.push({
							memberName: column.field, 
							value: column.filters[0].term,
							condition : column.filters[0].condition
						});
					}
				});

				if (angular.isFunction(callback)) {
					gridApi.pagination.seek(1);
					callback(filterRequest);
				}
			});

		}

		/**
         * removes all selected rows
         */	
		function unSelectRows(gridApi) {
			if (gridApi) {
				gridApi.selection.clearSelectedRows();
			}
		}
		
		/**
         * gets selected row from grid
	     * @param {Object} gridApi - object of the grid api
  	     * @returns {Object} selected row object or null
         */
		function getSelectedRow(gridApi) { 
		
			if (hasSelectedRow(gridApi)) {
				return gridApi.selection.getSelectedRows()[0];
			}
			
			return null;
		}

		/**
         * checks if grid has the row selected
	     * @param {Object} gridApi - object of the grid api
  	     * @returns {Boolean} has selected row or not
         */
		function hasSelectedRow(gridApi) { 
		
			var hasSelection = false;

			if (gridApi) {
				hasSelection = !!(gridApi.selection.getSelectedRows()[0]);
			}

			return hasSelection;
		}


        /**
         * resets tab index in ui grid
         */
        function resetTabIndex()
        {
            removeLabelAttributes();
            updateInputIndexes();
        }

        /**
        * calculates grid height to match rows height
	    * @param {Number} dataLength - length of all data in grid
	    * @param {Number} rowsCount - count of rows that should be shown
	    * @param {Number} rowHeight - height of one row
	    * @param {Number} headerHeight - height of the grid's header
	    * @returns {Object} height style object
        */
        function getTableHeight(dataLength, rowsCount, rowHeight, headerHeight)
        {

            // set defaults if not defined
            if (!angular.isDefined(rowHeight)) {
                rowHeight = defaultRowHeight;
            }

            if (!angular.isDefined(headerHeight)) {
                headerHeight = defaultHeaderHeight;
            }
            // end set defaults

            // protection from guys who want to pass here some stupid values..
            if (!angular.isNumber(dataLength) || !angular.isNumber(rowsCount) ||
				!angular.isNumber(rowHeight) || !angular.isNumber(headerHeight)) {
                return {
                    height: (defaultRowsCount * defaultRowHeight + defaultHeaderHeight + defaultFooterHeight) + 'px'
                };
            }

            var rowsToShow = dataLength >= rowsCount ? rowsCount : dataLength;

            return {
                height: (rowsToShow * rowHeight + headerHeight + defaultFooterHeight) + 'px'
            };

        }

        // #endregion


        // #region private methods

        function removeLabelAttributes() {
            var labels = document.querySelectorAll('div.ui-grid-cell-contents', 'div.ui-grid-header-cell-primary-focus');

            _.forEach(labels, function (label) {
                label.removeAttribute('tabindex');
            });
        }

        function updateInputIndexes() {
            var inputs = document.querySelectorAll('input.ui-grid-filter-input-0');

            for (var i = 0; i < inputs.length; i++) {
                inputs[i].tabIndex = i + 1;
            }
        }

        // #endregion

        return service;
    }
})();