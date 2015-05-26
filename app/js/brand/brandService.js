.factory('brandService', ['$resource', '$rootScope', function($resource, $rootScope) {

  var resource = {};

  var headers = {
    'Content-Type': 'application/json',
    'Accept-Language': $rootScope.lang,
    'Accept': 'application/json',
    'Authorization': 'Token token="' + $rootScope.token + '"'
  };

  $rootScope.$on('languageChange', function(event, data) {
    headers['Accept-Language'] = data.langKey;
  });

  resource.getBrand = function() {
    return $resource($rootScope.endpoint + '/brands/' + ':brandName', { brandName: '@brandName' }, {
      get: {
        method: 'GET',
        headers: headers
      }
    });
  };

  resource.getBrandProducts = function() {
    return $resource($rootScope.endpoint + '/products?brand=' + ':brandName', { brandName: '@brandName' }, {
      get: {
        method: 'GET',
        headers: headers
      }
    });
  };

  return resource;

}])