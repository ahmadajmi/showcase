.controller('CategoriesController', ['$scope', '$rootScope', 'categoryService',
  function($scope, $rootScope, categoryService) {

    function getCategories() {
      return categoryService.getCategories()
      .query()
      .$promise
      .then(function(response) {
        $scope.categories = response.categories;
      }, function() {
        $scope.status = 'categoriesـloading_error_status';
      });
    }

    getCategories();

    $rootScope.$on('productsLoaded', function() {
      getCategories();
    });

}])
.controller('CategoryController', ['$scope', '$rootScope', 'categoryService', '$routeParams',
  function($scope, $rootScope, categoryService, $routeParams) {

    function getCategory() {
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
        $scope.status = 'categoryـloading_error_status';
      });
    }

    getCategory();

    $rootScope.$on('languageChange', function() {
      getCategory();
    });

  }])