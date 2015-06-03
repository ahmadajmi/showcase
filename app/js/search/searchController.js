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

    // Execute search() only on search page
    // We need this because we use the same controller `SearchController` for the search form
    // So when SearchController is used in the form, this controller will be loaded
    // So this will prevent search() to be loaded in every page
    if ($location.$$path.indexOf('/search/') == 0) {
      search();
    }

    // Search form submit action
    $scope.doSearch = function(query) {
      $location.path('/search/'+ query);
      search();
    }

    $rootScope.$on('languageChange', function() {
      search();
    });

  }])