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

//Using Express router middleware instread.
module.exports = function (app) {
    var router = app.loopback.Router();
    router.get('/ping', function (req, res) {

        res.send('pongaroo');
    });

    router.post('/signup', function (req, res) {
        console.log(req.body);
        Person.signup(req.body.email, req.body.password, function (error, response) {
            if (error || response.body.error) {
                res.send('Error');
            }
            res.send("signin.html", response.body.message + ' ' + response.body.message);
        });
        // res.send("None");
    });




    router.get('/signin', function (req, res) {
        res.sendFile(path.join(__dirname, '../../client', 'signin.html'));
    });

    router.post('/signin', function (req, res) {
        Person.signin(req.body.email, req.body.password, function (error, response) {
            if (error || response.body.error) {
                res.send('Error');
            }
            res.send("home.html" + response.body.message + ' ' + response.body.message);
            // res.send("home.html", response.body.message + ' ' + response.body.message);
        });

    });
    app.use(router);
}
