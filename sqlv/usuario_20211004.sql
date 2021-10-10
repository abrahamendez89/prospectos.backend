CREATE TABLE `prospectos`.`usuario` (
  `usuario_id` INT NOT NULL AUTO_INCREMENT,
  `usuario_usuario` VARCHAR(45) NOT NULL,
  `usuario_contrasena` VARCHAR(45) NOT NULL,
  `usuario_rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`usuario_id`));
