CREATE TABLE `prospectos`.`documento` (
  `documento_id` INT NOT NULL AUTO_INCREMENT,
  `prospecto_id` INT NOT NULL,
  `documento_nombre_documento` VARCHAR(200) NOT NULL,
  `documento_data_base64` BLOB NOT NULL,
  PRIMARY KEY (`documento_id`),
  INDEX `fk_prospecto_idx` (`prospecto_id` ASC) VISIBLE,
  CONSTRAINT `fk_prospecto`
    FOREIGN KEY (`prospecto_id`)
    REFERENCES `prospectos`.`prospecto` (`prospecto_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
