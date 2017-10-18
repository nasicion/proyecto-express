var uuid = require('uuid');
var _ = require('lodash');


const MongoClient = require('mongodb').MongoClient;

var db

MongoClient.connect('mongodb://localhost/tasks', (err, database) => {
  if (err) return console.log(err)
  db = database;
});

// En este caso guardo mis tareas en memoria, en una aplicacion de verdad esto estaria en
// una base de datos. Pueden extender este ejemplo para usar una base de datos como
// mongo, mysql o un servicio como firebase
// https://www.firebase.com/
// Para evitar que distintos usuarios tengan las tareas mezcladas, el objeto de tareas
// tiene como indice al id del usuario y como valor a un mapa de id de tarea a tarea
//
// tareasPorUsuario = {
//   "id de usuario" : {
//      "tarea1" : new Tarea(),
//      "tarea2" : new Tarea()
//   }
// }
var tareasPorUsuario = {};


/**
 * Modelo de las tareas a ser completadas (TODO).
 * Este modelo esta inspirado en el concepto de Active Record https://es.wikipedia.org/wiki/Active_record
 * Noten que los metodos de instancia, que son unicos por cada tarea estan en el prototipo, mientras
 * que los metodos de clase estan directamente sobre la funcion.
 * @param string  id         El id de la tarea, null si se quiere que se autogenere
 * @param string  usuarioId  El id del usuario al que le pertenece  la tarea.
 * @param string  titulo     El titulo de la tarea.
 * @param boolean completada Si se completo o no.
 */
function Tarea (id, usuarioId, titulo, completada) {
    // Si no me asignan un id lo creo aleatoriamente
    this._id = id || uuid.v4();
    this.usuarioId = usuarioId;
    this.titulo = titulo;
    this.completada = completada;
}

/**
 * Metodo de instancia que borra la tarea de la lista
 */
Tarea.prototype.borrar = function () {
    if (tareasPorUsuario[this.usuarioId]) {
        delete tareasPorUsuario[this.usuarioId][this.id];
    }
};

/**
 * Metodo de clase que crea una tarea y la guarda en "la base"
 * @param  string usuarioId El id del usuario al que le vamos a crear la tarea.
 * @param  string titulo    El titulo de la tarea.
 * @return Tarea            La instancia de la tarea ya agregada a "la base"
 */
Tarea.crear = function (usuarioId, titulo) {
    // Creo una nueva instancia de tarea, el id sera generado automaticamente
    var tarea = new Tarea(null, usuarioId, titulo, false);

    // // Lo guardo en mi "base"
    db.collection('tasks').save(tarea, (err, result) => {
        if (err) console.log(err);
    });
    return tarea;
};

/**
 * Metodo de clase que devuelve una tarea si fue encontrada
 * @param  string  usuarioId  El id del usuario al que le pertenece la tarea.
 * @param  string  id         El id de la tarea buscada
 * @return Tarea              La tarea si se encuentra o null
 */
Tarea.buscarUno = function (usuarioId, id) {
    if (tareasPorUsuario[usuarioId] && tareasPorUsuario[usuarioId][id]) {
        return tareasPorUsuario[usuarioId][id];
    }
    return null;
};

/**
 * Metodo de clase que borra todas las tareas para un usuario
 * @param  string usuarioId   El id del usuario al que se le van a borrar las tareas
 */
Tarea.borrarTodas = function (usuarioId) {
    delete tareasPorUsuario[usuarioId];
};

/**
 * Metodo de clase que busca todas las tareas de un usuario.
 * @param  string usuarioId   Id del usuario del que se quieren buscar las tareas.
 * @return <id, Tarea>        Devuelve un mapa de tareas
 */
Tarea.buscarTodas = function (usuarioId) {
    // Si no hay tareas para ese usuario, devuelvo un mapa vacio
    return db.collection('tasks').find().toArray()
    .then(function(items){
        return items;
    });
};

/**
 * Metodo de clase que busca las tareas pendientes de un usuario.
 * @param  string usuarioId   Id del usuario del que se quieren buscar las tareas.
 * @return <id, Tarea>        Devuelve un mapa de tareas
 */
Tarea.buscarPendientes = function (usuarioId) {
    return db.collection('tasks').find({
        completada : false
    }).toArray()
    .then(function(items){
        return items;
    });
};

/**
 * Metodo de clase que busca las tareas completas de un usuario.
 * @param  string usuarioId   Id del usuario del que se quieren buscar las tareas.
 * @return <id, Tarea>        Devuelve un mapa de tareas
 */
Tarea.buscarCompletas = function (usuarioId) {
    return db.collection('tasks').find({
        completada : true
    }).toArray()
    .then(function(items){
        return items;
    });
};

module.exports = Tarea;
