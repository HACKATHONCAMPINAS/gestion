
(function () {
    'use strict';

    App.controller('loginController', ['$rootScope', '$scope', '$cookies', 'loginService', function ($rootScope, $scope, $cookies, loginService) {
        $scope.username = null;
        $scope.password = null;

        $scope.Login = function () {
            $cookies.put('USERNAME', $scope.username)
            window.location.href = '#/'
        }
    }]);
})();