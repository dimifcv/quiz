// programa....: models.js
// Descripción.: Descripción del modelo del Quiz
//

var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://@:/

var url     = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
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

// Importar la definición de la tabla Quiz en quiz.js

var Quiz = sequelize.import(path.join(__dirname, 'quiz') );

// exportar la definción de la tabla Quiz

exports.Quiz = Quiz;

// Creamos y añadimos un registro a la tabla Quiz con: sequelize.syn()

/*
sequelize.sync().success( function() {
   // success() ejecuta el manejador una vez creada la tabla

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

sequelize.sync().then( function() {
   // Then(...) ejecuta el manejador una vez creada la tabla
   Quiz.count().then( function(count) {
      if (count === 0)
      {
         Quiz.create( { pregunta: 'Capital de Italia',
                        respuesta: 'Roma' } );
         Quiz.create( { pregunta: 'Capital de Portugal',
                        respuesta: 'Lisboa' } )
         .then(function() {console.log('Base de datos inicializada.')});
      };
   });
});

// Fin de: models.js





