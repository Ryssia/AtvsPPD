const express = require('express');
const router = express.Router();

// Rota principal para exibir a página HTML de notificações
router.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname + '/../' });
});

module.exports = router;
