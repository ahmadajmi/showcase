'use strict';

angular.module('GS1', [
  'ngResource',
  'ngRoute'
])
.run(['$rootScope', function($rootScope){
  $rootScope.appName = 'GS1 SHOWCASE';
}])
.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'Posts',
        templateUrl: '../partials/posts-list.html'
      })
      .when('/post/:postId', {
        controller: 'PostDetails',
        templateUrl: '../partials/post.html'
      })
      .when('/search/:searchQuery', {
        controller: 'Search',
        templateUrl: '../partials/search-result.html'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
}])
.factory('PostsResource', ['$resource', function($resource) {
  var urlBase = 'http://jsonplaceholder.typicode.com/photos';
  return $resource(urlBase + '/:postId', {postId: '@postId'}, {cache : true});
}])
.controller('Posts', ['$scope', 'PostsResource', function($scope, PostsResource){

  $scope.loading = true;

  $scope.posts;
  $scope.status;

  PostsResource.query()
    .$promise
    .then(function(response) {
      $scope.posts = response;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
      $scope.status = 'Unable to get posts, ...';
    });

  $scope.getDetails = function(id) {
    PostsResource.get({post: id})
      .$promise
      .then(function(response) {
        console.log(response);
      }, function() {
        console.log('err');
      });
  };

}])
.controller('Search', ['$scope', '$rootScope', '$location', 'PostsResource', '$routeParams',
  function($scope, $rootScope, $location, PostsResource,$routeParams) {

    $scope.loading = true;

    $scope.posts = {};

    PostsResource.query()
      .$promise
      .then(function(response) {
        $scope.posts = response;
        $scope.loading = false;
      }, function() {
        console.log('err');
      });

    $scope.query = $location.search().search;

    $scope.doSearch = function(p) {
      $location.path('/search/'+ $scope.searchQuery).search('search', $scope.searchQuery);
    }

  }
])
.controller('PostDetails', ['$scope', 'PostsResource', '$routeParams',
  function($scope, PostsResource, $routeParams) {

    $scope.post;
    $scope.status;
    $scope.loading = true;
    $scope.done = false;
    $scope.postId = $routeParams.postId;

    PostsResource.get({postId: $scope.postId})
      .$promise
      .then(function(response) {
        $scope.post = response;
        $scope.loading = false;
        $scope.done = true;
      }, function() {
        $scope.loading = false;
        $scope.status = 'Unable to get post info, ...';
      });
  }
]);