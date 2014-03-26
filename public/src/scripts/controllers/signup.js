/**
 * Created by developer on 3/24/14.
 */
angular.module('ngApp').controller('SignupCtrl', function($scope, Auth, $location, Notifier){
    $scope.signup = function(){
        $scope.error = '';

        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstname: $scope.firstname,
            lastname: $scope.lastname
        }

        Auth.createUser(newUserData).then(function(){
            Notifier.notify('User Account Created!');
            $location.path('/');
        }, function(reason){
            var msg = reason;
            if(reason.Error){
                msg = reason.Error
            }
            Notifier.error(msg);
            $scope.error = reason;
        });
    }
});
