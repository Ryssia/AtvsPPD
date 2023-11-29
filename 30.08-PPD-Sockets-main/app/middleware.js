const express = require('express');

module.exports = function (app) {
  // Configuração de middleware para servir arquivos estáticos
  app.use(express.static(__dirname + '/public'));
};
