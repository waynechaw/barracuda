angular.module('product', ['dataFactory'])

.controller('productController', function ($scope, productData) {

  $scope.total = 0;

  var products;
  var deploymentMethods;

  productData.getData().then(function(response){
    products = response.data.products;
    deploymentMethods = response.data.deployment_methods;
    $scope.products = response.data.products;
  })

  $scope.formEntries = [];

  $scope.deploymentOptions = [];

  $scope.modelOptions = [];

  $scope.addRow = function(){

    if ($scope.formEntries.length === 0 ){
      $scope.formEntries.push({
        product: "(select)",
        deployment: "(select)",
        model: "(select)",
        quantity: 1,
        price: null
      });
      return;
    }


    var valid = !_.some($scope.formEntries, function(entry){
      return entry.price === null || entry.price === 0 ;
    });

    if (valid){
      $scope.formEntries.push({
        product: "(select)",
        deployment: "(select)",
        model: "(select)",
        quantity: 1,
        price: null
      });
    }
  }

  $scope.addRow();

  $scope.updateDeploy = function(index){

    $scope.formEntries[index].deployment = "(select)";
    $scope.formEntries[index].model = "(select)";
    $scope.formEntries[index].price = null;
    calculateTotal();    

    if ("(select)" === $scope.formEntries[index].product){
      return;
    }

    $scope.deploymentOptions[index] = [];

    var productID = parseInt($scope.formEntries[index].product);
    var selectedProduct = _.where(products, {product_id: productID})[0];
    var deploymentOptions = _.uniq(_.pluck(selectedProduct.product_models, "deployment_id"));

    _.each(deploymentOptions, function(option){
      var deploymentInfo = _.where(deploymentMethods, {deployment_id: option})[0];
      $scope.deploymentOptions[index].push(deploymentInfo)
    })
  }

  $scope.updateModel = function(index){
    $scope.formEntries[index].model = "(select)";
    $scope.formEntries[index].price = null;

    calculateTotal();

    if ("(select)" === $scope.formEntries[index].deployment){
      return;
    }

    $scope.modelOptions[index] = [];

    var productID = parseInt($scope.formEntries[index].product);
    var deploymentID = parseInt($scope.formEntries[index].deployment);
    var allModels = _.where(products, {product_id: productID})[0].product_models;
    var selectedProductModels = _.filter(allModels, function(model){
      return model.deployment_id === deploymentID;
    });

    _.each(selectedProductModels, function(option){
      $scope.modelOptions[index].push(option);
    })



  }

  $scope.updatePrice = function(index){

    if ("(select)" === $scope.formEntries[index].model){
      $scope.formEntries[index].price = null;
      calculateTotal();
      return;
    }

    var model_id = parseInt($scope.formEntries[index].model);
    var price = (_.where($scope.modelOptions[index], {model_id: model_id})[0].model_price);
    $scope.formEntries[index].price = ($scope.formEntries[index].quantity || 0) * price;
    calculateTotal();

  }

  var calculateTotal = function(){
    if ($scope.formEntries.length > 1){
      $scope.total = _.reduce($scope.formEntries, function(a, b){
        return a + b.price;
      }, 0);  
    }else{
      $scope.total = $scope.formEntries[0].price || 0;
    }
  }

  $scope.delete = function(index){
    $scope.formEntries.splice(index, 1);

  $scope.deploymentOptions.splice(index, 1);

  $scope.modelOptions.splice(index, 1);

    calculateTotal();
  }


  
});