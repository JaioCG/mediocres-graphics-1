// Twitch channel ID for ScottMadeThis.
// Replace with your own channel ID.
const channel = 97032862;

// Connect to the Heat back-end.
let url = `wss://heat-api.j38.net/channel/${channel}`;
let ws = new WebSocket(url);

// Connection successful. 
ws.addEventListener('open', () => {
    console.log(`Connection open to Heat API server, channel ${channel}.`);
});

// Message received.
ws.addEventListener('message', (message) => {
    // Parse message data.
    let data = JSON.parse(message.data);

    // Write to console.
    console.log(data);
});