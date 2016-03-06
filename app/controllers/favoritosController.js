
(function () {
    'use strict';

    App.controller('favoritosController', ['$rootScope', '$scope', '$cookies', function ($rootScope, $scope, $cookies) {
        $scope.bairro = null;

        $scope.Obter = function () {
            $cookies.put('USERNAME', $scope.username)
            window.location.href = '#/'
        }


        $scope.Adicionar = function () {

            var data = []
            if ($cookies.get('FAVORITOS')) {
                data = $.parseJSON($cookies.get('FAVORITOS'));
                data.push({ bairro: $scope.bairro, data: '06/03/2015' })

                $('#todo-table').append('<td><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select mdl-js-ripple-effect--ignore-events is-upgraded" data-upgraded=",MaterialCheckbox,MaterialRipple"><input type="checkbox" class="mdl-checkbox__input"><span class="mdl-checkbox__focus-helper"></span><span class="mdl-checkbox__box-outline"><span class="mdl-checkbox__tick-outline"></span></span><span class="mdl-checkbox__ripple-container mdl-js-ripple-effect mdl-ripple--center" data-upgraded=",MaterialRipple"><span class="mdl-ripple"></span></span></label></td>' +
                       '<td class="mdl-data-table__cell--non-numeric">' + $scope.bairro + '</td>' +
                       '<td class="mdl-data-table__cell--non-numeric">06/03/2015</td>')

                $('#todo-table').show()
            } else {
                data.push({ bairro: $scope.bairro, data: '06/03/2015' })
                $cookies.put('FAVORITOS', JSON.stringify(data))
                $('#todo-table').show()
                //$.each(data, function (k, v) {
                    $('#todo-table').append('<td><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select mdl-js-ripple-effect--ignore-events is-upgraded" data-upgraded=",MaterialCheckbox,MaterialRipple"><input type="checkbox" class="mdl-checkbox__input"><span class="mdl-checkbox__focus-helper"></span><span class="mdl-checkbox__box-outline"><span class="mdl-checkbox__tick-outline"></span></span><span class="mdl-checkbox__ripple-container mdl-js-ripple-effect mdl-ripple--center" data-upgraded=",MaterialRipple"><span class="mdl-ripple"></span></span></label></td>' +
                        '<td class="mdl-data-table__cell--non-numeric">' + $scope.bairro + '</td>' +
                        '<td class="mdl-data-table__cell--non-numeric">06/03/2015</td>')
                //})
            }
            $cookies.put('USERNAME', $scope.username)
        }

        $scope.Init = function () {
            if ($cookies.get('FAVORITOS')) {
                var data = $.parseJSON($cookies.get('FAVORITOS'));

                if (data.length > 0)
                {
                    $.each(data, function (k, v) {
                        $('#todo-table').append('<td><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select mdl-js-ripple-effect--ignore-events is-upgraded" data-upgraded=",MaterialCheckbox,MaterialRipple"><input type="checkbox" class="mdl-checkbox__input"><span class="mdl-checkbox__focus-helper"></span><span class="mdl-checkbox__box-outline"><span class="mdl-checkbox__tick-outline"></span></span><span class="mdl-checkbox__ripple-container mdl-js-ripple-effect mdl-ripple--center" data-upgraded=",MaterialRipple"><span class="mdl-ripple"></span></span></label></td>' +
                       '<td class="mdl-data-table__cell--non-numeric">' + data[k].bairro + '</td>' +
                       '<td class="mdl-data-table__cell--non-numeric">' + data[k].data  + '</td>')

                        $('#todo-table').show()
                    })
                }    
            }
        }

        $scope.Init()
    }]);
})();