.controller('Categories', ['$scope', '$rootScope', 'categoryService',
  function($scope, $rootScope, categoryService) {

    function getCategories() {
      return categoryService.getCategories()
      .query()
      .$promise
      .then(function(response) {
        $scope.categories = response.categories;

      }, function() {
        $scope.status = 'Unable to get Categories';
      });
    }

    getCategories();

    // $rootScope.$on('productsLoaded', function(event) {
    //   getCategories();
    // });

}])
.controller('categoryDetails', ['$scope', '$rootScope', 'categoryService', '$routeParams',
  function($scope, $rootScope, categoryService, $routeParams) {

    function getCategory() {
      $scope.product;
      $scope.status;
      $scope.loading = true;
      $scope.done = false;
      $scope.category = $routeParams.category.replace(/\-/g, '/');

      return categoryService.getCategory().get({category: $scope.category})
      .$promise
      .then(function(response) {
        $scope.products = response.products;
        $scope.loading = false;
        $scope.done = true;
      }, function() {
        $scope.loading = false;
        $scope.status = 'Unable to get product info, ...';
      });
    }

    getCategory();

    $rootScope.$on('languageChange', function(event, data) {
      getCategory();
    });

  }])