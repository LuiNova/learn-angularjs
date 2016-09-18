(function() {
    'use strict';

    angular.module('NameCalculator', [])

        .controller('NameCalculatorController', function($scope) {

            var _calculateNumericForString = function(s) {
                var totalStringValue = 0,
                    stringLength = s.length,
                    i;

                for (i = 0; i < stringLength; i++) {
                    totalStringValue += s.charCodeAt(i);
                }

                return totalStringValue;
            };

            $scope.name = '';
            $scope.totalValue = 0;

            $scope.displayNumeric = function() {
                var totalNameValue = _calculateNumericForString($scope.name);
                $scope.totalValue = totalNameValue;
            };
        });
}());