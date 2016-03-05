(function () {
    'use strict';

    angular.module('GestionApp').service('loginService', function ($http, $rootScope) {

        this.login = function (login) {
            $rootScope.content_preloader_show();
            return $http.get(param.path.wsPath.concat('/api/Account/Login/'), { params: { username: login.Username, password: login.Password, staySignedIn: login.staySignedIn } })
        }

    });
})();