ALTER TABLE `prospectos`.`prospecto` 
CHANGE COLUMN `prospecto_nombre` `prospecto_nombre` VARCHAR(50) NOT NULL ,
CHANGE COLUMN `prospecto_appaterno` `prospecto_appaterno` VARCHAR(50) NOT NULL ,
CHANGE COLUMN `prospecto_apmaterno` `prospecto_apmaterno` VARCHAR(50) NULL DEFAULT NULL ,
CHANGE COLUMN `prospecto_calle` `prospecto_calle` VARCHAR(100) NOT NULL ,
CHANGE COLUMN `prospecto_numero` `prospecto_numero` VARCHAR(10) NOT NULL ,
CHANGE COLUMN `prospecto_colonia` `prospecto_colonia` VARCHAR(50) NOT NULL ,
CHANGE COLUMN `prospecto_cod_postal` `prospecto_cod_postal` VARCHAR(5) NOT NULL ,
CHANGE COLUMN `prospecto_tel` `prospecto_tel` VARCHAR(10) NOT NULL ,
CHANGE COLUMN `prospecto_RFC` `prospecto_RFC` VARCHAR(13) NOT NULL ;