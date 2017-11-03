var express = require('express');
var passport = require('passport');
var randomstring = require('randomstring');
const nodemailer = require('nodemailer');


var User = require('./modelo');
var email = require('../email');

var rutas  = express.Router();

const EMAIL_ALREADY_USED_MESSAGE = "There's already a user registered with this email account"


rutas.post('/login', 
    passport.authenticate('local', 
    { 
        successRedirect: '/',
        failureRedirect: '/login',
    })    
);

rutas.post('/register', function(req, res) {
    
    var body = req.body;
    
    //validate email
    userByEmail = User.searchByEmail(body.email);
    
    userByEmail
    .then( user => {
        if(user) {
            res.send({success : false, message : EMAIL_ALREADY_USED_MESSAGE});
            return;
        } else {
            var username = User.generateUsername(body.name, body.lastname);
            var usuario = new User(username, randomstring.generate(), body.name, body.lastname, body.email);
            User.crear(usuario);
            
            email.sendEmail(usuario.email, usuario.password, (error, info) => {
                if (error) {
                    return console.log(error);
                } else {
                    console.log('finished sending email');
                    console.log('Mensaje enviado: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    var response = {
                        success : true,
                        message : nodemailer.getTestMessageUrl(info)
                    }
                    res.send(response);
                    //res.status(500).send(error);
                }
                
            });
        }


    });
});

module.exports = rutas;