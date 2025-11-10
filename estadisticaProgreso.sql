/*asi funcionarioa mas o menos, funciona desde el mysql, por alguna razon no funciona desde del driver de vscode ojo con ello*/
DELIMITER //

CREATE FUNCTION estadisticaProgreso(idHabito INT)
RETURNS DECIMAL(5,2)
DETERMINISTIC
BEGIN
  DECLARE porcentaje DECIMAL(5,2);
  DECLARE total INT DEFAULT 0;
  DECLARE total_cumplido INT DEFAULT 0;

  SELECT COUNT(*) INTO total
  FROM Progreso_Habitos PH
  WHERE PH.id_habito = idHabito;

  SELECT COUNT(*) INTO total_cumplido
  FROM Progreso_Habitos PH
  WHERE PH.id_habito = idHabito AND PH.completado = 1;

  IF total = 0 THEN
    SET porcentaje = 0;
  ELSE
    SET porcentaje = (total_cumplido / total) * 100;
  END IF;

  RETURN porcentaje;
END //

DELIMITER ;

/*
//Wea mal hecha ....

CREATE FUNCTION estadisticaProgreso(idHabito INT) RETURNS DECIMAL(3,2)
BEGIN
  DECLARE procentaje DECIMAL(3,2), total INT, total_cumplido INT;

  total = SELECT COUNT(*) FROM Progreso_Habitos PH WHERE PH.id_habito = idHabito;

  total_cumplido = SELECT COUNT(*) FROM Progreso_Habitos PH WHERE PH.id_habito = idHabito AND PH.completado = 1;

  procentaje = (total_cumplido/total)*100;

  RETURN procentaje;
END
*/