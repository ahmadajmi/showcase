.controller('Products', ['$scope', '$rootScope', 'productsResource',
  function($scope, $rootScope, productsResource, arProductsResource) {

    function getProducts() {
      $scope.products;
      $scope.status;
      $scope.loading = true;

      return productsResource.getProducts().query()
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
.controller('productDetails', ['$scope', '$rootScope', 'productsResource', '$routeParams',
  function($scope, $rootScope, productsResource, $routeParams) {

    function getProduct() {
      $scope.product;
      $scope.status;
      $scope.loading = true;
      $scope.done = false;
      $scope.productGTN = $routeParams.productGTN;

      return  productsResource.getProduct().get({productGTN: $routeParams.productGTN})
      .$promise
      .then(function(response) {
        $scope.product = response.product;
        $scope.mainPhoto = 'images/pepsi5.jpg';
        $scope.product.photos = [
          $scope.mainPhoto,
          'images/pepsi2.jpg',
          'images/pepsi3.jpg'
        ];
        // $scope.mainPhoto = response.product.photos.value[0];
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
.controller('brandDetails', ['$scope', 'brandResource', '$routeParams',
  function($scope, brandResource, $routeParams) {

    $scope.brand;
    $scope.status;
    $scope.loading = true;
    $scope.done = false;
    $scope.brandName = $routeParams.brandName;

    return brandResource.get({brandName: $routeParams.brandName})
    .$promise
    .then(function(response) {
      $scope.brand = response;
      $scope.loading = false;
      $scope.done = true;
    }, function() {
      $scope.loading = false;
      $scope.status = 'Unable to get brand info, ...';
    });

  }])
.controller('Categories', ['$scope', '$rootScope', 'productsResource',
  function($scope, $rootScope, productsResource) {

    function getCategories() {
      return productsResource.getCategories()
      .query()
      .$promise
      .then(function(response) {
        $scope.categories = response.categories.slice(0,15);
      }, function() {
        $scope.status = 'Unable to get Categories';
      });
    }

    $rootScope.$on('productsLoaded', function(event) {
      getCategories();
    });

  }])
.controller('translateController', ['$scope', '$rootScope', 'productsResource', '$translate',
  function($scope, $rootScope, productsResource, $translate) {

    $scope.changeLanguage = function(langKey) {
      $rootScope.lang = langKey;

      $rootScope.default_float = langKey === 'ar' ? 'right' : 'left';
      $rootScope.opposite_float = langKey === 'ar' ? 'left' : 'right';

      $rootScope.$broadcast('languageChange', {
        langKey: langKey
      });

      $translate.use(langKey);
    };

  }])
.controller('MenuCtrl', ['$scope', function($scope) {

  $scope.menuOpened = false;

  $scope.toggleMenu = function(event) {
    $scope.menuOpened = !($scope.menuOpened);
    event.stopPropagation();
  };

  window.onclick = function() {
    if ($scope.menuOpened) {
      $scope.menuOpened = false;
      $scope.$apply();
    }
  }

}])