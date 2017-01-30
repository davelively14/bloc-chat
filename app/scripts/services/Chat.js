(function() {
  function Chat($firebaseObject) {
    var Chat = {};

    var ref = firebase.database().ref("rooms");

    Chat.getObj = function(roomId) {
      if (roomId) {
        var roomRef = ref.child(roomId);
        return $firebaseObject(roomRef);
      }
    };

    return Chat;
  }

  angular
    .module('blocChat')
    .factory('Chat', ['$firebaseObject', Chat])
})();
