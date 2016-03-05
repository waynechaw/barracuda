angular.module('dataFactory', [])

.factory('productData', function ($http) {

  return {
    getModels:function(){
      return $http.get('data/purchase_form_data.json').then(function(response){
        var models = {};
        _.each(response.data.products, function(product){
          var productID = product.product_id;
          var deploymentOptions = {};
          _.each(product.product_models, function(model){
            var deploymentID = model.deployment_id;
            deploymentOptions[deploymentID] = deploymentOptions[deploymentID] || {};
            var modelID = model.model_id;
            deploymentOptions[deploymentID][modelID] = {model_name: model.model_name, model_price: model.model_price};
          })
          models[productID] = deploymentOptions;
        }); 
        return models;
      })
    },
    getProducts:function(){
      return $http.get('data/purchase_form_data.json').then(function(response){
        var productNames = {};
        _.each(response.data.products, function(product){
          var id = product.product_id;
          var name = product.product_name;
          productNames[id] = name;
        })    
        return productNames;
      });
    },
    getDeploymentMethods:function(){
      return $http.get('data/purchase_form_data.json').then(function(response){
        var deploymentMethods = {};
        _.each(response.data.deployment_methods, function(method){
          var id = method.deployment_id;
          var name = method.deployment_name;
          deploymentMethods[id] = name;
        })  
        return deploymentMethods;
      });
    }
  };   
 })