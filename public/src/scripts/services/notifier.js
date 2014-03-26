/**
 * Created by developer on 3/24/14.
 */
angular.module('ngApp').value('ngAppToastr', toastr)

angular.module('ngApp').factory('Notifier', function(ngAppToastr){
    return {
        notify: function(msg){
            ngAppToastr.success(msg);
        },
        error: function(msg){
            ngAppToastr.error(msg);
        }
    }
});
