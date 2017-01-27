(function() {
  function BlocChatCookies($cookies, $uibModal) {
    var currentUser = $cookies.get('blocChatCurrentUser');
    if (!currentUser || currentUser === '') {
      console.log("Not logged in");
      $uibModal.open({
        animation: true,
        templateUrl: '/templates/modals/modal_sign_in.html',
        controller: 'ModalSignInCtrl',
        size: "sm",
        resolve: {
          items: function() {
            return $cookies;
          }
        }
      });
    }
  }

  angular
    .module('blocChat')
    .run(['$cookies', '$uibModal', BlocChatCookies]);
})();
