'use strict';
module.exports = function (app) {
    require('./Controllers/Usuario.controller').SetController(app);
};
