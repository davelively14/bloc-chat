(function() {
  function HomeCtrl($scope, Room, $uibModal, $cookies) {
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
            items: function () {
              return Room;
            }
          }
        });
      };

      $scope.enterRoom = function(roomId) {
        $scope.currentChatRoom = roomId;
      };
    });

    $scope.logout = function() {
      firebase.auth().signOut().then(function() {
        $cookies.remove('blocChatCurrentUser');
        $scope.$apply();
        $uibModal.open({
          animation: true,
          templateUrl: '/templates/modals/modal_sign_in.html',
          controller: 'ModalSignInCtrl',
          size: "sm",
          backdrop: 'static',
          keyboard: false,
          resolve: {
            cookie: function() {
              return $cookies;
            },
            canClose: function() {
              return false;
            }
          }
        });
      }, function(error) {
        console.log(error.message);
      });

    }

  }

  angular
    .module('blocChat')
    .controller('HomeCtrl', ['$scope', 'Room', '$uibModal', '$cookies', HomeCtrl]);
})();
