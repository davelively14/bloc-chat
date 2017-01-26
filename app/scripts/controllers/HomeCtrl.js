(function() {
  function HomeCtrl($scope, Room, $uibModal) {
    $scope.allRooms = Room.all;
    $scope.animationsEnabled = true;

    $scope.open = function() {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '/templates/modal-new-room.html',
        controller: 'ModalNewRoomCtrl',
        size: "sm",
        resolve: {
          items: function () {
            return Room;
          }
        }
      });

      console.log(modalInstance);
    };
  }

  angular
    .module('blocChat')
    .controller('HomeCtrl', ['$scope', 'Room', '$uibModal', HomeCtrl]);
})();
