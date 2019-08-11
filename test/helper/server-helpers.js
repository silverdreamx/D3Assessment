module.exports = {
    startFreshServer() {
        // force restart server for each test
        delete require.cache[require.resolve('../../server')];
        var server = require('../../server').server;
        return server;
    },

    cleanDatabases(done = null) {
        var models = require('../../server').models;

        // clean database
        models.sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
        .then(function(result) {
            console.log('>> forcing sync...');
            return models.sequelize.sync({force: true});
        }).then(function() {
            console.log('>> successfully wiped database!');
            if (done) done();
            return models.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
        }).catch(function(err) {
            console.log('>> error cleaning database!');
            if (done) done();
        });
    },

    addDummyDataIntoDatabase(done = null) {
        newMaillist = [
            {
                teacher: "teacherken@gmail.com",
                student: "studentjon@gmail.com",
                active: 1
            },{
                teacher: "teacherken@gmail.com",
                student: "studenthon@gmail.com",
                active: 0
            },{
                teacher: "teacherken@gmail.com",
                student: "student_only_under_teacher_ken@gmail.com",
                active: 1
            },{
                teacher: "teacherjoe@gmail.com",
                student: "studentjon@gmail.com",
                active: 1
            },{
                teacher: "teacherjoe@gmail.com",
                student: "studenthon@gmail.com",
                active: 0
            },{
                teacher: "teachermay@gmail.com",
                student: "studentjon@gmail.com",
                active: 1
            },{
                teacher: "teachermay@gmail.com",
                student: "studentwayne@gmail.com",
                active: 1
            }
        ]

        var Maillist = require('../../models').maillist;

        Maillist.bulkCreate(newMaillist, {returning: true, validate: true})
        .then((result) => {
            console.log('>> added dummy data!');
            if (done) done();
        }).catch((error) => {
            console.log('>> error when trying to add dummy data!');
            if (done) done();
        });
    },

    cleanWithSomeDummyDataInDatabase(done) {
        this.cleanDatabases(this.addDummyDataIntoDatabase(done));
    },

    stopServer(done, server) {
        // force shutting down server at the end of each test
        server.close();
        console.log('>> server closed!');
        done();
    }

};