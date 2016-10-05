(function () {
    'use strict';
    
    describe('Factory: Enum', function () {
        
        beforeEach(module('ibs.cloud'));

        var Enum;
        
        beforeEach(inject(function (_Enum_) {
            Enum = _Enum_;
        }));
        
        it('should construct a builder object', function (done) {
            var myenum = new Enum({ 'first': 1, 'second': 2 });
            expect(myenum).to.be.a('function');
            done();
        });
        
        it('should evaluate single enum values are defined', function (done) {
            var myenum = new Enum({ 'first': 1, 'second': 2 });
            expect(myenum.isDefined('first')).to.be.true;
            expect(myenum.isDefined('second')).to.be.true;
            expect(myenum.isDefined('third')).to.be.false;
            done();
        });
        
        it('should provide two-way lookup of enum values', function (done) {
            var myenum = new Enum({ 'first': 1, 'second': 2 });

            expect('first' in myenum).to.be.true;
            expect(myenum['first']).to.equal(1);
            expect('second' in myenum).to.be.true;
            expect(myenum['second']).to.equal(2);
            expect(1 in myenum).to.be.true;
            expect(myenum[1]).to.equal('first');
            expect(2 in myenum).to.be.true;
            expect(myenum[2]).to.equal('second');

            done();
        });
        
        it('should evaluate instance pure values', function (done) {
            var CustomEnum = new Enum({ 'first': 1, 'second': 2 });
            var instance = new CustomEnum(2);
            
            expect(instance.hasFlag(CustomEnum.second)).to.be.true;
            expect(instance.hasFlag(CustomEnum.first)).to.be.false;

            done();
        });
        
        it('should evaluate instance flag values', function (done) {
            var CustomEnum = new Enum({ 'first': 1, 'second': 2, 'third': 8 });
            var instance = new CustomEnum(9);
            
            expect(instance.hasFlag(CustomEnum.first)).to.be.true;
            expect(instance.hasFlag(CustomEnum.third)).to.be.true;
            expect(instance.hasFlag(CustomEnum.second)).to.be.false;
            
            done();
        });
        
        it('should evaluate instance flag values (complex usage)', function (done) {
            var CustomEnum = new Enum({ 'first': 1, 'second': 2, 'third': 8 });
            var instance = new CustomEnum(CustomEnum.first | CustomEnum.third);
            
            expect(instance.hasFlag(CustomEnum.first)).to.be.true;
            expect(instance.hasFlag(CustomEnum.third)).to.be.true;
            expect(instance.hasFlag(CustomEnum.second)).to.be.false;
            
            done();
        });
        
        it('should work in a real scenario', function (done) {
            var TeeTimesSecurityFeature = new Enum(getTeeTimesSecurityFeature());
            var instance = new TeeTimesSecurityFeature(TeeTimesSecurityFeature.view | TeeTimesSecurityFeature.canEditPlayer);
            
            expect(instance.hasFlag(TeeTimesSecurityFeature.view)).to.be.true;
            expect(instance.hasFlag(TeeTimesSecurityFeature.canEditPlayer)).to.be.true;
            expect(instance.hasFlag(TeeTimesSecurityFeature.canOverrideLocks)).to.be.false;
            
            done();
        });

        function getTeeTimesSecurityFeature() {
            return {
                "unknown": 0,
                "view": 1,
                "canCreatePlayer": 2,
                "canDeletePlayer": 4,
                "canEditPlayer": 8,
                "canCreateReservation": 16,
                "canDeleteReservation": 32,
                "canEditReservation": 64,
                "canCreatePlayerType": 128,
                "canDeletePlayerType": 256,
                "canEditPlayerType": 512,
                "canOverrideLocks": 1024,
                "canAdministerRules": 2251799813685248,
                "canAdministerRates": 4503599627371392
            };
        }
    });

})();
