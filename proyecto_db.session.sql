/*---------------------------------- PRUEBAS CON SQL ------------------------------------------*/
/* START TRANSACTION; */
/* COMMIT; */
/* ROLLBACK; */


SELECT * FROM Uso_Aplicaciones WHERE id_usuario = 1;

/*DESCRIBE Uso_Aplicaciones;*/


/*DESCRIBE Usuarios*/

/*SELECT * FROM Progreso_Habitos*/

/*
SELECT * FROM Rutinas;
SELECT * FROM Habitos;
*/

/* SELECT * FROM tareas_eventos; */

/* UPDATE tareas_eventos SET
titulo = "VLHJ_edit", descripcion = "jr_edit", fecha_hora_inicio = "2025-10-19 10:00:00",
fecha_hora_fin = "2025-10-19 11:00:00", tipo = "AOINF" 
WHERE id_evento = 6; */


/* SELECT H.nombre, PH.fecha, PH.completado FROM progreso_habitos PH
INNER JOIN habitos H
ON PH.id_habito = H.id_habito
WHERE H.id_usuario = 7 */



/* SELECT * FROM habitos */
/* 
SELECT * FROM progreso_habitos;
 */

/* SELECT * FROM habitos WHERE id_usuario = 7;
SELECT * FROM rutinas WHERE id_usuario = 7; */

/* SELECT * FROM rutina_habito; */

/* ESTOY EN ESTO */
/* 
SELECT H.nombre, H.descripcion, H.frecuencia, H.hora_recordatorio, H.activo
FROM rutina_habito RH INNER JOIN habitos H 
WHERE RH.id_rutina = 8 AND RH.id_habito = H.id_habito;
 */

/* SELECT * FROM rutina_habito WHERE id_rutina = 8; */

/* INSERT INTO rutina_habito (id_rutina, id_habito) VALUES (8,1); */



/* SELECT * FROM rutinas
WHERE id_usuario = 7; */


/*
UPDATE habitos
SET nombre = "CN", descripcion = "JR", frecuencia = "Diario",
hora_recordatorio = "00:00:00"
WHERE id_habito = 8 AND id_usuario = 7
*/

/* 
SELECT id_habito, id_usuario, nombre, activo
FROM habitos
WHERE id_habito = 8 AND id_usuario = 7;
 */