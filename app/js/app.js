'use strict';

angular.module('GS1', [
  'ngResource',
  'ngRoute',
  'pascalprecht.translate'
])
.run(['$rootScope', function($rootScope){
  $rootScope.appName = 'GS1 SHOWCASE';
  $rootScope.lang = 'en';
}])
.config(['$routeProvider', '$locationProvider', '$translateProvider',
  function($routeProvider, $locationProvider, $translateProvider) {
    $routeProvider
      .when('/', {
        controller: 'Products',
        templateUrl: 'partials/products-list.html'
      })
      .when('/product/:productGTN', {
        controller: 'productDetails',
        templateUrl: 'partials/product.html'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });

    $translateProvider.translations('en', {
      'home': 'Home',
      'by': 'by',
      'manufactured_by': 'Manufactured by',
      'made_in': 'Made In',
      'material': 'Material',
      'style': 'Style',
      'dimensions': 'Dimensions',
      'category': 'Category',
      'specifications': 'Specifications',
      'related_products': 'Related Products',
      'button_view_supplier_page': 'View Supplier Page',
      'button_lang_ar': 'Arabic',
      'button_lang_en': 'English'
    })
    .translations('ar', {
      'home': 'الرئيسية',
      'by': 'بواسطة',
      'manufactured_by': 'مصنعة من قبل',
      'made_in': 'صنع في',
      'material': 'مادة',
      'style': 'أسلوب',
      'dimensions': 'أبعاد',
      'category': 'فئة',
      'specifications': 'المواصفات',
      'related_products': 'المنتجات ذات الصلة',
      'button_view_supplier_page': 'عرض صفحة الموزع',
      'button_lang_ar': 'العربية',
      'button_lang_en': 'الإنجليزية'
    })
    .preferredLanguage('en');

}])
.factory('productsResource', ['$resource', '$rootScope', function($resource, $rootScope) {
  var urlBase;

  console.log($rootScope.lang);

  if ($rootScope.lang === 'en') {
    urlBase = '../data/products.json';
  } else {
    urlBase = '../data/ar_products.json';
  }

  return $resource(urlBase);
}])
.factory('productResource', ['$resource', '$rootScope', function($resource, $rootScope) {
  var urlBase = '../data/product.json';
  return $resource(urlBase, {cache : true});
}])
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

    productResource.get()
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
.directive('productCard', ['$rootScope', function($rootScope) {
    return {
      templateUrl: 'partials/product-card.html'
    };
  }
])
.directive('breadcrumb', function() {
  return {
    templateUrl: 'partials/breadcrumb.html'
  };
})