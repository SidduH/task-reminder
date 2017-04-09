// module.exports = function(app){
//     //Install a "/ping" route that returns "pong"
//     app.get('/ping', function(req, res){
//         res.send("pong");
//     })
// }

//var person = require('../../common/models/person');
var loopback = require('loopback');
var path = require('path');
var Person = loopback.getModel('Person');
var Task = loopback.getModel('Task');

//Using Express router middleware instread.
module.exports = function (app) {
    var router = app.loopback.Router();
    router.get('/', function (req, res) {
        Task.fetchReminders(req.body, function (error, response) {
            if (error || response.body.error) {
                res.send('Error ' + response.body.error.message);
            }
            res.send("Hi, the tasks are: " + response.body);
            // res.send("home.html", response.body.message + ' ' + response.body.message);
        });
    });

    router.post('/signup', function (req, res) {
        console.log(req.body);
        Person.signup(req.body.email, req.body.password, function (error, response) {
            if (error || response.body.error) {
                res.send('Error ' + response.body.error);
            }
            res.send("Sign up update: " + response.body.result + ' ' + response.body.message);
        });
    });


    router.get('/signup', function (req, res) {
        res.sendFile(path.join(__dirname, '../../client', 'index.html'));
    });


    router.get('/signin', function (req, res) {
        res.sendFile(path.join(__dirname, '../../client', 'signin.html'));
    });

    router.post('/signin', function (req, res) {
        Person.signin(req.body.email, req.body.password, function (error, response) {
            if (error || response.body.error) {
                res.send('Error');
            }
            res.send("Sign in update " + response.body.result + ' ' + response.body.message);
            // res.send("home.html", response.body.message + ' ' + response.body.message);
        });

    });

    router.get('/addTask', function (req, res) {
        res.sendFile(path.join(__dirname, '../../client', 'addTask.html'));
    });

    router.post('/addTask', function (req, res) {
        Task.addTask(req.body, function (error, response) {
            if (error || response.body.error) {
                res.send('Error ' + response.body.error.message);
            }
            res.send("Created a task successfully!");
            // res.send("home.html", response.body.message + ' ' + response.body.message);
        });

    });

    app.use(router);
}
