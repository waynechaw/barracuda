angular.module('product', [])

.controller('productController', function ($scope, productData, formData) {
  //retrieve product information
  productData.getModels().then(function(data){
    $scope.models = data;
  })
  productData.getProducts().then(function(data){
    $scope.productNames = data;
  })
  productData.getDeploymentMethods().then(function(data){
    $scope.deployMethods = data;
  })

  $scope.formEntries = formData.getFormData; //get stored form data from factory

  $scope.formValid = function(){
    return !_.some($scope.formEntries, function(entry){ //check if form is valid
      return entry.price === null || entry.price === 0 ;
    });
  }

  $scope.optionSelected = function(option){ //check if user selected an option
    if (option === "(select)"){
      return false;
    }
    return true;
  }

  $scope.addRow = function(init){ //add form entry
    var valid = $scope.formValid();
    if (init || valid){
      $scope.formEntries.push({
        product: "(select)",
        deployment: "(select)",
        model: "(select)",
        quantity: 1,
        price: null
      });
    }
  }

  $scope.delete = function(index){ //delete form entry
    $scope.formEntries.splice(index, 1);
    calculateTotal();
  }

  var calculateTotal = function(){ //calculates sum
    if ($scope.formEntries.length > 1){
      $scope.total = _.reduce($scope.formEntries, function(a, b){
        return a + b.price;
      }, 0);  
    }else{
      $scope.total = $scope.formEntries[0].price || 0;
    }
  }

  //Updates form on selection
  $scope.updateDeploy = function(index){
    $scope.formEntries[index].deployment = "(select)";
    $scope.formEntries[index].model = "(select)";
    $scope.formEntries[index].price = null;
    calculateTotal();    
  }
  $scope.updateModel = function(index){
    $scope.formEntries[index].model = "(select)";
    $scope.formEntries[index].price = null;
    calculateTotal();
  }
  $scope.updatePrice = function(index){
    if ("(select)" === $scope.formEntries[index].model){
      $scope.formEntries[index].price = null;
      calculateTotal();
      return;
    }
    var product_id = $scope.formEntries[index].product;
    var deployment_id = $scope.formEntries[index].deployment;
    var model_id = $scope.formEntries[index].model;
    var price = $scope.models[product_id][deployment_id][model_id].model_price;
    var quantity = $scope.formEntries[index].quantity || 0;
    $scope.formEntries[index].price = quantity * price;
    calculateTotal();
  }

  if ($scope.formEntries.length === 0){ //initialize the form by adding a form entry
    $scope.addRow(true);
  }

  calculateTotal();  //initialize the total price

});