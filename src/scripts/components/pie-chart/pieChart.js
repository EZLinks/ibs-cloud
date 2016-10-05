(function () {
    'use strict';
    
    angular
        .module('ibs.cloud')
        .directive('pieChart', pieChart);
    
    pieChart.$inject = [];
    
    function pieChart() {
        // Usage:
        //     <pie-chart></pie-chart>
        // Creates:
        // 
        var directive = {
            link: link,
            controller: Controller,
            controllerAs: 'pc',
            templateUrl: 'scripts/components/pie-chart/pie-chart.html',
            restrict: 'EA',
            bindToController: true,
            scope: {
                dataCall: '&pcDataCall'
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
        
        function init() {
            vm.dataCall().then(function (data) {
                // chart object construction is done here to prevent error messages from being displayed.
                vm.chart = {
                    type: 'PieChart',
                    data: [['Category', 'number']].concat(data),
                    options: {
                        legend: {
                            position: 'top',
                            alignment: 'center'
                        },
                        tooltip: {
                            trigger: 'none'
                        },
                        pieStartAngle: 150,
                        pieSliceText: 'none',
                        colors: CHART_COLORS
                    }
                };
            });
        }

        // #endregion
    }

})();