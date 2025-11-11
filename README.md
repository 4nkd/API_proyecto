ya está subida la API y la base de datos, ya trabaja desde aqui:
https://api-proyecto-yvbd.onrender.com/api/login


--Update--
ya creé la tabla y la funcion que calcula el promedio, el ultimo routes devuelve dos valores, el promedio y el total, pero lo hace de forma estraña, estoy viendo como le arreglo


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



ejemplos de los inserts:

INSERT INTO Usuarios (nombre, email, contrasena_hash) VALUES
('Carlos Mendoza', 'carlos@example.com', 'hash123'),
('Laura Torres', 'laura@example.com', 'hash234'),
('José Ramírez', 'jose@example.com', 'hash345'),
('Ana López', 'ana@example.com', 'hash456'),
('María Pérez', 'maria@example.com', 'hash567'),
('Ricardo Gómez', 'ricardo@example.com', 'hash678'),
('Sandra Díaz', 'sandra@example.com', 'hash789'),
('Luis Fernández', 'luis@example.com', 'hash890'),
('Sofía Herrera', 'sofia@example.com', 'hash901'),
('Diego Castillo', 'diego@example.com', 'hash012');

INSERT INTO Alertas (id_usuario, tipo_alerta, mensaje) VALUES
(1, 'recordatorio', 'Hora de meditar 10 minutos'),
(2, 'motivacional', '¡Sigue así con tus hábitos!'),
(3, 'recordatorio', 'Bebe agua'),
(4, 'advertencia', 'Has estado inactivo por 2 horas'),
(5, 'recordatorio', 'Revisa tu progreso semanal'),
(6, 'motivacional', '¡Estás a punto de lograr tu meta!'),
(7, 'recordatorio', 'Hora de dormir'),
(8, 'advertencia', 'Demasiado uso de redes sociales'),
(9, 'recordatorio', 'Toma un descanso visual'),
(10, 'motivacional', 'Un pequeño paso cada día cuenta');

INSERT INTO Habitos (id_usuario, nombre, descripcion, frecuencia, hora_recordatorio) VALUES
(1, 'Ejercicio', 'Caminar 30 minutos diarios', 'diario', '07:00:00'),
(2, 'Lectura', 'Leer 20 páginas', 'diario', '21:00:00'),
(3, 'Agua', 'Beber 8 vasos de agua', 'diario', '10:00:00'),
(4, 'Meditación', 'Meditar 10 minutos', 'diario', '06:30:00'),
(5, 'Dormir bien', 'Dormir al menos 8 horas', 'diario', '22:00:00'),
(6, 'Diario personal', 'Escribir pensamientos del día', 'diario', '20:30:00'),
(7, 'Ejercicio', 'Correr 5 km', '3 veces por semana', '07:30:00'),
(8, 'Estudio', 'Estudiar programación 1 hora', 'diario', '19:00:00'),
(9, 'Organización', 'Planificar el día siguiente', 'diario', '22:30:00'),
(10, 'Gratitud', 'Anotar 3 cosas por las que estás agradecido', 'diario', '20:00:00');

INSERT INTO Progreso_Habitos (id_habito, fecha, completado) VALUES
(1, '2025-11-01', 1),
(1, '2025-11-02', 1),
(2, '2025-11-01', 0),
(3, '2025-11-01', 1),
(4, '2025-11-01', 1),
(5, '2025-11-01', 1),
(6, '2025-11-01', 0),
(7, '2025-11-01', 1),
(8, '2025-11-01', 1),
(9, '2025-11-01', 0);

INSERT INTO Rutinas (id_usuario, nombre, descripcion, fecha_inicio, fecha_fin) VALUES
(1, 'Mañanas Saludables', 'Rutina de inicio del día', '2025-11-01', '2025-12-01'),
(2, 'Lectura Nocturna', 'Rutina de lectura antes de dormir', '2025-11-01', NULL),
(3, 'Salud y Bienestar', 'Hábitos para mantener energía', '2025-10-15', NULL),
(4, 'Rutina de Concentración', 'Mejorar enfoque mental', '2025-11-05', NULL),
(5, 'Descanso y Relajación', 'Para mejorar el sueño', '2025-10-20', NULL),
(6, 'Desarrollo Personal', 'Diario, lectura y meditación', '2025-11-01', NULL),
(7, 'Fitness Total', 'Entrenamiento semanal', '2025-10-01', '2025-12-01'),
(8, 'Productividad', 'Rutina para mantener enfoque laboral', '2025-11-01', NULL),
(9, 'Organización Semanal', 'Revisión de metas', '2025-10-28', NULL),
(10, 'Rutina Positiva', 'Desarrollar hábitos mentales sanos', '2025-11-01', NULL);

INSERT INTO Rutina_Habito (id_rutina, id_habito) VALUES
(1, 1),
(1, 3),
(2, 2),
(3, 4),
(3, 5),
(4, 6),
(5, 5),
(6, 10),
(7, 7),
(8, 8);

INSERT INTO Tareas_Eventos (id_usuario, titulo, descripcion, fecha_hora_inicio, fecha_hora_fin, tipo) VALUES
(1, 'Reunión semanal', 'Planificación de metas', '2025-11-11 09:00:00', '2025-11-11 10:00:00', 'evento'),
(2, 'Leer libro', 'Terminar capítulo 4', '2025-11-10 21:00:00', NULL, 'tarea'),
(3, 'Hacer ejercicio', 'Correr 5 km', '2025-11-10 07:00:00', '2025-11-10 08:00:00', 'tarea'),
(4, 'Meditar', 'Sesión guiada', '2025-11-10 06:30:00', NULL, 'recordatorio'),
(5, 'Dormir temprano', 'Evitar pantallas antes de dormir', '2025-11-10 22:00:00', NULL, 'recordatorio'),
(6, 'Revisar metas', 'Evaluar progreso semanal', '2025-11-11 20:00:00', NULL, 'tarea'),
(7, 'Cita médica', 'Chequeo general', '2025-11-12 10:00:00', '2025-11-12 10:30:00', 'evento'),
(8, 'Estudiar Python', 'Repasar funciones y listas', '2025-11-10 19:00:00', '2025-11-10 20:00:00', 'tarea'),
(9, 'Planificar semana', 'Organizar tareas pendientes', '2025-11-10 21:00:00', NULL, 'recordatorio'),
(10, 'Tiempo de gratitud', 'Reflexionar sobre el día', '2025-11-10 20:00:00', NULL, 'recordatorio');

INSERT INTO Uso_Aplicaciones (id_usuario, nombre_app, fecha, minutos_uso) VALUES
(1, 'YouTube', '2025-11-09', 45),
(2, 'Instagram', '2025-11-09', 60),
(3, 'Spotify', '2025-11-09', 120),
(4, 'Twitter', '2025-11-09', 30),
(5, 'WhatsApp', '2025-11-09', 90),
(6, 'Google Calendar', '2025-11-09', 15),
(7, 'Facebook', '2025-11-09', 80),
(8, 'VS Code', '2025-11-09', 180),
(9, 'Notion', '2025-11-09', 45),
(10, 'TikTok', '2025-11-09', 70);




la funcion de estadistica progreso:

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