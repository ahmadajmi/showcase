.factory('productResource', ['$resource', '$rootScope', function($resource, $rootScope) {

  var resource = {};

  resource.getProducts = function() {
    return $resource($rootScope.endpoint + '/products/', {}, {
      query: {
        method: 'GET',
        headers: $rootScope.headers,
        // cache : true
      }
    });
  };

  resource.getProduct = function() {
    return $resource($rootScope.endpoint + '/products/' + ':productGTN', { productGTN: '@productGTN' }, {
      get: {
        method: 'GET',
        headers: $rootScope.headers
      }
    });
  };

  resource.getrelatedProducts = function() {
    return $resource($rootScope.endpoint + '/products/' + ':productGTN' + 'related_products', { productGTN: '@productGTN' }, {
      get: {
        method: 'GET',
        headers: $rootScope.headers
      }
    });
  };

  resource.getJsonLd = function() {
    return $resource($rootScope.endpoint + '/json-ld/' + ':productGTN', { productGTN: '@productGTN' }, {
      get: {
        method: 'GET',
        headers: $rootScope.headers
      }
    });
  };

  return resource;

}])