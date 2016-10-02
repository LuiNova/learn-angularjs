(function() {
    'use strict';

    var shoppingList = [{
        name: 'Cookies',
        quantity: 10
    }, {
        name: 'Milk',
        quantity: 2
    }, {
        name: "Donuts",
        quantity: 200
    }, {
        name: "Chocolate",
        quantity: 5
    }, {
        name: 'Chips',
        quantity: 3
    }];

    angular
        .module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var vm = this;

        vm.items = ShoppingListCheckOffService.getToBuyItems();

        vm.boughtItem = function(itemIndex) {
            ShoppingListCheckOffService.boughtItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var vm = this;

        vm.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this,
            toBuyItems = [],
            alreadyBoughtItems = [];

        if (shoppingList.length) {
            toBuyItems = shoppingList;
        }

        /**
         * These methods (i.e. add, remove) are not needed for assigment
         * but breaks functioanlity apart and we could add a addItem form
         * to the To Buy list HTML
         */
        service.addToBuyItem = function(item) {
            toBuyItems.push(item);
        }

        service.removeToBuyItem = function(itemIndex) {
            toBuyItems.splice(itemIndex, 1);
        }

        service.addAlreadyBoughtItem = function(item) {
            alreadyBoughtItems.push(item);
        }

        service.boughtItem = function(itemIndex) {
            // Store the item that was bought
            var alreadyBoughtItem = toBuyItems[itemIndex];

            service.removeToBuyItem(itemIndex);
            service.addAlreadyBoughtItem(alreadyBoughtItem);
        }

        service.getToBuyItems = function() {
            return toBuyItems;
        }

        service.getAlreadyBoughtItems = function() {
            return alreadyBoughtItems;
        }
    }
}());