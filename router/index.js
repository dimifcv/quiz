/* *************************************************************************** *
 * Programa....: /quiz/router/index.js
 * Descripción.: Añade enrutadores para los controladores.
 * *************************************************************************** *
*/

var express = require('express');
var router = express.Router();      // Generamos el enrutador basico

var quizController         = require('../controllers/quiz_controller');
var commentController      = require('../controllers/comment_controller');
var sessionController      = require('../controllers/session_controller');
var statisticsController   = require('../controllers/statistics_controller');

/* Página de entrada: GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con: quizId
router.param('quizId',    quizController.load);       // Autoload :quizId
router.param('commentId', commentController.load);    //Autoload: commentId

/*
   Antes:
   router.get('/quizes/question',quizController.question);
   router.get('/quizes/answer',quizController.answer);
*/

// Definición de rutas de sesión
router.get('/login', sessionController.new);          // Formulario login
router.post('/login', sessionController.create);      // Crear sesión
router.get('/logout', sessionController.destroy);     // Destruir sesión



// Definición  de rutas de quizes
router.get('/quizes',                     quizController.index);
router.get('/quizes/:quizId(\\d+)',       quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);

// Definicion de rutas que tienen que ver con crear, modificar o borrar preguntas
router.get('/quizes/new',                 sessionController.loginRequired, quizController.new);
router.post('/quizes/create',             sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',  sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',       sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',    sessionController.loginRequired, quizController.destroy);

// Definición de ruta para la edición de registros de la BD
/*router.get('/quizes/:quizId(\\d+)/edit',  quizController.edit);
router.put('/quizes/:quizId(\\d+)',       quizController.update);
*/
// Definición ruta de borrado de registro.
/*router.delete('/quizes/:quizId(\\d+)',    quizController.destroy);
*/
// Definición ruta de Author
router.get('/author',                     quizController.author);

// Definición de ruta para la búsqueda
router.get('/quizes/busqueda',            quizController.busqueda);

// Definición de ruta para Entrada de datos
/*router.get('/quizes/new',                 quizController.new);
*/
// Definición de ruta para crear o salvar registros en la BD
/*router.post('/quizes/create',             quizController.create);
*/
// Definición de ruta para la tabla Comments
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',    commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', 
                                         sessionController.loginRequired, commentController.publish);

// GET /quizes/statistics  - Definicion de la ruta para Estadisticas
router.get('/quizes/statistics',         statisticsController.contador);

// Exportar las rutas
module.exports = router;

/*  Fin de: /quiz/router/index.js  */

