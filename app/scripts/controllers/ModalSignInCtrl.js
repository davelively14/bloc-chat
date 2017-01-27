(function() {
  function ModalSignInCtrl($scope, $uibModalInstance, $cookies, canClose) {
    $scope.canClose = canClose;

    $scope.submit = function() {
      $cookies.put('blocChatCurrentUser', $scope.name);
      $uibModalInstance.close();
    }

    $scope.cancel = function() {
      $uibModalInstance.close();
    }
  }

  angular
    .module('blocChat')
    .controller('ModalSignInCtrl', ModalSignInCtrl);
})();
