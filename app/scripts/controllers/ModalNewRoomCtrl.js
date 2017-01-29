(function() {
  function ModalNewRoomCtrl($scope, $uibModalInstance, Room, User, $cookies) {
    $scope.currentUser = User.get($cookies.get('blocChatCurrentUser'));

    $scope.currentUser.$loaded().then(function() {
      $scope.admin = $scope.currentUser.admin;

      $scope.submit = function() {
        if ($scope.admin && $scope.private) {
          Room.add({
            name: $scope.roomName,
            private: $scope.private,
            users: [$scope.currentUser.uid]
          });
        } else {
          Room.add({
            name: $scope.roomName,
            private: false
          });
        }
        $uibModalInstance.close();
      };

      $scope.cancel = function() {
        $uibModalInstance.close();
      };
    });

  }

  angular
    .module('blocChat')
    .controller('ModalNewRoomCtrl', ModalNewRoomCtrl);
})();
