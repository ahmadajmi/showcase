.controller('Products', ['$scope', '$rootScope', 'productResource',
  function($scope, $rootScope, productResource, arproductResource) {

    function getProducts() {
      $scope.products;
      $scope.status;
      $scope.loading = true;

      return productResource.getProducts().query()
      .$promise
      .then(function(response) {
        $scope.products = response.products;
        $scope.loading = false;
        $rootScope.$broadcast('productsLoaded');
      }, function() {
        $scope.loading = false;
        $scope.status = 'Unable to get products, ...';
      });
    }

    getProducts();

    $rootScope.$on('languageChange', function(event, data) {
      getProducts();
    });

  }])
.controller('productDetails', ['$scope', '$rootScope', 'productResource', '$routeParams',
  function($scope, $rootScope, productResource, $routeParams) {

    function getProduct() {
      $scope.product;
      $scope.status;
      $scope.loading = true;
      $scope.done = false;
      $scope.productGTN = $routeParams.productGTN;

      return productResource.getProduct().get({productGTN: $routeParams.productGTN})
      .$promise
      .then(function(response) {
        $scope.product = response.product;
        $scope.mainPhoto = response.product.photos.value[0];
        $scope.product.photos = response.product.photos.value;
        $scope.loading = false;
        $scope.done = true;
      }, function() {
        $scope.loading = false;
        $scope.status = 'Unable to get product info, ...';
      });
    }

    getProduct();

    $rootScope.$on('languageChange', function(event, data) {
      getProduct();
    });

    $scope.setMainPhoto = function(photo) {
      $scope.mainPhoto = photo;
    }

  }])

.controller('jsonLD', ['$scope', '$rootScope', 'productResource', '$routeParams',
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

    $rootScope.$on('languageChange', function(event, data) {
      getJsonLd();
    });

  }])