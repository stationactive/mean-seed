/**
 * Created by developer on 3/24/14.
 */
angular.module('ngApp').factory('Identity', function($window, Users){
    var currentUser;

    if(!!$window.bootstrappedUserObject){
        var currentUser = new Users();
        angular.extend(currentUser, $window.bootstrappedUserObject);

    }
    return {
        currentUser: currentUser,


        isAuthenticated: function(){
            return !!this.currentUser;
        },

        isAuthorized: function(role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
})