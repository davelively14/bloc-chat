(function() {
  var chatRoom = function() {
    return {
      templateUrl: '/templates/directives/chat_room.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, element, attributes) {
        scope.roomName = attributes.room;

        attributes.$observe("room", function(newValue) {
          console.log(newValue['$value']);
          scope.roomName = newValue;
        })
      }
    };
  };

  angular
    .module('blocChat')
    .directive('chatRoom', chatRoom);
})();
