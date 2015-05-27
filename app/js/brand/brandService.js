.factory('brandService', ['$resource', '$rootScope', function($resource, $rootScope) {

  var resource = {};

  resource.getBrand = function() {
    return $resource($rootScope.endpoint + '/brands/' + ':brand', { brand: '@brand' }, {
      get: {
        method: 'GET',
        headers: $rootScope.headers
      }
    });
  };

  resource.getBrandProducts = function() {
    return $resource($rootScope.endpoint + '/products?brand=' + ':brand', { brand: '@brand' }, {
      get: {
        method: 'GET',
        headers: $rootScope.headers
      }
    });
  };

  return resource;

}])