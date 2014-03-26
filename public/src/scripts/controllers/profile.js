/**
 * Created by developer on 3/25/14.
 */
angular.module('ngApp').controller('ProfileCtrl', function($scope, Auth, Identity, Notifier){
    $scope.username = Identity.currentUser.username;
    $scope.firstname = Identity.currentUser.firstname;
    $scope.lastname = Identity.currentUser.lastname;

    $scope.save = function(){
        var newUserData = {
            username: $scope.username,
            firstname: $scope.firstname,
            lastname: $scope.lastname
        }

        if($scope.password && $scope.password.length > 0){
            newUserData.password = $scope.password;
        }

        Auth.updateCurrentUser(newUserData).then(function(){
            Notifier.notify('Your account successfully updated');
        }, function(reason){
            Notifier.error(reason);
        })
    }
});
