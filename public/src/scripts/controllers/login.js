/**
 * Created by developer on 3/24/14.
 */
angular.module('ngApp').controller('LoginCtrl', function($scope, Auth, Notifier, Identity, $location){

    $scope.identity = Identity;

    $scope.reset = function(){
        $scope.username = '';
        $scope.password = '';
    }

    $scope.login = function(username, password){
        Auth.authenticateUser(username, password).then(function(success){
            if(success){
                Notifier.notify('You have successfully signed in');
                }else{
                Notifier.notify('Username/Password invalid. Please try again.');
            }
        });

    }

    $scope.logout = function(){
        Auth.logout().then(function(){
            $scope.reset();
            Notifier.notify('You have successfully signed out');
            $location.path('/');
        });
    }

});