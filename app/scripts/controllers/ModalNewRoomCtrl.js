(function() {
  function ModalNewRoomCtrl($scope, $uibModalInstance, Room) {
    $scope.submit = function() {
      Room.add($scope.roomName);
      $uibModalInstance.close();
    };

    $scope.cancel = function() {
      $uibModalInstance.close();
    };

  }

  angular
    .module('blocChat')
    .controller('ModalNewRoomCtrl', ModalNewRoomCtrl);
})();
