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
        $scope.search_results_length = $scope.products.length + $scope.brands.length + $scope.categories.length;
        $scope.loading = false;
        $scope.done = true;
      }, function() {
        $scope.loading = false;
        $scope.status = 'searchـloading_error_status';
      });
    }

    search();

    $scope.doSearch = function(query) {
      $location.path('/search/'+ query);
      search();
    }

    $rootScope.$on('languageChange', function() {
      search();
    });

  }])