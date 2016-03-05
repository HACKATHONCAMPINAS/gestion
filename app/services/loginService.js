(function () {
    'use strict';

    angular.module('GestionApp').service('mainService', function ($http, $rootScope) {

        this.ObterDominio = function () {
           
            config.headers = {
                'Content-Type': 'application/json',
                'AUTH-TOKEN': $cookies.get("AUTH-TOKEN")
            }

            return $http.get("http://api.ima.sp.gov.br/v1/atendimento", { params: { offset: 0, limit: 100 } })
        }

    });
})();