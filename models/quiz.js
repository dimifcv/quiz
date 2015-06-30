/* *************************************************************************** *
 * Programa....: /quiz/models/quiz.js                           
 * Descripción.: Describe el modelo o estructura de la tabla de la BD Quiz.
 * *************************************************************************** *
*/

module.exports = function( sequelize, DataTypes ) {
   return sequelize.define( 'Quiz',
                     {  pregunta:  DataTypes.STRING,
                        respuesta: DataTypes.STRING
                     });
}

/*  Fin de: /quiz/models/quiz.js  */

