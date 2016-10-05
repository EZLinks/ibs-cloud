(function () {
    'use strict';
    
    describe('Service: notificationsService', function () {
        
        var notificationType = 'info';
        var messageText = 'The sample info text here';
        
        // load the service's module
        beforeEach(module('ibs.cloud'));
        
        var Notifications;
        var scope;
        var $timeout;
        
        beforeEach(inject(function ($rootScope, _Notifications_, _$timeout_) {
            
            $timeout = _$timeout_;
            scope = $rootScope.$new();
            
            Notifications = _Notifications_;            

        }));
        
        
        it('should check notificationsService callbacks all listeners', function (done) {
            
            var onNotification1Done = false;
            var onNotification2Done = false;
            
            Notifications.onNotification(scope, onNotification1);
            Notifications.onNotification(scope, onNotification2);
            
            Notifications.emit(notificationType, messageText, false);
                        
            $timeout.flush();
            
            function onNotification1(notification) {
                                                
                testNotification(notification);

                onNotification1Done = true;
                done();

            };
            
            function onNotification2(notification) {
                
                testNotification(notification); 
                
                onNotification2Done = true;
                done();

            };
            

            function testNotification(notification) {

                assert.equal(notification.type, notificationType, 'notification type is not valid');
                assert.equal(notification.message, messageText, 'notification message is not valid');
            
            };

            function testDone() {
                
                if (onNotification1Done && onNotification2Done) {
                    done();
                }

            };

        });


    });

})();
