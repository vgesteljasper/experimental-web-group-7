# Virtual Lanes — Multiplayer WebVR Bowling Game

School group assignment for Experimental Web

- Francis De Clercq [FrencisAlreadyInUse](https://github.com/FrencisAlreadyInUse)
- Jasper Van Gestel [vgesteljasper](https://github.com/vgesteljasper)

## Play It

[https://virtual-lanes.herokuapp.com](https://virtual-lanes.herokuapp.com)

## Installation

Download

```Bash
git clone https://github.com/vgesteljasper/experimental-web-group-7.git
cd ./experimental-web-group-7
yarn install
```

Generate ssl certs for https to work locally

```Bash
chmod a+x ./server/config/generate-ssl-certs.sh
./server/config/generate-ssl-certs.sh
```

Fill in the .env file

```Bash
mv ./.env-example ./.env
vim ./.env
```

```Bash
HOST= 0.0.0.0 (will connect to your IP — makes it possible to connect with your phone)
PORT= 3000
```

## Run

Development

```Bash
# development
yarn development
```

Production

```Bash
# make production build
yarn production

# serve production build
yarn serve
```

## How It Works

The `Hapi.js` server is able to send messages via `WebSockets`.
When a user creates a room, it gets created in the server.
Friends can use that group name to join it and setup `WebRTC` connections
with the rest of the users in the group.
All users will be connected via `WebRTC` with eachother forming a communication mesh.

During setup, all messages are sent and received via `WebSockets`. Connecting and creating rooms and uploading a username
for example all send the data to the server where it gets dispatched to the rest of the connected users in the room.

Game updates like throwing the bowling ball and going to the next person is handled by the comminucation mesh, constantly informing all other users of new data, new coordinates,...

The DataChannel class (`src/js/classes/DataChannel`) is responsible for setting up this `WebRTC` mesh.
It sends and receives `WebSocket` messages to and frow to the server containing all the necessary objects needed to set up a
`WebRTCPeerConnection` and `WebRTCDataChannel` and dispatches events so other scripts can know what is happening as well.

Data excange between scripts is made possible by dispatching and listening to custom events, and by using `mobx`.

Both the `React.js` UI (`src/js/components.App.jsx`) that handles the creating and joining of rooms, and the Game class (`src/js/classes/Game.js`)
that handles all the game logic have access to the DataChannel class to
listen to events and trigger actions in the mesh.

When the client receives a message from the server that all users in the room are ready, the `React.js` UI will be removed
from the screen to be able to play the game written on top of `A-Frame.js` and `Three.js`
