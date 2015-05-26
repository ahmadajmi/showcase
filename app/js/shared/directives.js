.directive('productCard', function() {
  return {
    replace: true,
    templateUrl: '../partials/product-card.html'
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