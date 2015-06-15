.controller('CategoriesController', ['$scope', '$rootScope', 'categoryService', '$routeParams', '$location',
  function($scope, $rootScope, categoryService, $routeParams, $location) {

    // Get top level Categories
    // We will show this in all pages other than the category
    // page which will use getCategoryChildrens function instead

    function getTopLevelCategories() {
      return categoryService.getCategories()
      .query()
      .$promise
      .then(function(response) {
        $rootScope.isCategoryPage = false;
        $scope.globalCategories = response.categories;
      }, function() {
        $scope.status = 'categoriesـloading_error_status';
      });
    }

    // In category page we will request current category children
    // and show them in an indentation way to it's parent(current category)
    // Ex:
    // - Food/Beverage/Tobacco
    //   - Confectionery
    //   - Milk/Butter

    // Convert the coming JSON into more usable format so we can use it recursively with Angular.js
    // See: http://goo.gl/JDAV2z

    function convert(obj, currentNav) {
      if(!obj) return null;
      if(obj[0]) {
        var res = []
        obj.forEach(function(cur) {res.push({
          title: cur,
          isCurrent: cur == currentNav[0],
          isActive: cur == currentNav[0] && currentNav.length === 1})});
        return res;
      }
      else {
        var res = []
        Object.keys(obj).forEach(function(key) {
          var val = obj[key];
          res.push({
            title: key,
            isCurrent: key == currentNav[0],
            isActive: key == currentNav[0] && currentNav.length === 1,
            categories: convert(val, currentNav.slice(1))});
        })
        return res;
      }
    }

    function getCategoryChildren(category) {
      return categoryService.getCategoryChildren().get({category: category})
      .$promise
      .then(function(response) {
        $scope.navPath = response.nav_path;
        $scope.end_path = response.nav_path[response.nav_path.length - 1];
        $scope.categories = convert(response.context, $scope.navPath);
      });
    }

    function categories() {
      return $scope.$on('$routeChangeSuccess', function() {
        if ($location.$$path.indexOf('/category/') === 0) {
          $rootScope.isCategoryPage = true;
          getCategoryChildren($routeParams.category.replace(/\-/g, '/'));
        } else {
          getTopLevelCategories();
        }
      });
    }

    categories();

    $rootScope.$on('languageChange', function() {
      $rootScope.$broadcast('$routeChangeSuccess');
      categories();
    });

  }])
.controller('CategoryController', ['$scope', '$rootScope', 'categoryService', '$routeParams',
  function($scope, $rootScope, categoryService, $routeParams) {

    function getCategory() {
      $scope.loading = true;
      $scope.done = false;
      $scope.category = $routeParams.category.replace(/\-/g, '/');

      return categoryService.getCategory().get({category: $scope.category})
      .$promise
      .then(function(response) {
        $scope.products = response.products;
        $scope.loading = false;
        $scope.done = true;
      }, function() {
        $scope.loading = false;
        $scope.status = 'categoryـloading_error_status';
      });
    }

    getCategory();

    $rootScope.$on('languageChange', function() {
      getCategory();
    });

  }])