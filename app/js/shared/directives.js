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