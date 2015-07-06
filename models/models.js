/* *************************************************************************** *
 * Programa....: /quiz/models/models.js                           
 * Descripción.: Detalla la conexión a la Base de Datos: SQLite y Postgres.
 *               Escribe primeros registros de la BD Quiz. La crea e inicializa.
 * *************************************************************************** *
*/

var path = require('path');
var url  = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);

var protocol= (url[1] || null);
var dialect = (url[1] || null);
var user    = (url[2] || null);
var pwd     = (url[3] || null);
var port    = (url[5] || null);
var host    = (url[4] || null);
var DB_name = (url[6] || null);
var storage = process.env.DATABASE_STORAGE;

// Cargamos el modelo ORM

var Sequelize = require('sequelize');

// Usar BD: SQLite o Postgres

var sequelize = new Sequelize( DB_name, user, pwd, 
                        { dialect:   protocol,
                          protocol:  protocol,
                          port:      port,
                          host:      host,
                          storage:   storage,   // sólo SQLite (.env)
                          omitNull:  true       // sólo postgres
                         }
                    );

/*
// Version 1:
// Usar BD SQLite
var sequelize = new Sequelize( null, null, null, 
                        {dialect: "sqlite",
                         storage: "quiz.sqlite"}
);
*/

// Importar la definición de la tabla Quiz en quiz.js

var Quiz = sequelize.import(path.join(__dirname, 'quiz') );

// exportar la definción de la tabla Quiz

exports.Quiz = Quiz;

// sequelize.sync() inicializa tabla de preguntas en DB

sequelize.sync().then( function() {
   // Then(...) ejecuta el manejador una vez creada la tabla
   Quiz.count().then( function(count) {
      if (count === 0)
      {
         Quiz.create( { pregunta: 'Capital de Italia',
                        respuesta: 'Roma' } );
         Quiz.create( { pregunta: 'Capital de Portugal',
                        respuesta: 'Lisboa' } );
         Quiz.create( { pregunta: 'Capital de Alemania',
                        respuesta: 'Berlin' } )
         .then(function() {console.log('Base de datos inicializada.')});
      };
   });
});

/*
// Versión 1:
// sequelize.sync() crea e inicializa tabla de preguntas en DB.
sequelize.sync().success( function() {
   // success(..) ejecuta el manejador una vez creada la tabla

   Quiz.count().success( function(count) {
      if ( count === 0 ) {   // La tabla seinicializsa sólo si esta en cero.
         Quiz.create( { pregunta: 'Capital de Italia',
                        respuesta: 'Roma'
                      })
         .success( function() { console.log('Base de Datos inicializada.')});
      };
   });
});
*/

/*  Fin de: /quiz/models/models.js  */

