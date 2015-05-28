'use strict';

angular.module('GS1', [
  'ngResource',
  'ngRoute',
  'pascalprecht.translate'
])
.run(['$rootScope', function($rootScope){
  $rootScope.lang = 'en';
  $rootScope.appName = 'GS1 SHOWCASE';
  $rootScope.default_float = 'left';
  $rootScope.opposite_float = 'right';
  $rootScope.endpoint = 'http://gs1-api.cloudapp.net:8080/v1';
  $rootScope.token = 'f76b2ca2bd9b50f51e894ffd18708bc9';
  $rootScope.headers = {
    'Content-Type': 'application/json',
    'Accept-Language': $rootScope.lang,
    'Accept': 'application/json',
    'Authorization': 'Token token="' + $rootScope.token + '"'
  }
  $rootScope.$on('languageChange', function(event, data) {
    $rootScope.headers['Accept-Language'] = data.langKey;
  });
}])
.config(['$routeProvider', '$translateProvider',
  function($routeProvider, $translateProvider) {
    $routeProvider
      .when('/', {
        controller: 'ProductsController',
        templateUrl: 'partials/products-list.html'
      })
      .when('/product/:productGTN', {
        controller: 'ProductController',
        templateUrl: 'partials/product.html'
      })
      .when('/brands/:brand', {
        controller: 'BrandController',
        templateUrl: 'partials/brand.html'
      })
      .when('/category/:category', {
        controller: 'CategoryController',
        templateUrl: 'partials/category.html'
      })
      .when('/search/:query', {
        controller: 'SearchController',
        templateUrl: 'partials/search.html'
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });

    $translateProvider.translations('en', {
      'home': 'Home',
      'by': 'by ',
      'specifications': 'Specifications',
      'related_products': 'Related Products',
      'button_view_supplier_page': 'View Supplier Page',
      'button_lang_ar': 'Arabic',
      'button_lang_en': 'English',
      'search_button': 'Search',
      'search_page_title': 'Search results for: ',
      'search_page_results_nothing_found': 'Sorry there is no search results for',
      'page_not_found_title': 'Sorry that page was not found',
      'products': 'Products',
      'brands': 'Brands',
      'categories': 'Categories'
    })
    .translations('ar', {
      'home': 'الرئيسية',
      'by': 'بواسطة ',
      'specifications': 'المواصفات',
      'related_products': 'المنتجات ذات الصلة',
      'button_view_supplier_page': 'عرض صفحة الموزع',
      'button_lang_ar': 'العربية',
      'button_lang_en': 'الإنجليزية',
      'search_button': 'بحث',
      'search_page_title': 'نتائج البحث عن: ',
      'search_page_results_nothing_found': 'عذرا .... لا يوجد نتائج بحث عن ',
      'page_not_found_title': 'عذرا لم يتم العثور على تلك الصفحة',
      'products': 'المنتجات',
      'brands': 'العلامات التجارية',
      'categories': 'الفئات'
    })
    .preferredLanguage('en')
    .useSanitizeValueStrategy(null);
}])