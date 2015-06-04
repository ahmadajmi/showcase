.directive('categoryCard', function() {
  return {
    replace: true,
    scope: {
      item: '=item'
    },
    templateUrl: '../partials/category-card.html'
  };
})
.directive('categoryCardRow', function() {
  return {
    replace: true,
    scope: {
      items: '=items'
    },
    templateUrl: 'partials/category-card-row.html'
  };
})
.directive('categoriesNavigation', function() {
  return {
    replace: true,
    templateUrl: 'partials/categories-navigation.html'
  };
})