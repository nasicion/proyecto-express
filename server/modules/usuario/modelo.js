var db = require('../db/db');

function User(username, password, name, lastname, email) {
    this.name = name;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.email = email;
}

User.crear = function (usuario) {
    db.getDb().collection('user').save(usuario, (err, result) => {
        if (err) console.log(err);
    });
    return usuario;
}

User.validar = function(username, password) {
    return db.getDb().collection('user').findOne({
        "username" : username,
        "password" : password
    });
}

User.findById = function(id) {
    return db.getDb().collection('user').findOne({"_id" : id});
}

User.generateUsername = function(name, lastname) {
    return (name.substring(0,1) + lastname).toLowerCase();
}

/**
 * Search user by email
 */
User.searchByEmail = function(email) {
    return db.getDb().collection('user').findOne({"email" : email});
}

module.exports = User;