(function() {
  function HomeCtrl($scope, Room, $uibModal) {
    $scope.allRooms = Room.all;
    $scope.animationsEnabled = true;
    // $scope.key = "-KbNzEEEfsAah9UMFe62";
    $scope.key = "-KbSxd5taqfiKJkeG69K";

    $scope.allRooms.$loaded().then(function() {
      $scope.currentChatRoom = $scope.allRooms.$getRecord($scope.key);

      $scope.open = function() {
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: '/templates/modal_new_room.html',
          controller: 'ModalNewRoomCtrl',
          size: "sm",
          resolve: {
            items: function () {
              return Room;
            }
          }
        });
      };
    });


  }

  angular
    .module('blocChat')
    .controller('HomeCtrl', ['$scope', 'Room', '$uibModal', HomeCtrl]);
})();
