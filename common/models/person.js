'use strict';
const request = require('request');
const signup_url = "https://sandbox.unocoin.co/api/v1/authentication/signup";
const signin_url = "https://sandbox.unocoin.co/api/v1/authentication/signin";
const access_token = "a49830bda3844b749a78818da420076ef9471d5d";
module.exports = function (Person) {
    Person.signup = function (mailid, pass, cb) {
        request.post({
            headers: { "content-type": "application/x-www-form-urlencoded", "Authorization": "Bearer " + access_token },
            url: signup_url,
            json: { "content-type": "application/x-www-form-urlencoded", "email_id": mailid, "password": pass }

        }, function (error, response) {
            cb(error, response);
        });//cb(null, 'Greetings... ' + mailid+pass);
    }

    Person.remoteMethod('signup', {
        accepts: [
            { arg: 'mailid', type: 'string' },
            { arg: 'password', type: 'string' }
        ],
        returns: { arg: 'Result', type: 'string' }
    });

    Person.signin = function (mailid, password, cb) {
        var json_data = {
            "content-type": "application/x-www-form-urlencoded",
            "email_id": mailid,
            "signinpassword": password,
            "response_type": "code",
            "client_id": "T4EG6LDGHC",
            "redirect_uri": "http://127.0.0.1:3000/index.html",
            "scope": "all",

        }
        request.post({
            headers: { "content-type": "application/x-www-form-urlencoded", "Authorization": "Bearer " + access_token },
            url: signin_url,
            json: json_data

        }, function (error, response) {
            cb(error, response);
        });
    }

    Person.remoteMethod('signin', {
        accepts: [
            { arg: 'mailid', type: 'string' },
            { arg: 'password', type: 'string' }
        ],
        returns: { arg: 'Result', type: 'string' }
    });



};
