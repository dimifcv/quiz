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
var methodOverride = require('method-override');
var session = require('express-session');

var router = require('./router/index');      // Importa el enrutador


var app = express();       // Crea la aplicación express. 

// view engine setup
// Instala generador de vistas EJS
app.set('views', path.join(__dirname, 'views'));      // path absoluto a views
app.set('view engine', 'ejs');                        // vistas con ejs

app.use(partials());       // ES una factoría de objetos. Para el marco de la aplicación. 

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded());
/*app.use(bodyParser.urlencoded({ extended: false }));*/

app.use(cookieParser('Quiz 2015'));    // Se añade la semilla: Quiz 2015
app.use(session());                 // Instala Middleware session

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


// MW de Autologout: Controlamos el timeout de sesión. Máximo 2 minutos de inactividad

app.use( function(req, res, next) {
      if (req.session.user) {
         // Hay sesion de usuario
         if ( (new Date().getTime() - req.session.iniTimeSession) > 120000 ) {
                  // Destruimos la sesión
            delete req.session.user;
            res.redirect('/login' );
         }
         else {
               // Sigue navegando. Volvemos a inicializar variable de tiempo de sesión.
               req.session.iniTimeSession = new Date().getTime();
         }
      }
      
      next();
});

// Helpers dinámicos
app.use( function(req, res, next) {
   // Guardar el path en session.redir para después del login
   if (!req.path.match(/\/login|\/logout/) )
   {
      req.session.redir = req.path;
   }
   
   // Hacer visible req.session en las vistas
   res.locals.session = req.session;
   next();
});

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

