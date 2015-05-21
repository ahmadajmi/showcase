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
}])
.config(['$routeProvider', '$translateProvider',
  function($routeProvider, $translateProvider) {
    $routeProvider
      .when('/', {
        controller: 'Products',
        templateUrl: 'partials/products-list.html'
      })
      .when('/product/:productGTN', {
        controller: 'productDetails',
        templateUrl: 'partials/product.html'
      })
      .when('/brand/:brandName', {
        controller: 'brandDetails',
        templateUrl: 'partials/brand.html'
      })
      .otherwise({
        redirectTo: '/'
      });

    $translateProvider.translations('en', {
      'home': 'Home',
      'by': 'by ',
      'manufactured_by': 'Manufactured by',
      'made_in': 'Made In',
      'material': 'Material',
      'style': 'Style',
      'dimensions': 'Dimensions',
      'category': 'Category',
      'specifications': 'Specifications',
      'related_products': 'Related Products',
      'button_view_supplier_page': 'View Supplier Page',
      'button_lang_ar': 'Arabic',
      'button_lang_en': 'English',
      'search_button': 'Search'
    })
    .translations('ar', {
      'home': 'الرئيسية',
      'by': 'بواسطة ',
      'manufactured_by': 'مصنعة من قبل',
      'made_in': 'صنع في',
      'material': 'مادة',
      'style': 'أسلوب',
      'dimensions': 'أبعاد',
      'category': 'فئة',
      'specifications': 'المواصفات',
      'related_products': 'المنتجات ذات الصلة',
      'button_view_supplier_page': 'عرض صفحة الموزع',
      'button_lang_ar': 'العربية',
      'button_lang_en': 'الإنجليزية',
      'search_button': 'بحث'
    })
    .preferredLanguage('en')
    .useSanitizeValueStrategy(null);
}])