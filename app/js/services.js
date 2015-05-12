.factory('productsResource', ['$resource', '$rootScope', function($resource, $rootScope) {

  return {
    enResource: $resource('../data/products.json'),
    arResource: $resource('../data/ar_products.json')
  }

}])
.factory('productResource', ['$resource', '$rootScope', function($resource, $rootScope) {
  var urlBase = '../data/product.json';
  return $resource(urlBase, {cache : true});
}])
.factory('brandResource', ['$resource', '$rootScope', function($resource, $rootScope) {
  var urlBase = '../data/brand.json';
  return $resource(urlBase, {cache : true});
}])