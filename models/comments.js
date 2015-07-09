/* *************************************************************************** *
 * Programa....: /quiz/models/comments.js                           
 * Descripción.: Describe el modelo o estructura de la tabla Comentarios.
 * *************************************************************************** *
*/

module.exports = function( sequelize, DataTypes ) {
   return sequelize.define( Comment',
            {  pregunta: {
                  type: DataTypes.STRING,
                  validate: { notEmpty: {msg: "--> Falta pregunta"} }
               },
               respuesta: {
                  type: DataTypes.STRING,
                  validate: { notEmpty: {msg: "--> Falta respuesta"} }
               },
               tematica: {
                  type: DataTypes.STRING,
                  validate: { notEmpty: {msg: "--> Falta temática"} }
               }
            }
        );
}

/*  Fin de: /quiz/models/comments.js  */

