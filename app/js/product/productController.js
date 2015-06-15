.controller('ProductsController', ['$scope', '$rootScope', '$translate', 'productResource',
  function($scope, $rootScope, $translate, productResource) {

    function getProducts() {
      $scope.loading = true;

      return productResource.getProducts().query()
      .$promise
      .then(function(response) {
        $scope.products = response.products;
        $scope.loading = false;
      }, function() {
        $scope.loading = false;
        $scope.status = 'productsـloading_error_status';
      });
    }

    getProducts();

    $rootScope.$on('languageChange', function() {
      getProducts();
    });

  }])
.controller('ProductController', ['$scope', '$rootScope', 'productResource', '$routeParams',
  function($scope, $rootScope, productResource, $routeParams) {

    function getProduct() {
      $scope.loading = true;
      $scope.done = false;
      $scope.productGTN = $routeParams.productGTN;

      return productResource.getProduct().get({productGTN: $routeParams.productGTN})
      .$promise
      .then(function(response) {
        $scope.product = response.product;
        $scope.productGTIN = response.product.gtin;
        $scope.mainPhoto = response.product.photos.value_large[0];
        $scope.small_photos = response.product.photos.value_small;
        $scope.large_photos = response.product.photos.value_large;
        $scope.loading = false;
        $scope.done = true;
      }, function() {
        $scope.loading = false;
        $scope.status = 'productـloading_error_status';
      });
    }

    function getRelatedProducts() {
      $scope.related_products;
      $scope.productsStatus;
      return productResource.getrelatedProducts().get({productGTN: $routeParams.productGTN})
      .$promise
      .then(function(response) {
        $scope.related_products = response.products;
      }, function() {
        $scope.productsStatus = 'Unable to get brand products';
      });
    }

    getProduct();
    getRelatedProducts()

    $rootScope.$on('languageChange', function() {
      getProduct();
      getRelatedProducts();
    });

    $scope.setMainPhoto = function(index) {
      $scope.mainPhoto = $scope.large_photos[index];
    }

  }])

.controller('JsonLDController', ['$scope', '$rootScope', 'productResource', '$routeParams',
  function($scope, $rootScope, productResource, $routeParams) {

    function getJsonLd() {
      return productResource.getJsonLd().get({productGTN: $routeParams.productGTN})
      .$promise
      .then(function(response) {
        $scope.json = response;
        document.getElementById("jsonld").innerHTML = JSON.stringify(response);
      }, function() {
        $scope.json = 'Unable to get jsonld info.';
      });
    }

    getJsonLd();

    $rootScope.$on('languageChange', function() {
      getJsonLd();
    });

  }])