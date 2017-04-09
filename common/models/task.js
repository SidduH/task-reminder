'use strict';

var request = require('request');
var loopback = require('loopback');
var Task = loopback.getModel('Task');

const addTask_url = "http://localhost:3000/api/Tasks"
module.exports = function (Task) {

    Task.addTask = function (request_data, cb) {
        console.log(request_data);

        request.post({
            headers: { "content-type": "application/json" },
            url: addTask_url,
            json: request_data

        }, function (error, response) {
            cb(error, response);
        });
    }

    Task.remoteMethod('addTask', {
        accepts: [
            { arg: 'time', type: 'string' },
            { arg: 'name', type: 'string' },
            { arg: 'priority', type: 'string' },
            { arg: 'type', type: 'string' },
            { arg: 'alert-before', type: 'string' }
        ],
        returns: { arg: 'Result', type: 'string' }
    });

    Task.fetchReminders = function (request_data, cb) {
        request.get("http://localhost:3000/api/Tasks", function (error, response) {
            cb(error, response);
        });
    };

    Task.remoteMethod('fetchReminders', {
        accepts: [
            { arg: 'body', type: 'string' }
        ],
        returns: { arg: 'Result', type: 'string' }
    });
};
