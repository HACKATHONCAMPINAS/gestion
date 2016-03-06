(function () {
    'use strict';

    angular.module('GestionApp').service('registerService', function ($http, $rootScope) {
        this.ObterDominio = function (offset, limit) {
            return $http.get("http://api.ima.sp.gov.br/v1/atendimento", { params: { offset: offset, limit: limit, fields: 'nomeBairro', filters: 'codigoAssunto:1271' } })
        }
    });
})();