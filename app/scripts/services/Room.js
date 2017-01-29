(function() {
  function Room($firebaseArray, $firebaseObject, $cookies, User) {
    var Room = {};

    var ref = firebase.database().ref().child("rooms");
    var rooms = $firebaseArray(ref);

    Room.all = function() {
      return rooms;
    }

    Room.getPublic = function() {
      return $firebaseArray(ref.orderByChild('private').equalTo(false));
    };

    Room.getPrivate = function(admin, uid) {
      if (admin) {
        return $firebaseArray(ref.orderByChild('private').equalTo(true));
      } else {
        var privateRooms = [];

        ref.orderByChild('private').equalTo(true).once("value", function(snap) {
          for (var obj in snap.val()) {
            var roomUsers = snap.val()[obj].users;

            for (var i = 0; i < roomUsers.length; i++) {
              if (roomUsers[i] == uid) {
                privateRooms.push(snap.val()[obj]);
              }
            }
          }
        });

        return privateRooms;
      }
    };

    Room.add = function(name) {
      rooms.$add(name);
    };

    return Room;
  }

  angular
    .module('blocChat')
    .factory('Room', ['$firebaseArray', '$firebaseObject', '$cookies', 'User', Room]);
})();
