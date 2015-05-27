.factory('searchService', ['$resource', '$rootScope', function($resource, $rootScope) {

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

  resource.search = function() {
    return $resource($rootScope.endpoint + '/search?query=' + ':query', { query: '@query' }, {
      get: {
        method: 'GET',
        headers: headers
      }
    });
  };

  return resource;

}])