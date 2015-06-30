/* *************************************************************************** *
 * Programa....: /quiz/controllers/quiz_controller.js
 * Descripción.: Añade funcionalidades a los callbacks.
 * *************************************************************************** *
*/

// Importar models.

var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId

exports.load = function(req, res, next, quizId) {
   models.Quiz.find(quizId).then (
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
   var filtro = req.query.filtro;
   filtro     = filtro.replace(" ", "%");
   models.Quiz.findAll( {where: ["pregunta like ?", '%'+filtro+'%'], order: 'pregunta ASC'}
      ).then ( 
      function(quizes) {
         res.render('quizes/index', { quizes: quizes });
      }
   ).catch( function(error) { next(error);})
};

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
      res.render('quizes/show', {quiz: req.quiz});
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

   res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
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
      res.render('author', {title:'Quiz', author: 'Damián'});
}

// GRT /quizes/busqueda
exports.busqueda = function(req, res) {
      res.render('quizes/busqueda', {filtro: 'Preguntas'});
}

// exportar models

exports.models;

/*  Fin de: /quiz/controllers/quiz_controller.js  */

