(function() {
  function HomeCtrl($scope, Room) {
    $scope.allRooms = Room.all;
    console.log(Room);

    $scope.submit = function() {
      console.log($scope.roomName);
      Room.add($scope.roomName);
    };
  }

  angular
    .module('blocChat')
    .controller('HomeCtrl', ['$scope', 'Room', HomeCtrl]);
})();
