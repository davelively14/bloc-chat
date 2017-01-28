(function() {
  function bcEnter() {
    return function(scope, element, attributes) {
      element.bind("keydown", function(e) {
        if(e.which === 13) {
          console.log(attributes);
          scope.$apply(function() {
            scope.$eval(attributes.bcEnter, {'e': e});
          })
          e.preventDefault();
        }
      })
    }
  }

  angular
    .module('blocChat')
    .directive('bcEnter', bcEnter);
})();
