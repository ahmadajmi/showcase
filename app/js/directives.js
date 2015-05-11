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
.directive('languageSelector', function() {
  return {
    templateUrl: 'partials/language-selector.html'
  };
})