.directive('brandCard', function() {
  return {
    replace: true,
    scope: {
      item: '=item'
    },
    templateUrl: '../partials/brand-card.html'
  };
})
.directive('brandCardRow', function() {
  return {
    replace: true,
    scope: {
      items: '=items'
    },
    templateUrl: 'partials/brand-card-row.html'
  };
})