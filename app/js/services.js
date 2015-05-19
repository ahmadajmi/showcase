.factory('productsResource', ['$resource', '$rootScope', function($resource, $rootScope) {

  var resource = {};

  var headers = {
    'Content-Type': 'application/json',
    'Accept-Language': $rootScope.lang,
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
        headers: headers,
        // cache : true
      }
    });
  };

  resource.getCategories = function() {
    return $resource($rootScope.endpoint + '/categories/', {}, {
      query: {
        method: 'GET',
        headers: headers
      }
    });
  };

  return resource;

}])
.factory('brandResource', ['$resource', '$rootScope', function($resource, $rootScope) {
  var urlBase = '../data/brand.json';
  return $resource(urlBase, {cache : true});
}])