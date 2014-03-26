/**
 * Created by developer on 3/24/14.
 */
angular.module('ngApp').factory('Users', function($resource){
    var UserResource = $resource('/api/v1/users/:id', {_id: "@id"},
        {
            update: {method: 'PUT', isArray: false}
        });

    UserResource.prototype.isAdmin = function(){
        return this.roles && this.roles.indexOf('admin') > -1;
    }

    return UserResource;
})
