/* *************************************************************************** *
 * Programa....: /quiz/controllers/session_controller.js
 * Descripción.: Añade funcionalidades a los callbacks de la session.
 * *************************************************************************** *
*/

// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next) {
   if (req.session.user) 
   {
      next();
   }
   else
   {
      res.redirect('/login');
   }
}

// GET /login  -- Formulario de login

exports.new = function(req, res) {
   var errors = req.session.errors || {};

   req.session.errors = {};
   res.render('sessions/new', {errors: errors} );
};

// POST /login   -- Crear sesión

exports.create = function(req, res) {
   var userController = require('./user_controller');

   var login      = req.body.login;
   var password   = req.body.password;
   
   userController.autenticar( login, password,
      function(error, user) {  
         if (error)              // Si hay error retornamos mensaje de error de sesión
         {
            req.session.errors = [{"message": 'Se ha producido un error: '+ error}];
            res.redirect("/login");
            return;
         }
         
         // Crear req.session.user y guardar campos id y username
         // La session de define por la existencia de: req.session.user
         req.session.user = {id: user.id, username: user.username};
         
         // Creamos el tiempo inicial de sesion:
         req.session.iniTimeSession = new Date().getTime();
         
         res.redirect(req.session.redir.toString());     // redireccion a path anterior
      } );
};

// DELETE /logout  -- Destruir la sesión

exports.destroy = function(req, res) {
   delete req.session.user;
   res.redirect(req.session.redir.toString() );   // redirecciona a path anterior a login. 
};

/*  Fin de: /quiz/controllers/session_controller.js  */

