'use strict';

angular.module('GS1', [
  'ngResource',
  'ngRoute'
])
.run(['$rootScope', function($rootScope){
  $rootScope.appName = 'GS1 SHOWCASE';
}])
.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'Products',
        templateUrl: 'partials/products-list.html'
      })
      .when('/product/:productId', {
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
}])
.factory('productsResource', ['$resource', function($resource) {
  var urlBase = '../data/products.json';
  return $resource(urlBase, {cache : true});
}])
.factory('productResource', ['$resource', function($resource) {
  var urlBase = '../data/product.json';
  return $resource(urlBase, {cache : true});
}])
.controller('Products', ['$scope', 'productsResource', function($scope, productsResource) {

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
.controller('productDetails', ['$scope', 'productResource', '$routeParams',
  function($scope, productResource, $routeParams) {

    $scope.product;
    $scope.status;
    $scope.loading = true;
    $scope.done = false;
    $scope.productId = $routeParams.productId;

    productResource.get()
      .$promise
      .then(function(response) {
        $scope.product = response;
        $scope.loading = false;
        $scope.done = true;
      }, function() {
        $scope.loading = false;
        $scope.status = 'Unable to get product info, ...';
      });
  }
])
.directive('productCard', function() {
  return {
    templateUrl: 'partials/product-card.html'
  };
});