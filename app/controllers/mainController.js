
angular.module('GestionApp').controller('mainController', [
    '$scope',
    '$rootScope',
    '$location',
    'utils',
    'mainService',
    function ($scope, $rootScope, $location, utils, mainService) {

        $scope.ObterDominio = function () {
            mainService.ObterDominio().then(function (result) {
                if (result.data) {
                    // popula combo ou qualquer outra coisas
                }

            })
        }
    }]);