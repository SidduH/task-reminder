// module.exports = function(app){
//     //Install a "/ping" route that returns "pong"
//     app.get('/ping', function(req, res){
//         res.send("pong");
//     })
// }

//Using Express router middleware instread.
module.exports = function(app){
    var router = app.loopback.Router();
    router.get('/ping', function(req, res){
        
        res.send('pongaroo');
    });
    app.use(router);
}
