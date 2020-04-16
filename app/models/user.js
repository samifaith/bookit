// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        firstName    : String,
        lastName     : String,
        email        : String,
        password     : String
    },
<<<<<<< HEAD
    genres           : {
      romance          : Boolean,
      mystery          : Boolean,
      fantasy          : Boolean,
      scienceFiction   : Boolean,
      thrillers        : Boolean,
      youngAdult       : Boolean,
      nonFiction       : Boolean,
      fiction          : Boolean,
      selfHelp         : Boolean
    }
=======
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

>>>>>>> f0d2bb74fce955e301d6415c111117868cb0e9b6
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
