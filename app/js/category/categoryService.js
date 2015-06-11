.factory('categoryService', ['$resource', '$rootScope', function($resource, $rootScope) {

  var resource = {};

  resource.getCategories = function() {
    return $resource($rootScope.endpoint + '/categories/', {}, {
      query: {
        method: 'GET',
        headers: $rootScope.headers,
        cache : true
      }
    });
  };

  resource.getCategory = function() {
    return $resource($rootScope.endpoint + '/products?category=' + ':category', { category: '@category' }, {
      get: {
        method: 'GET',
        headers: $rootScope.headers
      }
    });
  };

  resource.getCategoryChildren = function() {
    return $resource($rootScope.endpoint + '/categories/' + ':category' + '?context=true', { category: '@category' }, {
      get: {
        method: 'GET',
        headers: $rootScope.headers
      }
    });
  };

  return resource;

}])