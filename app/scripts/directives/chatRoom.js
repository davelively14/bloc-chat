(function() {
  var chatRoom = function($cookies, $uibModal, Chat) {
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
            scope.roomId = newValue;
            var obj = Chat.getObj(newValue);

            obj.$loaded().then(function() {
              scope.roomName = obj.name;
              scope.messages = obj.messages;
            });

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

            scope.sendMessage = function() {
              console.log(scope.roomId);
              var obj = Chat.getObj(scope.roomId);
              obj.$bindTo(scope, "roomData").then(function() {
                var date = new Date();

                if (!scope.roomData.messages) {
                  scope.roomData.messages = [];
                }

                scope.roomData.messages.push({
                  username: scope.currentUser,
                  content: scope.chatMessage,
                  setAt: date.toLocaleTimeString()
                });

                scope.messages = scope.roomData.messages
                console.log(scope.roomData);
              });
            }
          }
        })
      }
    };
  };

  angular
    .module('blocChat')
    .directive('chatRoom', ['$cookies', '$uibModal', 'Chat', chatRoom]);
})();
