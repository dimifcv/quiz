/* *************************************************************************** *
 * Programa....: /quiz/controllers/quiz_controller.js
 * Descripción.: Añade funcionalidades a los callbacks.
 * *************************************************************************** *
*/

// Importar models.

var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId

exports.load = function(req, res, next, quizId) {
   models.Quiz.find( {
                        where: {id: Number(quizId) },
                        include: [{model: models.Comment }]
         }
      )
      .then (
      function(quiz) {
         if (quiz)
         {
            req.quiz = quiz;
            next();
         }
         else
         {
            next( new Error('No existe quizId: ' + quizId) );
         }
      }
   ).catch( function(error) {next(error);});
};


// GET /quizes

exports.index = function(req, res) {
   if (typeof(req.query.filtro) !== 'undefined') {
      var filtro = req.query.filtro;

      filtro     = filtro.replace(" ", "%");
      models.Quiz.findAll( {where: ["pregunta like ?", '%'+filtro+'%'], order: 'pregunta ASC'}
      ).then ( 
      function(quizes) {
         res.render('quizes/index', { quizes: quizes, errors: [] });
      }
      ).catch( function(error) { next(error);})

   }
   else 
   {
      var quiz = models.Quiz.build( req.body.quiz );

      models.Quiz.findAll({order: 'pregunta ASC'})
      .then ( 
         function(quizes) {
            res.render('quizes/index', { quizes: quizes, errors: [] });
         }
      ).catch( function(error) { next(error);})
   }
};

/*
   models.Quiz.findAll( {where: ["pregunta like ?", '%'+filtro+'%'], order: 'pregunta ASC'}
      ).then ( 
      function(quizes) {
         res.render('quizes/index', { quizes: quizes });
      }
   ).catch( function(error) { next(error);})
   };

*/
/*
   models.Quiz.findAll( {where: ["pregunta like ?", '%'+filtro+'%'], order: 'pregunta ASC'}
      ).then ( 
      function(quizes) {
         res.render('quizes/index', { quizes: quizes });
      }
   ).catch( function(error) { next(error);})
*/

/*
// Versión 4:
exports.index = function(req, res) {
   models.Quiz.findAll().then ( 
      function(quizes) {
         res.render('quizes/index', { quizes: quizes });
      }
   ).catch( function(error) { next(error);})
};
*/

// GET /quizes/:Id
// Versión: 3
exports.show = function(req, res) {
      res.render('quizes/show', {quiz: req.quiz, errors: [] });
};

/* 
//GET /quizes/question
// Versión 2:
exports.question = function(req, res) {
   models.Quiz.findAll().success( function(quiz) {
      res.render('quizes/question', {pregunta: quiz[0].pregunta})
   })
};

// Versión 1:
exports.question = function(req, res) {
      res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

*/


// GET /quizes/answer
// Versión 3:

exports.answer = function(req, res) {
   var resultado = '¡Incorrecto!';

   if (req.query.respuesta === req.quiz.respuesta)
   {
      resultado = '¡Correcto!';
   }

   res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};

/* GET /quizes/answer
// Versión 2:

exports.answer = function(req, res) {
   models.Quiz.findAll().success( function(quiz) {

      if (req.query.respuesta === quiz[0].respuesta)
         res.render('quizes/answer', {respuesta: 'Correcto'});
      else
         res.render('quizes/answer', {respuesta: 'Incorrecto!!'});
   })
};

// Versión 1:
exports.answer = function(req, res) {
      if (req.query.respuesta === 'Roma')
         res.render('quizes/answer', {respuesta: 'Correcto'});
      else
         res.render('quizes/answer', {respuesta: 'Incorrecto!!'});
};

*/


// GET /author

exports.author = function(req, res) {
      res.render('author', {title:'Quiz', author: 'Damián', errors: []});
};

// GRT /quizes/busqueda
exports.busqueda = function(req, res) {
      res.render('quizes/busqueda', {filtro: 'Preguntas', errors: [] });
};

// GET /quizes/new
// Versión 1:

exports.new = function(req, res) {
   var quiz = models.Quiz.build(
      { pregunta: "pregunta", respuesta: "respuesta", tematica: "temática" });

   res.render('quizes/new', {quiz: quiz, errors: [] });
};

// POST /quizes/create
// Versión 2:

exports.create = function(req, res) {
   var quiz = models.Quiz.build( req.body.quiz );

   quiz.validate().then (
      function(err) {
         if (err)
         {
            res.render('quizes/new', {quiz: quiz, errors: err.errors} );
         }
         else
         {
            quiz
            .save( {fields: ["pregunta", "respuesta", "tematica"]})
            .then ( function() {
                  res.redirect('/quizes')
               }
            );
         }
      }
   );
};

// Versión 1:
/*
exports.create = function(req, res) {
   var quiz = models.Quiz.build( req.body.quiz );

   // Guarda los campos: pregunta y respuesta de Quiz en la BD
   quiz.save( {fields: ["pregunta", "respuesta"] }).then ( 
      function() {
         res.redirect('/quizes');   // url relativo, manda a lista de preguntas
      })
};
*/

// GET /quizes/:Id/edit
// Versión: 1
exports.edit = function(req, res) {
      var quiz = req.quiz;       // autoload de la instancia de quiz

      res.render('quizes/edit', {quiz: quiz, errors: [] });
};

// PUT /quizes/:Id/
// Versión: 1
exports.update = function(req, res) {
      req.quiz.pregunta  = req.body.quiz.pregunta;
      req.quiz.respuesta = req.body.quiz.respuesta;
      req.quiz.tematica  = req.body.quiz.tematica;

      req.quiz
      .validate()
      .then(
         function(err) {
            if (err) 
            {
               res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
            }
            else
            {
               req.quiz       // Guarda campos: pregunta y respuesta
               .save( {fields: ["pregunta", "respuesta", "tematica"] })
               .then ( function() {
                     res.redirect('/quizes');
                  }
               );
            }
         }
      );
};


// DELETE /quizes/:Id
// Versión: 1
exports.destroy = function(req, res) {
      req.quiz.destroy()
      .then ( function() {
            res.redirect('/quizes');
         }
      )
      .catch (function (error) {
            next(error);
      } );
};


// exportar models

exports.models;

/*  Fin de: /quiz/controllers/quiz_controller.js  */

