(function() {
  function BlocChatCookies($cookies, $uibModal) {
    var currentUser = $cookies.get('blocChatCurrentUser');
    if (!currentUser || currentUser === '') {
      $uibModal.open({
        animation: true,
        templateUrl: '/templates/modals/modal_sign_in.html',
        controller: 'ModalSignInCtrl',
        size: "sm",
        backdrop: 'static',
        keyboard: false,
        resolve: {
          cookie: function() {
            return $cookies;
          },
          signedIn: function() {
            return false;
          }
        }
      });
    }
  }

  angular
    .module('blocChat')
    .run(['$cookies', '$uibModal', BlocChatCookies]);
})();
