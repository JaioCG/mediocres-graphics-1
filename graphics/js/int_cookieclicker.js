// MediocresEvents Channel ID
const channel = 603499545;

// Connect to the Heat back-end
let url = `wss://heat-api.j38.net/channel/${channel}`;
let ws = new WebSocket(url);

// Connection successful.
ws.addEventListener('open', () => {
    console.log(`Connection open to Heat API server, channel ${channel}.`);
});

// Create cookie counter
const cookieCountText = document.getElementById('cookie-count');
let cookieCount = localStorage.getItem("02-cookie-score") || 0;
let cookieCountRep = nodecg.Replicant("cookie-count");

// Message received.
ws.addEventListener('message', (message) => {
    // Parse message data and log to console
    let data = JSON.parse(message.data);
    console.log(data);

    // Update cookie count if registered click is in the Cookie Zone(tm)
    if((data.x >= (50/1920) && data.x <= (350/1920)) && (data.y >= (730/1080) && data.y <= (1030/1080))) {
        document.getElementById("cookie-click-animation").style.animation = "cookie-click-in 0.1s";
        setTimeout(function() { document.getElementById("cookie-click-animation").style.animation = "cookie-click-out 0.1s"; }, 100);
        cookieCount++;
        cookieCountText.innerHTML = cookieCount;
        localStorage.setItem("02-cookie-score", cookieCount);
		cookieCountRep.value = cookieCount;
    }
});