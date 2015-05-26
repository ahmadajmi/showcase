.controller('BrandController', ['$scope', '$rootScope', 'brandService', '$routeParams',
  function($scope, $rootScope, brandService, $routeParams) {

    $scope.brandName = $routeParams.brandName;

    function getBrand() {
      $scope.brand;
      $scope.status;
      $scope.loading = true;
      $scope.done = false;

      return brandService.getBrand().get({brandName: $routeParams.brandName})
      .$promise
      .then(function(response) {
        $scope.brand = response.brand;
        $scope.loading = false;
        $scope.done = true;
      }, function() {
        $scope.loading = false;
        $scope.status = 'Unable to get brand info, ...';
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
        $scope.productsStatus = 'Unable to get brand products';
      });
    }

    getBrand();
    getBrandProducts();

    $rootScope.$on('languageChange', function(event, data) {
      getBrand();
      getBrandProducts();
    });

  }])