const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'update-lobby') {
    updateLobby(data.players);
  } else if (data.type === 'start-game') {
    window.location.href = 'task.html';
  }
};

function updateLobby(players) {
  const playersList = document.getElementById('players-list');
  playersList.innerHTML = players.map(player => `<div>${player.name} (${player.id})</div>`).join('');
}

document.getElementById('start-game').addEventListener('click', () => {
  socket.send(JSON.stringify({ type: 'start-game' }));
});