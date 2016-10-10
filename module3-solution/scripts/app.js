(function() {
    'use strict';

    angular
        .module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .directive('loader', LoaderDirective)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

    function LoaderDirective() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'components/loader/loader.template.html'
        };

        return ddo;
    }

    function FoundItemsDirective() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'components/list/items.template.html',
            scope: {
                foundItems: '<',
                message: '@',
                loading: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true,
            link: FoundItemsDirectiveLink,
            transclude: true
        };

        return ddo;
    }

    function FoundItemsDirectiveLink(scope, element, attrs, controller) {

        scope.$watch('list.isLoading()', function (newValue, oldValue) {
            newValue ? displayLoader() : hideLoader();
        });

        function displayLoader() {
            var loaderVeil = element.find('div.loading'),
                loader = element.find('div.loading .loader');

            loader.show();
            loaderVeil.fadeIn(500);
        }

        function hideLoader() {
            var loaderVeil = element.find('div.loading'),
                loader = element.find('div.loading .loader');

            loaderVeil.fadeOut(500);
            loader.hide();
        }
    }

    function FoundItemsDirectiveController() {
        var list = this;

        list.isLoading = function() {
            return list.loading;
        };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var vm = this;

        vm.message = '';
        vm.isLoading = false;

        vm.narrowDown = function() {
            vm.message = '';
            if (!vm.searchTerm) {
                vm.message = 'Please enter key words';
                return;
            }
            vm.isLoading = true;

            var promise = MenuSearchService.getMatchedMenuItems(vm.searchTerm);

            promise.then(function(foundItems) {
                vm.found = foundItems;
                if (!vm.found.length) {
                    vm.message = 'Nothing Found';
                }
                vm.isLoading = false;
            })
            .catch(function(error) {
                console.log("Something went terribly wrong.", error);
            });
        };

        vm.removeItem = function(itemIndex) {
            vm.found.splice(itemIndex, 1);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMenuItems = function() {
            var response = $http({
                method: 'GET',
                url: ApiBasePath + '/menu_items.json'
            });

            return response;
        };

        service.getMatchedMenuItems = function(searchTerm) {
            var response = service.getMenuItems()

            return response.then(function(result) {
                var foundItems = [],
                    items = result.data.menu_items,
                    itemsLength = items.length,
                    i;

                for (i = 0; i < itemsLength; i++) {
                    var description = items[i].description;
                    if (description.toLowerCase().indexOf(searchTerm) !== -1) {
                        foundItems.push(items[i]);
                    }
                }

                return foundItems;
            });
        };
    }
}());