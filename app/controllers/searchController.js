
(function () {
    'use strict';

    App.controller('searchController', ['$rootScope', '$scope', '$cookies', 'searchService', function ($rootScope, $scope, $cookies, searchService) {
        $scope.bairro = null;
        $scope.lista = []
        $scope.offset = 0;
        $scope.bairros = [];       
        $scope.ocorrencia = 0;

        $scope.Buscar = function () {

            var b = []

            searchService.Buscar($scope.offset, 100, $scope.bairro).then(function (result) {
               
                    $scope.lista.push(result.data)

                    if ($scope.offset < 1000) {
                        $scope.offset += 100
                        $scope.Buscar()
                    } else {
                        $.each($scope.lista, function (k, v) {
                            $.each(v, function (key, value) {
                                b.push(value);
                            })
                        })

                        $scope.ocorrencia = _.groupBy(b, 'nomeBairro')[$scope.bairro].length;

                        $('#login').hide()
                        $('#resultado').show()
                        //b = []

                        //$.each(grouped, function (k, v) {
                        //    b.push({ nomeBairro: k, ocorrencia: v.length })
                        //})

                        //b = _.sortBy(b, 'ocorrencia');

                        //for (var i = b.length; i > (b.length - 5) ; i--) {
                        //    $scope.bairros.push(b[i - 1])
                        //}

                        //$scope.loadChart()
                    }                

            })
        }

        $scope.NovaBusca = function () {
            $scope.bairro = null;
            $('#resultado').hide()
            $('#login').show()
        }
    }]);
})();