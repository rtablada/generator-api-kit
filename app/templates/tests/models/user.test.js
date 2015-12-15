require('should');

var Model = require('../../app/models/user.js');
var user;

describe('User Model', function () {
    it('should be newable', function () {
        var user = new Model();

        user.should.not.equal(undefined);
    });

    it('should not store plaintext password', function () {
        var user = new Model();
        var password = 'plaintext';
        user.password = password;

        user.password.should.not.equal(password);
    });


    it('can check for a correct password', function(done) {
        var user = new Model();
        var valid = 'correct';
        user.password = valid;

        user.checkPassword(valid, function(err) {
            'called'.should.equal('called');
            done();
        });

    });

    it('can check for a invalid password', function(done) {
        var user = new Model();
        var valid = 'correct';
        var inValid = 'incorrect';
        user.password = valid;

        user.checkPassword(inValid, function(err) {
            'called'.should.not.equal('called');
            done();
        }, function(err) {
            'called'.should.equal('called');

            done();
        });

    });
});
