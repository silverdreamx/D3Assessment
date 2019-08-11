var sequelize = require('../models').sequelize;
var Sequelize = require('../models').Sequelize;
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
    },

    getMaillist(req, res) {
        let teacher;
        if (req.query.teacher)
            teacher = req.query.teacher;
        else
            teacher = "";

        if (teacher.length > 0) {
            console.log('input teacher parameters: ', teacher);
            teacherList = [];
            if (typeof(teacher) == "string") {
                teacherList.push(teacher);
            } else {
                teacherList = teacher;
            }

            if (teacherList.length >= 1) {
                Maillist.findAll({
                    attributes: ['student'],
                    where: {
                        teacher: teacherList
                    },
                    group: ['student'],
                    having: Sequelize.literal('COUNT(student) = '+ teacherList.length)
                })
                .then((result) => {
                    console.log('input teacherList = ', teacherList);
                    console.log('result = ', result);
                    var studentList = [];
                    for (var index = 0; index < result.length; ++index)
                        studentList.push(result[index].student);

                    return res.status(200).send({students: studentList});
                }).catch ((err) => {
                    console.log('error! err = ', err);
                    return res.status(400).send({message: err});
                });
            } else {
                console.log('error! invalid input teacher parameter(s) : ', teacher);
                return res.status(400).send({message: 'invalid input teacher parameter(s)!'});
            }
        }
        else {
            console.log('error! no input parameters to find student list!');
            return res.status(400).send({message: 'no input teacher parameter to find student list'});
        }
    },

    suspendStudent(req, res) {
        if (!req.body.hasOwnProperty('student'))
            return res.status(400).send({message: 'no input student parameter!'});
        
        var student = req.body.student;
        if (student.length == 0)
            return res.status(400).send({message: 'invalid input student parameter!'});
        else {
            // find all entries with student email and turn off active flag
            Maillist.update(
                {active: 0},
                {where: {
                    [Sequelize.Op.and]: [
                        {student: student},
                        {active: 1}]
                    }
                }
            )
            .then((result) => {
                console.log('result = ', result);
                if (result > 0) {
                    console.log('successfully suspended student ', student);
                    return res.status(204).send();
                }
                else 
                    return res.status(400).send({message: 'no one to suspend with student email ' + student});
            })
            .catch((err) => {
                console.log('error! err = ', err);
                return res.status(400).send({message: err});
            });
        }
    },

    retrieveListForNotifications(req, res) {
        return res.status(200).send({message: 'not implemented yet!'});
    }
};