(function() {
  var chatRoom = function($cookies, $uibModal, Chat, User) {
    return {
      templateUrl: '/templates/directives/chat_room.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, element, attributes) {
        scope.$watch(function() { return $cookies.get('blocChatCurrentUser') }, function(newValue) {
          if($cookies.get('blocChatCurrentUser')) {
            scope.currentUser = User.getCurrentUser();
          }
        });

        attributes.$observe("room", function(newValue) {

          // Only runs once we know the database is loaded, which is where we
          // want all our code.
          if (newValue) {
            var obj = Chat.getObj(newValue);
            scope.roomId = newValue;

            obj.$loaded().then(function() {
              scope.private = obj.private;
              scope.roomName = obj.name;
              scope.messages = obj.messages;

              scope.sendMessage = function() {
                var date = new Date();

                console.log(obj.messages);

                if (!obj.messages) {
                  obj.messages = [];
                }

                obj.messages.push({
                  username: scope.currentUser.userName,
                  content: scope.chatMessage,
                  setAt: date.toLocaleTimeString()
                });

                obj.$save();

                scope.chatMessage = '';
                scope.messages = obj.messages;
              }
            });

            scope.settings = function() {
              $uibModal.open({
                animation: true,
                templateUrl: '/templates/modals/modal_settings.html',
                controller: 'ModalSettingsCtrl',
                size: "md",
                resolve: {
                  roomId: function() {
                    return scope.roomId;
                  },
                  Room: function() {
                    return Chat;
                  },
                  User: function() {
                    return User;
                  }
                }
              });
            };
          };

          scope.login = function() {
            $uibModal.open({
              animation: true,
              templateUrl: '/templates/modals/modal_sign_in.html',
              controller: 'ModalSignInCtrl',
              size: "sm",
              resolve: {
                cookie: function() {
                  return $cookies;
                },
                signedIn: function() {
                  return true;
                },
                user: function() {
                  return User;
                }
              }
            });
          };
        })
      }
    };
  };

  angular
    .module('blocChat')
    .directive('chatRoom', ['$cookies', '$uibModal', 'Chat', 'User', chatRoom]);
})();
