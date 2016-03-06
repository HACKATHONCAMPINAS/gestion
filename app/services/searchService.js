(function () {
    'use strict';

    angular.module('GestionApp').service('searchService', function ($http, $rootScope) {
        this.Buscar = function (offset, limit, bairro) {
            return $http.get("http://api.ima.sp.gov.br/v1/atendimento", { params: { offset: offset, limit: limit, fields: 'nomeBairro', filters: 'nomeBairro:' + bairro } })
        }
    });
})();