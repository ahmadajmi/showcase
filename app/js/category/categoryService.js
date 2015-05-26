.factory('categoryService', ['$resource', '$rootScope', function($resource, $rootScope) {

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

  resource.getCategories = function() {
    return $resource($rootScope.endpoint + '/categories/', {}, {
      query: {
        method: 'GET',
        headers: headers,
        cache : true
      }
    });
  };

  resource.getCategory = function() {
    return $resource($rootScope.endpoint + '/products?category=' + ':brandName', { categoryName: '@categoryName' }, {
      get: {
        method: 'GET',
        headers: headers
      }
    });
  };

  return resource;

}])