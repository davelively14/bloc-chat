(function() {
  function ModalSignInCtrl($scope, $uibModalInstance, $cookies, User, signedIn) {
    $scope.signedIn = signedIn;
    $scope.default = true;
    $scope.passWordMatch = true;

    $scope.cancel = function() {
      $uibModalInstance.close();
    };

    $scope.toggleNewUser = function() {
      $scope.default = !$scope.default;
    };

    $scope.createUser = function() {
      $scope.error = null;

      if ($scope.createUserForm.$valid) {
        if ($scope.password !== $scope.passwordConfirm) {
          $scope.passWordMatch = false;
        } else {
          $scope.passWordMatch = true;

          firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password).then(function() {
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                var userRecord = ({
                  uid: user.uid,
                  email: user.email,
                  userName: $scope.userName,
                  admin: false
                });
                User.add(userRecord);
                $cookies.put('blocChatCurrentUser', userRecord.uid);
              } else {
                $cookies.remove('blocChatCurrentUser');
              }
            });
            $uibModalInstance.close();
          }, function(error) {
            $scope.$apply(function() {
              $scope.error = {errorCode: error.code, message: error.message};
            });
          });

        }
      }
    }

    $scope.logIn = function() {
      $scope.error = null;

      if ($scope.logInForm.$valid) {
        firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).then(function() {
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              var userRecord = User.get(user.uid);
              userRecord.$loaded().then(function() {
                $cookies.put('blocChatCurrentUser', userRecord.uid);
              });
            } else {
              $cookies.remove('blocChatCurrentUser');
            }
          });
          $uibModalInstance.close();
        }, function(error) {
          $scope.$apply(function() {
            $scope.error = {errorCode: error.code, message: error.message};
          });
        })
      }
    };

    $scope.logout = function() {

      firebase.auth().signOut().then(function() {
        $cookies.remove('blocChatCurrentUser');
        $scope.signedIn = false;
        $scope.default = true;
        $scope.passWordMatch = true;
        $scope.email = '';
        $scope.password = '';
        $scope.passwordConfirm = '';
        $scope.userName = '';
        $scope.$apply();
      }, function(error) {
        console.log(error.message);
      });
    };
  }

  angular
    .module('blocChat')
    .controller('ModalSignInCtrl', ModalSignInCtrl);
})();
