.factory('searchService', ['$resource', '$rootScope', function($resource, $rootScope) {

  var resource = {};

  resource.search = function() {
    return $resource($rootScope.endpoint + '/search?query=' + ':query', { query: '@query' }, {
      get: {
        method: 'GET',
        headers: $rootScope.headers
      }
    });
  };

  return resource;

}])