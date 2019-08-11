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
    beforeEach(function(done) {
        server = helper.startFreshServer();
        helper.cleanDatabases(done);
    });

    afterEach(function(done) {
        helper.stopServer(done, server);
    });


    it('should return error if there is no input teacher parameter', function (done) {
        request(server)
        .post('/api/register')
        .send({})
        .expect("Content-type", /json/)
        .expect(400)      // http response
        .expect(hasResponseMessage)
        .end(done);
    });

    it('should return error if there is no input students parameter', function (done) {
        request(server)
        .post('/api/register')
        .send({teacher: 'teacherken@gmail.com'})
        .expect("Content-type", /json/)
        .expect(400)      // http response
        .expect(hasResponseMessage)
        .end(done);
    });

    it('should return status 204 if it successfully adds students', function (done) {
        request(server)
        .post('/api/register')
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
    beforeEach(function(done) {
        server = helper.startFreshServer();
        helper.cleanWithSomeDummyDataInDatabase(done);
    });

    afterEach(function(done) {
        helper.stopServer(done, server);
    });

    it('should return status 400 with message without teacher params', function(done) {
        request(server)
        .get('/api/commonstudents')
        .expect('Content-Type', /json/)
        .expect(400)    // http response
        .expect(hasResponseMessage)
        .end(done);
    });

    it('should return status 200 with input teacher params', function(done) {
        request(server)
        .get('/api/commonstudents')
        .query({teacher: 'teacherken@gmail.com'})
        .query({teacher: 'teacherjoe@gmail.com'})
        .expect('Content-Type', /json/)
        .expect(200)    // http response
        .expect(hasResponseStudents)
        .end(done);
    });
});
