.directive('productCard', function() {
  return {
    replace: true,
    scope: {
      item: '=item'
    },
    templateUrl: '../partials/product-card.html'
  };
})
.directive('productCardRow', function() {
  return {
    replace: true,
    scope: {
      items: '=items'
    },
    templateUrl: 'partials/product-card-row.html'
  };
})