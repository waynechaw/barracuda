angular.module('dataFactory', [])

.factory('productData', function ($http) {

  var currentPage = "purchase";

  return {
    getData:function(){
      return $http.get('data/purchase_form_data.json')
    },
    updatePage: function(page){
      currentPage = page;
    },
    getPage: function(){
      return currentPage;
    }
  };   


 })