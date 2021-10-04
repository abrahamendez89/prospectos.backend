'use strict';
module.exports = function (app) {
    require('./Controllers/Sistema/Usuario.controller').SetController(app);
    require('./Controllers/Comercial/prospecto.controller').SetController(app);
};
