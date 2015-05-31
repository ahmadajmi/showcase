.controller('BrandController', ['$scope', '$rootScope', 'brandService', '$routeParams',
  function($scope, $rootScope, brandService, $routeParams) {

    function getBrand() {
      $scope.loading = true;
      $scope.done = false;

      return brandService.getBrand().get({brand: $routeParams.brand})
      .$promise
      .then(function(response) {
        $scope.brand = response.brand;
        $scope.loading = false;
        $scope.done = true;
      }, function() {
        $scope.loading = false;
        $scope.status = 'brandـloading_error_status';
      });
    }

    function getBrandProducts() {
      $scope.products;
      $scope.productsStatus;
      return brandService.getBrandProducts().get({brand: $routeParams.brand})
      .$promise
      .then(function(response) {
        $scope.products = response.products;
      }, function() {
        $scope.productsStatus = 'brandـproducts_loading_error_status';
      });
    }

    getBrand();
    getBrandProducts();

    $rootScope.$on('languageChange', function() {
      getBrand();
      getBrandProducts();
    });

  }])