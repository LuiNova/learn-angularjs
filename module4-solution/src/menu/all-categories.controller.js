(function() {
    'use strict';

    angular
        .module('MenuApp')
        .controller('AllCategoriesController', AllCategoriesController);

    AllCategoriesController.$inject = ['categoryMenu'];
    function AllCategoriesController(categoryMenu) {
        var self = this;
        self.categories = categoryMenu.data;
    }

}());