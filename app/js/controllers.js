.controller('Products', ['$scope', 'productsResource', function($scope, productsResource) {

  $scope.foo = {};

  $scope.loading = true;

  $scope.products;
  $scope.status;

  productsResource.query()
    .$promise
    .then(function(response) {
      $scope.products = response;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
      $scope.status = 'Unable to get products, ...';
    });

  $scope.getDetails = function(id) {
    productsResource.get({product: id})
      .$promise
      .then(function(response) {
        console.log(response);
      }, function() {
        console.log('err');
      });
  };

}])
.controller('productDetails', ['$scope', 'productsResource', 'productResource', '$routeParams',
  function($scope, productsResource, productResource, $routeParams) {

    $scope.product;
    $scope.status;
    $scope.loading = true;
    $scope.done = false;
    $scope.productGTN = $routeParams.productGTN;

    productsResource.query()
    .$promise
    .then(function(response) {
      $scope.product = response;

      $scope.product.forEach(function(product) {
        if ($scope.productGTN == product.gtin.value) {
          $scope.product = product;
        }
      });

      $scope.loading = false;
    }, function() {
      $scope.loading = false;
      $scope.status = 'Unable to get product, ...';
    });

    productResource.get({productGTN: $routeParams.productGTN})
      .$promise
      .then(function(response) {
        $scope.productDetail = response;
        $scope.loading = false;
        $scope.done = true;
      }, function() {
        $scope.loading = false;
        $scope.status = 'Unable to get product info, ...';
      });
  }
])
.controller('translateController', ['$scope', '$rootScope', '$controller', 'productsResource', '$translate',
  function($scope, $rootScope, $controller, productsResource, $translate) {
    $scope.changeLanguage = function(langKey) {

      $controller('Products', {$scope: $scope});

      $rootScope.lang = langKey;

      $translate.use(langKey);
      document.documentElement.setAttribute('lang', langKey);
    };
  }
])