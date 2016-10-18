(function() {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // Set up UI states
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'src/menu/templates/home.template.html'
            })

            .state('categories', {
                url: '/categories',
                templateUrl: 'src/menu/templates/all-categories.template.html',
                controller: 'AllCategoriesController as categoryMenu',
                resolve: {
                    categoryMenu: ['MenuDataService', function(MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })

            .state('items', {
                url: '/categories/{categoryShortName}',
                templateUrl: 'src/menu/templates/category-items.template.html',
                controller: 'CategoryItemsController as itemMenu',
                resolve: {
                    itemMenu: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }]
                }
            });
    }
}());