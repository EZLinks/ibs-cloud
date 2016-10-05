(function () {
    'use strict';
    
    describe('Factory: time', function () {
        
        // load the service's module
        beforeEach(module('ibs.cloud'));
        
        var Time;
        
        beforeEach(inject(function (_Time_) {
            Time = _Time_;
        }));
        
        it('should check init as string', function (done) {
            var time = new Time('09:25:32');
            
            assert.equal(time.hour, 9, '(hour) was not properly initialized.');
            assert.equal(time.minute, 25, '(minute) was not properly initialized.');
            assert.equal(time.second, 32, '(second) was not properly initialized.');
            
            done();
        });

        it('should check init as object', function (done) {
            var time = new Time({
                hour: 9,
                minute: 25,
                second: 32
            });
            
            assert.equal(time.hour, 9, '(hour) was not properly initialized.');
            assert.equal(time.minute, 25, '(minute) was not properly initialized.');
            assert.equal(time.second, 32, '(second) was not properly initialized.');
            
            done();
        });
        
        it('should check init as moment', function (done) {
            var time = new Time(moment().hour(12).minute(30).second(20));
            
            assert.equal(time.hour, 12, '(hour) was not properly initialized.');
            assert.equal(time.minute, 30, '(minute) was not properly initialized.');
            assert.equal(time.second, 20, '(second) was not properly initialized.');
            
            done();
        });
        
        it('should throw error when constructing with an invalid date', function (done) {
            assert.throws(function () { new Time(new Date('thisisnotadate')) }, Error, 'Time factory: expected a number but did not receive one.');
            
            done();
        });

        it('should check (toLongTime) function', function (done) {
            var time = new Time({
                hour: 9,
                minute: 25,
                second: 32
            });
            
            assert.equal(time.toLongTime(), '09:25:32', '(toLongTime) did not appropriately create a JSON string.');
            
            done();
        });

        it('should check (toShortTime) function', function (done) {
            var time = new Time({
                hour: 9,
                minute: 25,
                second: 32
            });
            
            assert.equal(time.toShortTime(), '09:25', '(toShortTime) did not appropriately create a string.');
            
            done();
        });

        it('should check throw an error when hour is not valid', function (done) {
            assert.throws(function () {
                var time = new Time();
                time.hour = -1;
            }, Error, 'hour was set to an invalid number.', 'hour was set to -1 and did not throw an error.');
            
            assert.throws(function () {
                var time = new Time();
                time.hour = 24;
            }, Error, 'hour was set to an invalid number.', 'hour was set to 24 and did not throw an error.');
            
            done();
        });

        it('should check throw an error when minute is not valid', function (done) {
            assert.throws(function () {
                var time = new Time();
                time.minute = -1;
            }, Error, 'minute was set to an invalid number.', 'minute was set to -1 and did not throw an error.');
            
            assert.throws(function () {
                var time = new Time();
                time.minute = 60;
            }, Error, 'minute was set to an invalid number.', 'minute was set to 60 and did not throw an error.');
            
            done();
        });

        it('should check throw an error when second is not valid', function (done) {
            assert.throws(function () {
                var time = new Time();
                time.second = -1;
            }, Error, 'second was set to an invalid number.', 'second was set to -1 and did not throw an error.');
            
            assert.throws(function () {
                var time = new Time();
                time.second = 60;
            }, Error, 'second was set to an invalid number.', 'second was set to 60 and did not throw an error.');
            
            done();
        });
    });

})();
