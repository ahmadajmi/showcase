.controller('Products', ['$scope', '$rootScope', 'productsResource', function($scope, $rootScope, productsResource, arProductsResource) {

  $scope.loading = true;

  $scope.products;
  $scope.status;

  productsResource.enResource.query()
    .$promise
    .then(function(response) {
      $scope.products = response;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
      $scope.status = 'Unable to get products, ...';
    });

  $rootScope.$on('languageChange', function(event, data) {

    $scope.loading = true;
    $scope.products;
    $scope.status;

    var resource = data.langKey === 'en' ? productsResource.enResource : productsResource.arResource;

    resource.query()
    .$promise
    .then(function(response) {
      console.log(response);
      $scope.products = response;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
      $scope.status = 'Unable to get products, ...';
    });
  });

}])
.controller('productDetails', ['$scope', 'productsResource', 'productResource', '$routeParams',
  function($scope, productsResource, productResource, $routeParams) {

    $scope.product;
    $scope.status;
    $scope.loading = true;
    $scope.done = false;
    $scope.productGTN = $routeParams.productGTN;

    productsResource.enResource.query()
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
.controller('translateController', ['$scope', '$rootScope', 'productsResource', '$translate',
  function($scope, $rootScope, productsResource, $translate) {
    $scope.changeLanguage = function(langKey) {

      $rootScope.lang = langKey;

      $rootScope.$broadcast('languageChange', {
        langKey: langKey
      });

      $translate.use(langKey);
    };
  }
])
.controller('brandDetails', ['$scope', 'brandResource', '$routeParams',
  function($scope, brandResource, $routeParams) {

    $scope.brand;
    $scope.status;
    $scope.loading = true;
    $scope.done = false;
    $scope.brandName = $routeParams.brandName;

    brandResource.get({brandName: $routeParams.brandName})
      .$promise
      .then(function(response) {
        $scope.brand = response;
        $scope.loading = false;
        $scope.done = true;
      }, function() {
        $scope.loading = false;
        $scope.status = 'Unable to get product info, ...';
      });
  }
])