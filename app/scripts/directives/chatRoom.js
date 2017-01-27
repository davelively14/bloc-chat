(function() {
  var chatRoom = function($cookies, $uibModal) {
    return {
      templateUrl: '/templates/directives/chat_room.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, element, attributes) {
        scope.$watch(function() { return $cookies.get('blocChatCurrentUser') }, function(newValue) {
          scope.currentUser = $cookies.get('blocChatCurrentUser');
        });

        attributes.$observe("room", function(newValue) {

          // Only runs once we know the database is loaded, which is where we
          // want all our code.
          if (newValue) {
            scope.room = JSON.parse(newValue)
            scope.roomName = scope.room.name;

            // Temporary. I don't think I manually entered the data into the
            // firebase db correctly. The zero index of the array is empty.
            scope.messages = []

            if (scope.room.messages) {
              for (var i = 1; i < scope.room.messages.length; i++) {
                scope.messages.push(scope.room.messages[i])
              }
            }

            scope.login = function() {
              var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/templates/modals/modal_sign_in.html',
                controller: 'ModalSignInCtrl',
                size: "sm",
                resolve: {
                  cookie: function() {
                    return $cookies;
                  },
                  canClose: function() {
                    return true;
                  }
                }
              });
            };

            scope.logout = function() {
              $cookies.remove('blocChatCurrentUser');
              scope.currentUser = null;
            };
          }
        })
      }
    };
  };

  angular
    .module('blocChat')
    .directive('chatRoom', ['$cookies', '$uibModal', chatRoom]);
})();
