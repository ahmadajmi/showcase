.controller('SearchController', ['$scope', '$rootScope', '$location', '$routeParams', 'searchService',
  function($scope, $rootScope, $location, $routeParams, searchService) {

    $scope.query = $scope.query || $routeParams.query;

    function search() {

      $scope.loading = true;
      $scope.done = false;

      return searchService.search().get({query: $scope.query})
      .$promise
      .then(function(response) {

        $scope.products = response.products;
        $scope.brands = response.brands;
        $scope.categories = response.categories;

        $scope.loading = false;
        $scope.done = true;

      }, function() {
        $scope.loading = false;
        $scope.status = 'Unable to do search';
      });
    }

    search();

    $scope.doSearch = function(query) {
      $location.path('/search/'+ query);
      search();
    }

  }])