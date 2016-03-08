angular.module('billing', ['dataFactory'])

.controller('billingController', function ($scope, formData) {

  var formData = formData.getFormData;

  var getCount = function(formData){
    if (formData.length === 1){
      return formData[0].quantity;
    }else{
      return _.reduce(formData, function(initial, product){
        console.log(product)
        return initial + product.quantity;
      }, 0)
    }
  };

  var getPrice = function(formData){
    if (formData.length === 1){
      return formData[0].price;
    }else{
      return _.reduce(formData, function(initial, product){
        return initial + product.price;
      }, 0)
    }
  };


  $scope.productCount = getCount(formData);
  $scope.total = getPrice(formData);
  $scope.tax = 0.09 * $scope.total;
  
});