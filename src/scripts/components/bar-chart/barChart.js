(function () {
    'use strict';

    angular
        .module('ibs.cloud')
        .directive('barChart', barChart);
    
    barChart.$inject = [];
    
    function barChart() {
        // Usage:
        //     <bar-chart></bar-chart>
        // Creates:
        // 
        var directive = {
            link: link,
            controller: Controller,
            controllerAs: 'bc',
            templateUrl: 'scripts/components/bar-chart/bar-chart.html',
            restrict: 'EA',
            bindToController: true,
            scope: {
                dataCall: '&bcDataCall'
            }
        };
        
        function link(scope, element, attrs) {
        }
        
        return directive;
    }
    
    Controller.$inject = [
        'CHART_COLORS'
    ];
    
    function Controller(
        CHART_COLORS
    ) {
        // #region Properties

        var vm = this;
               
        // #endregion

        // #region Function Calls

        init();

        // #region

        // #region Function Declarations

        function init(){
            vm.dataCall().then(function (data) {
                // chart object construction is done here to prevent error messages from being displayed.
                vm.chart = {
                    data: [['Category', 'amount', { role: 'annotation' }]].concat(data),
                    type: 'BarChart',
                    options: {
                        legend: 'none',
                        colors: CHART_COLORS,
                        hAxis : {
                            textPosition: 'none',
                            gridlines: {
                                color: 'transparent'
                            }
                        }
                    }
                };
            });
        }

        // #endregion
    }

})();