(function () {
    'use strict';

    App.controller('mainController', ['$rootScope', '$scope', '$cookies', 'mainService', function ($rootScope, $scope, $cookies, mainService) {

        $scope.lista = []
        $scope.offset = 0;
        $scope.bairros = [];
        $scope.data = [];

        $scope.loadChart = function () {
           
            google.charts.load('current', { 'packages': ['corechart'] });
            
            google.charts.setOnLoadCallback(drawChart);

            var width = jQuery(window).width();
          
            function drawChart() {

                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Topping');
                data.addColumn('number', 'Slices');
                data.addRows([
                  [$scope.bairros[0].nomeBairro, $scope.bairros[0].ocorrencia],
                  [$scope.bairros[1].nomeBairro, $scope.bairros[1].ocorrencia],
                  [$scope.bairros[2].nomeBairro, $scope.bairros[2].ocorrencia],
                  [$scope.bairros[3].nomeBairro, $scope.bairros[3].ocorrencia],
                  [$scope.bairros[4].nomeBairro, $scope.bairros[4].ocorrencia]
                ]);

                var options = {                    
                    'width': width,
                    'height': 500,
                    'legend': 'bottom',
                };

                // Instantiate and draw our chart, passing in some options.
                var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                chart.draw(data, options);
            }
            
        }

        $scope.ObterDominio = function () {
            var b = []

            mainService.ObterDominio($scope.offset, 100).then(function (result) {
                $scope.lista.push(result.data)
                
                if ($scope.offset < 100) {
                    $scope.offset += 100
                    $scope.ObterDominio()
                    console.log(result.data)
                } else {   
                    $.each($scope.lista, function (k, v) {
                        $.each(v, function (key, value) {
                            b.push(value);
                        })
                    })

                    var grouped = _.groupBy(b, 'nomeBairro');

                    b = []

                    $.each(grouped, function (k, v) {
                        b.push({ nomeBairro: k, ocorrencia: v.length })
                    })
                        
                    b = _.sortBy(b, 'ocorrencia');

                    for (var i = b.length; i > (b.length - 5) ; i--) {
                        $scope.bairros.push(b[i - 1])                        
                    }

                    $scope.loadChart()
                }
            })          
        }

        $scope.ObterDominio()
    }]);
})();