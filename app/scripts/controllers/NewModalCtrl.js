(function() {
  function NewModalCtrl($scope, $uibModal, Room) {
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        console.log('Selected: ' + $scope.selected);
      });
    };
  }

  angular
    .module('blocChat')
    .controller('NewModalCtrl', ['$scope', '$uibModal', 'Room', NewModalCtrl]);
})();
