CREATE TABLE `prospectos`.`prospecto` (
  `prospecto_id` INT NOT NULL AUTO_INCREMENT,
  `prospecto_nombre` VARCHAR(45) NOT NULL,
  `prospecto_appaterno` VARCHAR(45) NOT NULL,
  `prospecto_apmaterno` VARCHAR(45) NULL,
  `prospecto_calle` VARCHAR(45) NOT NULL,
  `prospecto_numero` VARCHAR(45) NOT NULL,
  `prospecto_colonia` VARCHAR(45) NOT NULL,
  `prospecto_cod_postal` INT NOT NULL,
  `prospecto_tel` VARCHAR(45) NOT NULL,
  `prospecto_RFC` VARCHAR(45) NOT NULL,
  `prospecto_estatus` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`prospecto_id`));