DELIMITER //

CREATE FUNCTION estadisticaUso(idHabito INT)
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