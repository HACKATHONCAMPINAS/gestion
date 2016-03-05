/* ocLazyLoad config */

GestionApp
    .config([
        '$ocLazyLoadProvider',
        function ($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                debug: false,
                events: false,
                modules: [
                  
                    {
                        name: 'lazy_autosize',
                        files: [
                            'bower_components/autosize/dist/autosize.js',
                            'app/modules/angular-autosize.js'
                        ],
                        serie: true
                    }                 
                ]
            })
        }
    ]);