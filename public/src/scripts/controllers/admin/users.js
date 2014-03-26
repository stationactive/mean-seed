/**
 * Created by developer on 3/24/14.
 */
angular.module('ngApp').controller('AdminUsersCtrl', function($scope, Users){
    $scope.users = Users.query();
});
