.factory('productResource', ['$resource', '$rootScope', function($resource, $rootScope) {

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

  resource.getProducts = function() {
    return $resource($rootScope.endpoint + '/products/', {}, {
      query: {
        method: 'GET',
        headers: headers,
        // cache : true
      }
    });
  };

  resource.getProduct = function() {
    return $resource($rootScope.endpoint + '/products/' + ':productGTN', { productGTN: '@productGTN' }, {
      get: {
        method: 'GET',
        headers: headers
      }
    });
  };

  resource.getJsonLd = function() {
    return $resource($rootScope.endpoint + '/json-ld/' + ':productGTN', { productGTN: '@productGTN' }, {
      get: {
        method: 'GET',
        headers: headers
      }
    });
  };

  return resource;

}])