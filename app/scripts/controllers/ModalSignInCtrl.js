(function() {
  function ModalSignInCtrl($scope, $uibModalInstance, $cookies) {
    $scope.submit = function() {
      $cookies.put('blocChatCurrentUser', $scope.name);
      $uibModalInstance.close();
      console.log($cookies.get('blocChatCurrentUser'));
    }

    $scope.cancel = function() {
      $uibModalInstance.close();
    }
  }

  angular
    .module('blocChat')
    .controller('ModalSignInCtrl', ModalSignInCtrl);
})();
