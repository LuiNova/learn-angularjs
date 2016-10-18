(function() {
    'use strict';

    angular
        .module('MenuApp')
        .controller('CategoryItemsController', CategoryItemsController);

    CategoryItemsController.$inject = ['itemMenu'];
    function CategoryItemsController(itemMenu) {
        var self = this;

        self.categoryName = itemMenu.data.category.name;
        self.items = itemMenu.data.menu_items;
    }

}());