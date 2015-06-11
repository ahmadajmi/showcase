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

    function getCategoryChildren(category) {
      return categoryService.getCategoryChildren().get({category: category})
      .$promise
      .then(function(response) {
        console.log(response)

        $scope.categories = response.context;

        $scope.navPath = response.nav_path;

        $scope.tree;
        $scope.treeParent;

        for (key in $scope.categories) {
          if ($scope.categories[key] instanceof Array) {
            $scope.treeParent = key;
            $scope.tree = $scope.categories[key];
          }
        }

        $scope.self = response.self;

        $scope.children = response.context[response.self];
      });
    }

    function categories() {
      return $scope.$on('$routeChangeSuccess', function() {
        if ($location.$$path.indexOf('/category/') === 0) {
          $rootScope.isCategoryPage = true;
          $scope.query = $routeParams.category.replace(/\-/g, '/');
          getCategoryChildren($scope.query);
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