-- ==========================================
-- INSERTS PARA: Usuarios
-- ==========================================
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

-- ==========================================
-- INSERTS PARA: Alertas
-- ==========================================
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

-- ==========================================
-- INSERTS PARA: Habitos
-- ==========================================
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

-- ==========================================
-- INSERTS PARA: Progreso_Habitos
-- ==========================================
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

-- ==========================================
-- INSERTS PARA: Rutinas
-- ==========================================
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

-- ==========================================
-- INSERTS PARA: Rutina_Habito
-- ==========================================
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

-- ==========================================
-- INSERTS PARA: Tareas_Eventos
-- ==========================================
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

-- ==========================================
-- INSERTS PARA: Uso_Aplicaciones
-- ==========================================
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
