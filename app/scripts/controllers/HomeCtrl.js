(function() {
  function HomeCtrl($scope, Room, User, $uibModal, $cookies) {
    $scope.allRooms = Room.all;
    $scope.animationsEnabled = true;

    $scope.allRooms.$loaded().then(function() {

      $scope.open = function() {
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: '/templates/modals/modal_new_room.html',
          controller: 'ModalNewRoomCtrl',
          size: "sm",
          resolve: {
            rooms: function() {
              return Room;
            },
            user: function() {
              return User;
            },
            cookies: function() {
              return $cookies;
            }
          }
        });
      };

      $scope.enterRoom = function(roomId) {
        $scope.currentChatRoom = roomId;
      };
    });
  }

  angular
    .module('blocChat')
    .controller('HomeCtrl', ['$scope', 'Room', 'User', '$uibModal', '$cookies', HomeCtrl]);
})();
