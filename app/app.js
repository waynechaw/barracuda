angular.module('purchase', [
  'ngRoute',
  'product',
  'dataFactory',
  'formDataFactory',
  'billing'
])
.config(function ($routeProvider, $httpProvider) {
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
})

.controller('homeController', function ($scope, $controller, productData) {

  $scope.current = productData.getPage();

  $scope.updatePage = function(page){

    productData.updatePage(page)

    $scope.current = productData.getPage();
  }

  angular.extend(this, $controller('productController', {$scope: $scope}));

});