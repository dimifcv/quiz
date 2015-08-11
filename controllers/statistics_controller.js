/* *************************************************************************** *
 * Programa....: /quiz/controllers/statistics_controller.js
 * Descripción.: Añade funcionalidades a los callbacks.
 * *************************************************************************** *
*/

// Importar models.

var models = require('../models/models.js');


// Estadísticas

var estadisticas = {
   preguntas_tot: 0,
   preguntas_con: 0,
   preguntas_sin: 0,
   comentarios_tot: 0,
   comentarios_pub: 0,
   comentarios_sin: 0,
   comentarios_medio: 0
};

var mediaComm = [];
var errors = [];


exports.contador = function( req, res, next) {     

   
    models.Quiz.count().then( function(pPreguntas) {
        estadisticas.preguntas_tot = pPreguntas;
        return models.Comment.count();
        
    }).then( function(pComentarios) {
        estadisticas.comentarios_tot = pComentarios;
        
        if (estadisticas.preguntas_tot !== 0) {
            estadisticas.comentarios_medio = (estadisticas.comentarios_tot / estadisticas.preguntas_tot).toFixed(2);
        }
        
        var preguntas_con = models.Quiz.findAndCountAll({
            include: [ {
                model: models.Comment, required: true,
            }],
            distinct: true
        });
        
        return preguntas_con;
        
    }).then( function(pPreguntas_con) {
        var comentarios_publ = models.Comment.findAndCountAll({
            where: { publicado: true }
        });
        
        estadisticas.preguntas_con = pPreguntas_con.count;
        estadisticas.preguntas_sin = estadisticas.preguntas_tot - pPreguntas_con.count;
        
        return comentarios_publ;
        
    }).then( function( pComentarios ) {
        estadisticas.comentarios_pub = pComentarios.count;
        estadisticas.comentarios_sin = estadisticas.comentarios_tot - pComentarios.count;
        
    })
    .catch(function (err) { errors.push(err); })
    .finally(function () {
      res.render('statistics/show', {estadisticas: estadisticas, errors: errors });
    });

};
  
/*   
        return models.Quiz.findAll({
            attributes: ['Quiz.pregunta',
               [models.sequelize.fn('count', models.sequelize.col('Comment.id')), 'CommentCount']],
            include: [{model: models.Comment, required: false}],
            group: 'Quiz.pregunta'
        })


   return models.Comment.;
   }).then( function(nComentarios_tot) {
      estadisticas.comentarios_tot = nComentarios_tot;
   
   }).catch(function (err) { errors.push(err); })
   .finally(function () {
      next();
   });   
*/
  

// exportar models

exports.models;

/*  Fin de: /quiz/controllers/statistics_controller.js  */

