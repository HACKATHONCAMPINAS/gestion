
(function () {
    'use strict';

    App.controller('menuController', ['$rootScope', '$scope', '$cookies', function ($rootScope, $scope, $cookies) {

        $scope.Buscar = function () {
            if ($cookies.get('USERNAME')) {
                window.location.href = '#/search'
            } else {
                window.location.href = '#/login'
            }
        }

        $scope.BuscarFavorito = function () {
            if ($cookies.get('USERNAME')) {
                window.location.href = '#/favoritos'
            } else {
                window.location.href = '#/login'
            }
        }
    }]);
})();