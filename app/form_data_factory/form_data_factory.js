angular.module('formDataFactory', [])

.factory('formData', function () {

  var formData = [];

  return {
    getFormData: formData
  };  

 })