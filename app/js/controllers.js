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

      return productsResource.getProduct().get({productGTN: $routeParams.productGTN})
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
.controller('brandDetails', ['$scope', '$rootScope', 'productsResource', '$routeParams',
  function($scope, $rootScope, productsResource, $routeParams) {

    $scope.brandName = $routeParams.brandName;

    function getBrand() {
      $scope.brand;
      $scope.status;
      $scope.loading = true;
      $scope.done = false;

      return productsResource.getBrand().get({brandName: $routeParams.brandName})
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
      return productsResource.getBrandProducts().get({brandName: $routeParams.brandName})
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
.controller('categoryDetails', ['$scope', '$rootScope', 'productsResource', '$routeParams',
  function($scope, $rootScope, productsResource, $routeParams) {

    function getCategory() {
      $scope.product;
      $scope.status;
      $scope.loading = true;
      $scope.done = false;
      $scope.categoryName = $routeParams.categoryName;

      return productsResource.getCategory().get({productGTN: $routeParams.categoryName})
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
.controller('jsonLD', ['$scope', '$rootScope', 'productsResource', '$routeParams',
  function($scope, $rootScope, productsResource, $routeParams) {

    function getJsonLd() {
      return productsResource.getJsonLd().get({productGTN: $routeParams.productGTN})
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
.controller('Categories', ['$scope', '$rootScope', 'productsResource',
  function($scope, $rootScope, productsResource) {

    function getCategories() {
      return productsResource.getCategories()
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
.controller('Search', ['$scope', '$rootScope',
  function($scope, $rootScope) {

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