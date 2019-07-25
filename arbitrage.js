import WebSocketAsPromised from 'websocket-as-promised';
const W3CWebSocket = require('websocket').w3cwebsocket;

const wsp = new WebSocketAsPromised(
    'wss://apifoxbitprodlb.alphapoint.com/WSGateway/',
    {
        createWebSocket: url => new W3CWebSocket(url)
    }
);

let resolveMap = new Map();

wsp.open().then(() => {
    console.log('[INFO]  Foxbit conectando...');

    wsp.onMessage.addListener(message => {
        console.log('[INFO]  Received response.', message);
        

        let response = JSON.parse(message);
        if (response.o == '{ "Authenticated":false }' || response.m == 5){
            Message.sendMessage('Error on Foxbit: ' + message, 'bots');
        }
        if (this.resolveMap.get(response.i)) {
            // console.log('resultado da request:', response.o);

            this.resolveMap.get(response.i)(response);
            this.resolveMap.delete(response.i);
        }
    });
    this.send(this.authFrame);
}).catch((err) => {
    console.log('[ERROR]', err)
    reject('Erro websocket');
});




// core do robo, procura operacoes a cada 500ms
setInterval(() => {
    findOps();
}, 500);