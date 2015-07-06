/* *************************************************************************** *
 * Programa....: /quiz/app.js                           
 * Descripción.: Importa paquetes y middelwares.
 *               Lleva el tratamiento de errores.
 * *************************************************************************** *
*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var router = require('./router/index');      // Importa el enrutador


var app = express();       // Crea la aplicación express. 

// view engine setup
// Instala generador de vistas EJS
app.set('views', path.join(__dirname, 'views'));      // path absoluto a views
app.set('view engine', 'ejs');                        // vistas con ejs

app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded());
/*app.use(bodyParser.urlencoded({ extended: false }));*/

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});


module.exports = app;

/*  Fin de: /quiz/app.js  */

