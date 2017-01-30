(function() {
  function User($firebaseObject, $firebaseArray, $cookies) {
    var User = {};

    var ref = firebase.database().ref("users");
    var users = $firebaseArray(ref);

    User.get = function(userId) {
      var userRef = ref.child(userId);
      return $firebaseObject(userRef);
    };

    User.getCurrentUser = function() {
      return User.get($cookies.get('blocChatCurrentUser'));
    };

    User.add = function(userRecord) {
      firebase.database().ref('users/' + userRecord.uid).set(userRecord);
    };

    User.all = function() {
      return users;
    };

    return User;
  }

  angular
    .module('blocChat')
    .factory('User', ['$firebaseObject', '$firebaseArray', '$cookies', User])
})();
