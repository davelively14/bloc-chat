(function() {
  function ModalSignInCtrl($scope, $uibModalInstance, $cookies, canClose) {
    $scope.canClose = canClose;
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
                user.userName = $scope.userName;
                $cookies.put('blocChatCurrentUser', user.userName);
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
              $cookies.put('blocChatCurrentUser', user.email.split("@")[0]);
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
    }
  }

  angular
    .module('blocChat')
    .controller('ModalSignInCtrl', ModalSignInCtrl);
})();
