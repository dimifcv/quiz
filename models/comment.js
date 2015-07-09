/* *************************************************************************** *
 * Programa....: /quiz/models/comment.js                           
 * Descripción.: Describe el modelo o estructura de la tabla Comentarios.
 * *************************************************************************** *
*/

module.exports = function( sequelize, DataTypes ) {
   return sequelize.define( 'Comment',
            {  texto: {
                  type: DataTypes.STRING,
                  validate: { notEmpty: {msg: "--> Falta comentario"} }
               }
            }
        );
};

/*  Fin de: /quiz/models/comment.js  */

