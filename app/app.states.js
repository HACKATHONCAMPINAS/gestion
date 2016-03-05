GestionApp
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/dashboard', '/')
                .otherwise('/');

            $stateProvider
                .state("error", {
                    url: "/error",
                    templateUrl: 'app/views/error.html'
                })
                .state("error.404", {
                    url: "/404",
                    templateUrl: 'app/components/pages/error_404View.html'
                })
                .state("error.500", {
                    url: "/500",
                    templateUrl: 'app/components/pages/error_500View.html'
                })
                .state("login", {
                    url: "/login",
                    templateUrl: 'app/views/login.html',
                    controller: 'loginController',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                //'lazy_iCheck',
                                //'lazy_parsleyjs',
                                //'lazy_mask',
                                'app/controllers/loginController.js',
                                'app/services/loginService.js'
                            ]);
                        }]
                    }
                })   
        }
    ]);
