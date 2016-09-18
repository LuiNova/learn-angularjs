(function() {
    'use strict';

    angular.module('LunchCheck', [])

        .controller('LunchCheckController', LunchCheckController);

        LunchCheckController.$inject = ['$scope'];

        function LunchCheckController($scope) {

            // Note: we could use Array.prototype.filter
            // but it is not supported in IE8
            var _cleanArray = function(arr) {
                var i,
                    arrLength = arr.length,
                    cleanArray = [];

                for (i = 0; i < arrLength; i++) {
                    if (!!arr[i].trim()) {
                        cleanArray.push(arr[i]);
                    }
                }

                return cleanArray;
            };

            var _updateProperties = function(n) {

                if (n === 0) {
                    $scope.lunchAlert = 'has-warning';
                    $scope.lunchMessage = 'Please enter data first';
                } else if (n <= 3) {
                    $scope.lunchAlert = 'has-success';
                    $scope.lunchMessage = 'Enjoy!';
                } else {
                    $scope.lunchAlert = 'has-error';
                    $scope.lunchMessage = 'Too much!';
                }
            };

            $scope.lunchItems = '';
            $scope.lunchAlert = '';
            $scope.lunchMessage = '';

            $scope.checkLunch = function() {
                var itemsArray = _cleanArray($scope.lunchItems.split(',')),
                    totalItems = itemsArray.length;

                _updateProperties(totalItems);
            };
        }
}());