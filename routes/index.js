const teacherController = require('../controllers/teacher');

module.exports = (app) => {
    // Testing for whether routes are properly exported
    app.get('/api', (req, res) => {
        res.status(200).send({message: "GET route set up successfully!"});
    });

    app.post('/api', (req, res) => {
        res.status(200).send({message: "POST route set up successfully!"});
    });

    // User story 1: teacher registering students
    app.post('/api/register', teacherController.createMaillist);

    // User story 2: teacher retrieving list of students
    app.get('/api/commonstudents', teacherController.getMaillist);

    // User story 3: teacher suspending a specific student
    app.post('/api/suspend', teacherController.suspendStudent);

    // User story 4: teacher retrieve list of students to receive notification
    app.post('/api/retrievefornotifications', teacherController.retrieveListForNotifications);
}