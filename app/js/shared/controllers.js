.controller('LanguageController', ['$scope', '$rootScope', '$translate',
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
.controller('MenuController', ['$scope', '$rootScope', function($scope, $rootScope) {

  $scope.toggleMenu = function(event) {
    $rootScope.offCanvasOpened = !($rootScope.offCanvasOpened);
    event.stopPropagation();
  };

  window.onclick = function() {
    if ($rootScope.offCanvasOpened) {
      $rootScope.offCanvasOpened = false;
      $scope.$apply();
    }
  }

}])