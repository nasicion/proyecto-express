var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const SMTPServer = require('smtp-server').SMTPServer;

var tareas = require('./server/modules/tarea/rutas');
var usuarios = require('./server/modules/usuario/rutas');
var User = require('./server/modules/usuario/modelo');

var db = require('./server/modules/db/db');
var ObjectID = require('mongodb').ObjectID;

// Creo la instancia de express
var app = express();


// Le indico que maneje sesiones por cookies
// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 9*60*1000 }, // Expira en 9 minutos (ver modelo para saber porque)
//     secret: 'sshhhh es un secreto'
// }));
app.use(session({ secret : "dogos" }));
app.use(passport.initialize());
app.use(passport.session());


/**
 * PassportJS configuration
 */
passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
passport.deserializeUser(function(id, done) {
    var userPromise = db.getDb().collection('user').find({ "_id" : new ObjectID(id) })
    .project({
        name : 1,
        lastname : 1,
        username : 1,
        email : 1
    }).toArray().then(users => { 
        done(null, users[0]);
     });
});

passport.use(
    new LocalStrategy(
        function(username, password, done) {
            User.validar(username, password)
                .then(user => {
                    if(user == null || user == undefined) {
                        return done(null, false, { message : 'Wrong username or password' });
                    } else {
                        return done(null, user);
                    }
                });
        }
    )
);

// Que sirva contenido estatico desde la carpeta public
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'dist')));

// Que interprete submits de formulario y pedidos json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuro el motor de templates
// var hbs = exphbs.create({
//     defaultLayout: 'principal',
//     helpers: require('./views/helpers')
// });

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

/**
 * Valida que el usuario tenga una sesión iniciada
 */

validateSession = function(req, res, next) { 
    if(!req.isAuthenticated()) {
        res.status(401).send('401');
    } else {
        next();
        
    }
}

// Monto las rutas
app.use('/api/tareas/', validateSession , tareas);
app.use('/api/usuarios/', usuarios);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Manejo de paginas no encontradas
app.use(function(req, res) {
    res.status(404).send('no_encontrada');
});

// Manejo de pagina de error
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send('error');
});

// Defino el puerto en el que escucha el servidor. Puede venir por
// variables de entorno (por heroku) o usar el 8000
app.set('port', (process.env.PORT || 8000));

//Inicializo la conección de base de datos
db.init(function(error) {
    if(error) {
        console.log(error);
        throw error;
    }

    // Escucho en el puerto indicado
    app.listen(app.get('port'), function () {
        var date = new Date();
;
        console.log('Escuchando en el puerto %d', 
            app.get('port'), 
            'at', 
            date.getHours() , ':', date.getMinutes(), ':', date.getSeconds()
        );
    });
});


