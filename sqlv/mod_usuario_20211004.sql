ALTER TABLE `prospectos`.`acceso` 
ADD INDEX `accesos` (`acceso_rol` ASC, `acceso_api` ASC, `acceso_metodo` ASC) VISIBLE;
;
