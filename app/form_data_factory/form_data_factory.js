angular.module('formDataFactory', [])

.factory('formData', function ($http) {

  var formData = [];

  return {
    getFormData: formData
  };  

 })