App
    .factory('httpInterceptor', function ($q, $rootScope, $log, $cookies) {
        return {
            request: function (config) {

                config.headers = config.headers || {};

                config.headers = {
                    'Content-Type': 'application/json',
                    'CLIENT_ID': 'yYK6BHZC8FW7',
                    'ACCESS-TOKEN': 'yYK6BHZC8FW7'
                }

                return config || $q.when(config)

            },
            response: function (response) {

                return response || $q.when(response);
            },
            responseError: function (response) {
                if (response.status === 401) {
                    
                }
                else if (response.status === 500) {
                   
                }
                else if (response.status === 429) {
                    alert('429')
                }
                return $q.reject(response);
            }
        };
    }).config(function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    })
;