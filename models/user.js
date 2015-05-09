(function (module) {
    "use strict";
    module.exports = function (mongoose) {
        var userSchema = mongoose.Schema({
            username: String,
            name: String,
            id: Number,
            email: String
        });
        return mongoose.model('User', userSchema);
    };
}(module));


