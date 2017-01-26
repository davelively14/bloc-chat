(function() {
  function HomeCtrl($scope, Room) {
    $scope.allRooms = Room.all;
  }

  angular
    .module('blocChat')
    .controller('HomeCtrl', ['$scope', 'Room', HomeCtrl]);
})();
