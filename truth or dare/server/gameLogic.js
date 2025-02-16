const truths = [
  "What is your biggest fear?",
  "Have you ever cheated on a test?",
  // Add more truths
];

const dares = [
  "Do a silly dance for 1 minute.",
  "Sing a song in a funny voice.",
  // Add more dares
];

let currentPlayerIndex = -1;

function startGame(players) {
  if (players.length < 2) {
    console.log("Not enough players to start the game.");
    return;
  }
  nextTurn(players);
}

function nextTurn(players) {
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  const player = players[currentPlayerIndex];
  player.ws.send(JSON.stringify({ type: 'your-turn' }));
}

function getRandomTask(type) {
  const tasks = type === 'truth' ? truths : dares;
  return tasks[Math.floor(Math.random() * tasks.length)];
}

module.exports = { startGame, getRandomTask };