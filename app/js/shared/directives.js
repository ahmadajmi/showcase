.directive('productCard', function() {
  return {
    replace: true,
    templateUrl: '../partials/product-card.html'
  };
})
.directive('loadingStatus', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      loading: '=',
      status: '='
    },
    templateUrl: '../partials/loading-status.html'
  };
})
.directive('brandCard', function() {
  return {
    replace: true,
    templateUrl: '../partials/brand-card.html'
  };
})
.directive('categoryCard', function() {
  return {
    replace: true,
    templateUrl: '../partials/category-card.html'
  };
})
.directive('breadcrumb', function() {
  return {
    replace: true,
    templateUrl: 'partials/breadcrumb.html'
  };
})
.directive('languageSelector', function() {
  return {
    replace: true,
    templateUrl: 'partials/language-selector.html'
  };
})
.directive('navigation', function() {
  return {
    replace: true,
    templateUrl: 'partials/navigation.html'
  };
})
.directive('searchForm', function() {
  return {
    replace: true,
    templateUrl: 'partials/search-form.html'
  };
})