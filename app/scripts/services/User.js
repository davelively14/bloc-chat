(function() {
  function User($firebaseObject, $firebaseArray) {
    var User = {};

    var ref = firebase.database().ref("users");
    var users = $firebaseObject(ref);

    User.get = function(userId) {
      var userRef = ref.child(userId);
      return $firebaseObject(userRef);
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
    .factory('User', ['$firebaseObject', '$firebaseArray', User])
})();
