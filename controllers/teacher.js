var Maillist = require('../models').maillist;

module.exports = {
    createMaillist(req, res) {
        console.log('teacher.js > createMaillist()');

        var jsonBody = req.body;

        let teacherEmail;
        if (jsonBody.hasOwnProperty('teacher'))
            teacherEmail = jsonBody.teacher;
        else
            teacherEmail = "";
        
        let studentEmailList;
        if (jsonBody.hasOwnProperty('students'))
            studentEmailList = jsonBody.students;
        else
            studentEmailList = [];
        
        var errorMsg = "";
        var newMaillist = [];

        console.log('req.body = ', req.body);

        // checking for valid input request body
        if (teacherEmail.length == 0) {
            errorMsg += 'no input teacher field!|';
        }
        if (studentEmailList.length == 0) {
            errorMsg += 'no input students field!|';
        }

        // no errors from invalid input json body
        if (errorMsg.length == 0) {
            for (var index = 0; index < studentEmailList.length; ++index) {
                newMaillist.push({
                    teacher: teacherEmail,
                    student: studentEmailList[index],
                    active: 1
                });
            }

            console.log('newMaillist.length = ', newMaillist.length);

            Maillist.bulkCreate(newMaillist, {returning: true, validate: true})
            .then((result) => {
                console.log(result);
                return res.status(204).send();
            }).catch((error) => {
                errorMsg += error;
                return res.status(400).send({message: errorMsg});
            });
        } else {
            errorMsg = errorMsg.substr(0, errorMsg.length - 1);
            console.log('error! ', errorMsg);
            // send HTTP 400 bad request error response
            return res.status(400).send({message: errorMsg});
        }
    }
};