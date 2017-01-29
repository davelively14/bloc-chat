(function() {
  function HomeCtrl($scope, Room, User, $uibModal, $cookies) {
    $scope.animationsEnabled = true;

    $scope.$watch(function() { return $cookies.get('blocChatCurrentUser') }, function(newValue) {
      if($cookies.get('blocChatCurrentUser')) {
        var user = User.getCurrentUser();
        user.$loaded().then(function() {
          $scope.publicRooms = Room.getPublic();
          $scope.privateRooms = Room.getPrivate(user.admin, user.uid);
        });
      }
    });

    $scope.open = function(private) {
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
          },
          private: function() {
            return private;
          }
        }
      });
    };

    $scope.enterRoom = function(roomId) {
      $scope.currentChatRoom = roomId;
    };
  }

  angular
    .module('blocChat')
    .controller('HomeCtrl', ['$scope', 'Room', 'User', '$uibModal', '$cookies', HomeCtrl]);
})();
