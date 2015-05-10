.factory('productsResource', ['$resource', '$rootScope', function($resource, $rootScope) {

  var urlBase = '../data/products.json';

  var getProducts = function() {
    var servicePromise = $resource(urlBase + '/:productGTN', {productGTN: '@productGTN'}, {cache : true})
    .query()
    .$promise
    .then(function(response) {
      return response;
    });
    return servicePromise;
  }

  var myService = {
    getService: getProducts
  }

  return myService;

}])
.factory('productResource', ['$resource', '$rootScope', function($resource, $rootScope) {
  var urlBase = '../data/product.json';
  return $resource(urlBase, {cache : true});
}])


// Controller

$scope.loading = true;

$scope.products;
$scope.status;

productsResource.getService().then(function(data) {
  $scope.loading = false;
  $scope.products = data;
}, function(){
  $scope.status = 'Unable to get products, ...';
});