(function (module) {
    module.exports = function (router, UserMongo) {
        
        router.get('/user/test', function (req, res, next) {
            return res.status(200).jsonp({
                'message': 'hi there'
            });
        });

        router.get('/user', function (req, res, next) {
            UserMongo.find({}, function (err, data) {
                if (err) {
                    return res.status(500).jsonp({
                        "message": "Error consultando valores",
                        "error": err
                    });
                }
                return res.status(200).jsonp({
                    "message": "Exito al consultar el usuario",
                    "data": data
                });
            });
        });

        router.put('/user', function (req, res, next) {
            var requestUser = req.body.user;
            var jsonUser = new UserMongo();
            jsonUser.username = requestUser.username;
            jsonUser.name = requestUser.name;
            jsonUser.id = requestUser.id;
            jsonUser.email = requestUser.email;
            jsonUser.save(function (err, data) {
                if (err) {
                    return res.status(500).jsonp({
                        "message": "Error insertando valores",
                        "error": err
                    });
                }
                return res.status(200).jsonp({
                    "message": "Exito insertando el usuario",
                    "data": data
                });
            });
        });
        
        router.delete('/user/:id', function(req, res){
            var userId = req.params.id;
            UserMongo.findOneAndRemove({id: userId}, function (err, data){
                if (err) {
                    return res.status(500).jsonp({
                        "message": "Error eliminando usuario",
                        "error": err
                    });
                }
                if(!data){
                    return res.status(400).jsonp({
                        "message": "El usuario no existe",
                        "idUser": userId
                    });
                }
                return res.status(200).jsonp({
                    "message" : "Usuario eliminado correctamente",
                    "data" : data
                });
            });
        });
        
        return router;
    };
}(module));


