/* *************************************************************************** *
 * Programa....: /quiz/controllers/comment_controller.js
 * Descripción.: Añade funcionalidades a los callbacks de la tabla Comment.
 * *************************************************************************** *
*/

// Importar models.

var models = require('../models/models.js');

// GET /quizes/:quizId/comments/new

exports.new = function(req, res) {
   res.render('comments/new.ejs', {quizid: req.params.quizId, errors: [] });
};

// POST /quizes/:quizId/comments

exports.create = function(req, res) {
   var comment = models.Comment.build( 
                        { texto:  req.body.comment.texto,
                          QuizId: req.params.quizId
                        } );
   
   comment.validate()
   .then(
      function(err) {
         if (err)
         {
            res.render('comments/new.ejs', 
                        { comment: comment, 
                          quizid: req.params.quizId, 
                          errors: err.errors } );
         }
         else
         {        // Guarda en BD el campo texto de Comment.
            comment.save()
            .then( 
               function() {
                  res.redirect('/quizes/'+req.params.quizId);
               }
            );
         }
      }
   ).catch( function(error) { next(error) } );
};

// exportar models

exports.models;

/*  Fin de: /quiz/controllers/comment_controller.js  */

