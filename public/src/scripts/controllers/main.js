/**
 * Created by developer on 3/23/14.
 */
angular.module('ngApp').controller('MainCtrl', function($scope, Restangular){
    $scope.isSelected = undefined;

    $scope.users = Restangular.all("users").getList().$object;

    $scope.delete = function(id){
        if(confirm('Are you sure')){
            alert('Deleting');
        }
    }

    $scope.selected = function(id){
        $scope.isSelected = id;

        var original = Restangular.one('projects', id).get();

        $scope.user = Restangular.copy(original);
        console.log($scope.user);
    }
});