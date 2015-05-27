.controller('TranslateController', ['$scope', '$rootScope', '$translate',
  function($scope, $rootScope, $translate) {

    $scope.changeLanguage = function(langKey) {
      $rootScope.lang = langKey;

      $rootScope.default_float = langKey === 'ar' ? 'right' : 'left';
      $rootScope.opposite_float = langKey === 'ar' ? 'left' : 'right';

      $rootScope.$broadcast('languageChange', {
        langKey: langKey
      });

      $translate.use(langKey);
    };

  }])
.controller('MenuController', ['$scope', function($scope) {

  $scope.menuOpened = false;

  $scope.toggleMenu = function(event) {
    $scope.menuOpened = !($scope.menuOpened);
    event.stopPropagation();
  };

  window.onclick = function() {
    if ($scope.menuOpened) {
      $scope.menuOpened = false;
      $scope.$apply();
    }
  }

}])