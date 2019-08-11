var request = require('supertest');
var should = require('should');

var helper = require('./helper/server-helpers');
var hasResponseMessage = function(res) {
    res.body.should.have.property('message');
};
var hasResponseStudents = function(res) {
    res.body.should.have.property('students');
}

describe('POST /api/register Test', function() {
    var server;
    var url = '/api/register';

    beforeEach(function(done) {
        server = helper.startFreshServer();
        helper.cleanDatabases(done);
    });

    afterEach(function(done) {
        helper.stopServer(server, done);
    });


    it('1a) should return error if there is no input teacher parameter', function (done) {
        request(server)
        .post(url)
        .send({})
        .expect("Content-type", /json/)
        .expect(400)      // http response
        .expect(hasResponseMessage)
        .end(done);
    });

    it('1b) should return error if there is no input students parameter', function (done) {
        request(server)
        .post(url)
        .send({teacher: 'teacherken@gmail.com'})
        .expect("Content-type", /json/)
        .expect(400)      // http response
        .expect(hasResponseMessage)
        .end(done);
    });

    it('1c) should return status 204 if it successfully adds students', function (done) {
        request(server)
        .post(url)
        .send({
            teacher: 'teacherken@gmail.com',
            students: [
                'studentjon@gmail.com',
                'studenthon@gmail.com'
            ]
        })
        .expect(204, done);    // http response, no content
    });
});



describe('GET /api/commonstudents Test', function() {
    var server;
    var url = '/api/commonstudents';

    beforeEach(function(done) {
        server = helper.startFreshServer();
        helper.cleanWithSomeDummyDataInDatabase(done);
    });

    afterEach(function(done) {
        helper.stopServer(server, done);
    });

    it('2a) should return status 400 with message without teacher params', function(done) {
        request(server)
        .get(url)
        .expect('Content-Type', /json/)
        .expect(400)    // http response
        .expect(hasResponseMessage)
        .end(done);
    });

    it('2b) should return status 200 with input teacher params', function(done) {
        request(server)
        .get(url)
        .query({teacher: 'teacherken@gmail.com'})
        .query({teacher: 'teacherjoe@gmail.com'})
        .expect('Content-Type', /json/)
        .expect(200)    // http response
        .expect(hasResponseStudents)
        .end(done);
    });
});



describe('POST /api/suspend Test', function() {
    var server;
    var url = '/api/suspend';

    beforeEach(function(done) {
        server = helper.startFreshServer();
        helper.cleanWithSomeDummyDataInDatabase(done);
    });

    afterEach(function(done) {
        helper.stopServer(server, done);
    });

    it('3a) should return status 400 when there is no student parameter', function(done) {
        request(server)
        .post(url)
        .expect('Content-Type', /json/)
        .expect(400)    // http response code
        .expect(hasResponseMessage)
        .end(done);
    });

    it ('3b) should return status 204 when student is suspended', function(done) {
        request(server)
        .post(url)
        .send({
            'student': 'studentjon@gmail.com'
        })
        .expect(204, done);
    })
});

describe('POST /api/retrievefornotifications Test', function() {
    var server;
    var url = '/api/retrievefornotifications';

    beforeEach(function(done) {
        server = helper.startFreshServer();
        helper.cleanWithSomeDummyDataInDatabase(done);
    });

    afterEach(function(done) {
        helper.stopServer(server, done);
    });

    it('4a) should return status 400 where there is no teacher parameter', function(done) {
        request(server)
        .post(url)
        .expect(400)
        .expect(hasResponseMessage)
        .end(done);
    });

    it('4b) should return status 200 with 2 entries with input notification and invalid teacher email', function(done) {
        request(server)
        .post(url)
        .send({
            teacher: 'someunknownemail', 
            notification: 'Hello from @me and all of us to @newstudent@gmail.com'})
        .expect(200)
        .expect((res) => res.body.should.have.property('recipients'))
        .expect(function(res) {
            if (res.body.recipients.length != 2)
                throw new Error('Expecting 2 for res.body.recipients but is actually', res.body.recipients.length);
        })
        .end(done);
    });

    it('4c) should return 3 entries with @me in input notification and teacher with 2 active students', function(done) {
        request(server)
        .post(url)
        .send({
            teacher: 'teacherken@gmail.com',
            notification: 'Hello from @me to all of you'
        })
        .expect(200)
        .expect((res) => res.body.should.have.property('recipients'))
        .expect(function(res) {
            if (res.body.recipients.length != 3)
                throw new Error('Expecting 3 for res.body.recipients.length but is actually ', res.body.recipients.length);
        })
        .end(done);
    });
});
