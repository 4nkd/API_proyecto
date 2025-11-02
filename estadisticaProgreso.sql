//asi funcionarioa mas o menos
CREATE FUNCTION estadisticaProgreso(idHabito INT) RETURNS DECIMAL(3,2)
BEGIN
  DECLARE procentaje DECIMAL(3,2), total INT, total_cumplido INT;

  total = SELECT COUNT(*) FROM Progreso_Habitos PH WHERE PH.id_habito = idHabito;

  total_cumplido = SELECT COUNT(*) FROM Progreso_Habitos PH WHERE PH.id_habito = idHabito AND PH.completado = 1;

  procentaje = (total_cumplido/total)*100;

  RETURN procentaje;
END