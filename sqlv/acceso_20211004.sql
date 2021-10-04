CREATE TABLE `prospectos`.`acceso` (
  `acceso_id` INT NOT NULL AUTO_INCREMENT,
  `acceso_rol` VARCHAR(45) NOT NULL,
  `acceso_api` VARCHAR(45) NOT NULL,
  `acceso_metodo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`acceso_id`));