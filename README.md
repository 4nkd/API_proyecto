ya está subida la API y la base de datos, ya trabaja desde aqui:
https://api-proyecto-yvbd.onrender.com/api/login


//coasas a aclara
1. todavia no agrego la funcion de estadistica a la base de datos
2. creo que tendré que agregar una tabla a la base de datos, pues me doy cuenta que no guarda un registro realmente para ello, pero ese registro es secundario
3. no se que mas


Aqui la base de datos por si la necesitas:

CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contrasena_hash VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE Alertas (
    id_alerta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo_alerta VARCHAR(50),
    mensaje VARCHAR(255),
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Habitos (
    id_habito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    frecuencia VARCHAR(50),
    hora_recordatorio TIME,
    activo BOOLEAN DEFAULT 1,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Progreso_Habitos (
    id_progreso INT AUTO_INCREMENT PRIMARY KEY,
    id_habito INT NOT NULL,
    fecha DATE NOT NULL,
    completado BOOLEAN DEFAULT 0,
    FOREIGN KEY (id_habito) REFERENCES Habitos(id_habito)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Rutinas (
    id_rutina INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Rutina_Habito (
    id_rutina INT NOT NULL,
    id_habito INT NOT NULL,
    PRIMARY KEY (id_rutina, id_habito),
    FOREIGN KEY (id_rutina) REFERENCES Rutinas(id_rutina)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_habito) REFERENCES Habitos(id_habito)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Tareas_Eventos (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    fecha_hora_inicio DATETIME NOT NULL,
    fecha_hora_fin DATETIME,
    tipo ENUM('recordatorio', 'evento', 'tarea'),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Uso_Aplicaciones (
    id_uso INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre_app VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL,
    minutos_uso INT CHECK (minutos_uso >= 0),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;



la funcion de estadistica progreso

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