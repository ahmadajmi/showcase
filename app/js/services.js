.factory('productsResource', ['$resource', '$rootScope', function($resource, $rootScope) {
  var urlBase;

<<<<<<< HEAD
  console.log($rootScope.lang);

=======
>>>>>>> e6d9ebc... Organize JS files
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