const WebSocket = require('ws');
const http = require('http');
const gameLogic = require('./gameLogic');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const players = [];
let gameStarted = false;

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'join') {
      const player = { id: players.length + 1, name: data.name, ws };
      players.push(player);
      broadcast({ type: 'update-lobby', players });
    } else if (data.type === 'start-game') {
      gameStarted = true;
      broadcast({ type: 'start-game' });
      gameLogic.startGame(players);
    }
  });
});

function broadcast(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});