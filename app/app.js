angular.module('purchase', [
  'ngRoute',
  'product',
  'dataFactory',
  'formDataFactory',
  'billing'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/product', {
      templateUrl: 'app/product/product.html',
      controller: 'productController'
    })
    .when('/billing', {
      templateUrl: 'app/billing/billing.html',
      controller: 'billingController'
    })
    .otherwise({
      redirectTo: '/product'
    });
});