(function() {
  function ModalSettingsCtrl($scope, $uibModalInstance, roomId, Chat, User) {
    var usersTemp = User.all();
    var roomTemp = Chat.getObj(roomId);

    usersTemp.$loaded().then(function() {
      roomTemp.$loaded().then(function() {

        for (var userIndex = 0; userIndex < usersTemp.length; userIndex++) {
          for (var rmUsrIndx = 0; rmUsrIndx < roomTemp.users.length; rmUsrIndx++) {
            if (roomTemp.users[rmUsrIndx] === usersTemp[userIndex].uid) {
              usersTemp[userIndex].member = true;
            }
          }

          if (!usersTemp[userIndex].member) {
            usersTemp[userIndex].member = false;
          }
        }

        $scope.room = roomTemp;
        $scope.users = usersTemp;
      });
    });

    $scope.cancel = function() {
      $uibModalInstance.close();
    }
  }

  angular
    .module('blocChat')
    .controller('ModalSettingsCtrl', ModalSettingsCtrl);
})();
