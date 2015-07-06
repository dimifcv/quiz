/* *************************************************************************** *
 * Programa....: /quiz/router/index.js
 * Descripción.: Añade enrutadores para los controladores.
 * *************************************************************************** *
*/

var express = require('express');
var router = express.Router();      // Generamos el enrutador basico

var quizController = require('../controllers/quiz_controller');

/* Página de entrada: GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con: quizId
router.param('quizId', quizController.load);    // Autoload :quizId

/*
   Antes:
   router.get('/quizes/question',quizController.question);
   router.get('/quizes/answer',quizController.answer);
*/

// Definición  de rutas de quizes
router.get('/quizes',                     quizController.index);
router.get('/quizes/:quizId(\\d+)',       quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);

// Definición de ruta para la edición de registros de la BD
router.get('/quizes/:quizId(\\d+)/edit',  quizController.edit);
router.put('/quizes/:quizId(\\d+)',       quizController.update);

// Definición ruta de Author
router.get('/author',                     quizController.author);

// Definición de ruta para la búsqueda
router.get('/quizes/busqueda',            quizController.busqueda);

// Definición de ruta para Entrada de datos
router.get('/quizes/new',                 quizController.new);

// Definición de ruta para crear o salvar registros en la BD
router.post('/quizes/create',             quizController.create);

// Definición de ruta para la edición de registros de la BD


// Exportar las rutas
module.exports = router;

/*  Fin de: /quiz/router/index.js  */

