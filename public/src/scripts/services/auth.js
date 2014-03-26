/**
 * Created by developer on 3/24/14.
 */
angular.module('ngApp').factory('Auth', function($http, Identity, $q, Users){
    return {
        authenticateUser: function(username, password){
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function(res){
                if(res.data.success){
                    var user = new Users();
                    angular.extend(user, res.data.user); //add user resource to response
                    Identity.currentUser = user;
                    dfd.resolve(true);
                }else{
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        logout: function(){
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function(){
                Identity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorizeCurrentUserForRoute: function(role){
            if(Identity.isAuthorized(role)){
                return true;
            }else{
                return $q.reject('Not Authorized');
            }
        },
        authorizeAuthenticatedUserForRoute: function(){
            if(Identity.isAuthenticated()){
                return true;
            }else{
                return $q.reject('Not Authorized');
            }

        },
        createUser: function(newUserData){
            var newUser = new Users(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function(){
                Identity.currentUser = newUser;
                dfd.resolve();
            }, function(res){
                dfd.reject(res.data.reason);
            });
            return dfd.promise;
        },
        updateCurrentUser: function(newUserData){
            var dfd = $q.defer();

            //clone current user
            var clone = angular.copy(Identity.currentUser);
            angular.extend(clone, newUserData);


            clone.$update({id: clone._id}).then(function(){
                Identity.currentUser = clone;
                dfd.resolve();
            }, function(res){
                dfd.reject(res.data.reason);
            });
            return dfd.promise;
        }

    }
})
