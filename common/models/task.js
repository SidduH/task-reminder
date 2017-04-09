'use strict';

module.exports = function (Task) {
    Person.addTask = function (mailid, password, cb) {
        request.post({
            headers: { "content-type": "application/json" }
       
        }, function (error, response) {
            cb(error, response);
        });
    }

    Person.remoteMethod('addTask', {
        accepts: [
            { arg: 'mailid', type: 'string' },
            { arg: 'password', type: 'string' }
        ],
        returns: { arg: 'Result', type: 'string' }
    });


};
