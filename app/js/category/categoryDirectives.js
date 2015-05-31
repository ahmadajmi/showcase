.directive('categoryCard', function() {
  return {
    replace: true,
    templateUrl: '../partials/category-card.html'
  };
})
.directive('categoriesNavigation', function() {
  return {
    replace: true,
    templateUrl: 'partials/categories-navigation.html'
  };
})