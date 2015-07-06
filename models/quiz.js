/* *************************************************************************** *
 * Programa....: /quiz/models/quiz.js                           
 * Descripción.: Describe el modelo o estructura de la tabla de la BD Quiz.
 * *************************************************************************** *
*/

module.exports = function( sequelize, DataTypes ) {
   return sequelize.define( 'Quiz',
            {  pregunta: {
                  type: DataTypes.STRING,
                  validate: { notEmpty: {msg: "--> Falta pregunta"} }
               },
               respuesta: {
                  type: DataTypes.STRING,
                  validate: { notEmpty: {msg: "--> Falta respuesta"} }
               }
            }
        );
}

/*  Fin de: /quiz/models/quiz.js  */

