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
    goodreads         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    genres           : {
      romance          : Boolean,
      mystery          : Boolean,
      fantasy          : Boolean,
      scienceFiction   : Boolean,
      thriller         : Boolean,
      juvenile         : Boolean,
      nonFiction       : Boolean,
      fiction          : Boolean,
      selfHelp         : Boolean
    },
    genreCount         : {
      romance          : Number,
      mystery          : Number,
      fantasy          : Number,
      scienceFiction   : Number,
      thriller         : Number,
      juvenile         : Number,
      nonFiction       : Number,
      fiction          : Number,
      selfHelp         : Number
    },
    favGenres          : Array


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
