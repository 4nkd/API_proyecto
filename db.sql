-- =====================================================
-- Script de creación de tablas para MySQL
-- Base de datos: BienestarDigital (solo estructura)
-- =====================================================

-- Usa la base de datos correspondiente antes de ejecutar esto:
-- USE BienestarDigital;

-- ==========================================
-- Tabla: Usuarios
-- ==========================================
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contraseña_hash VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==========================================
-- Tabla: Alertas
-- ==========================================
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

-- ==========================================
-- Tabla: Habitos
-- ==========================================
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

-- ==========================================
-- Tabla: Progreso_Habitos
-- ==========================================
CREATE TABLE Progreso_Habitos (
    id_progreso INT AUTO_INCREMENT PRIMARY KEY,
    id_habito INT NOT NULL,
    fecha DATE NOT NULL,
    completado BOOLEAN DEFAULT 0,
    FOREIGN KEY (id_habito) REFERENCES Habitos(id_habito)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ==========================================
-- Tabla: Rutinas
-- ==========================================
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

-- ==========================================
-- Tabla: Rutina_Habito (tabla intermedia)
-- ==========================================
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

-- ==========================================
-- Tabla: Tareas_Eventos
-- ==========================================
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

-- ==========================================
-- Tabla: Uso_Aplicaciones
-- ==========================================
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

-- ==========================================
-- Fin del script
-- ==========================================
