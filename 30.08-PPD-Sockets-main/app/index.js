const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const routes = require('./routes');

// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

// Configurar middlewares
require('./middleware')(app);

// Configurar rotas
app.use('/', routes);

// Configurar Socket.io para emitir notificações
io.on('connection', (socket) => {
  console.log('Cliente conectado');
  // Emitir notificação para o cliente conectado
  socket.emit('notificacao', 'Olá, você está conectado ao servidor de notificações!');
});

const port = process.env.PORT || 4555;
http.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
