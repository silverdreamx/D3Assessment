const teacherController = require('../controllers/teacher');

module.exports = (app) => {
    // Testing for whether routes are properly exported
    app.get('/api', (req, res) => {
        res.status(200)
        .header('Content-Type', "application/json")
        .send({message: "GET route set up successfully!"});
    });

    app.post('/api', (req, res) => {
        console.log('req.body = ', req.body);
        console.log('req.body.students = ', req.body.students);
        res.status(200).send({message: "POST route set up successfully!"});
    });

    // User story 1: teacher registering students
    app.post('/api/register', teacherController.createMaillist);

    // User story 2: teacher retrieving list of students
    app.get('/api/commonstudents', teacherController.getMaillist);
}