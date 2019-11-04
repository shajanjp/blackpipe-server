let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let PORT = process.env.PORT || 3000;
let HOSTNAME = process.env.HOSTNAME || `http://localhost:${PORT}`;
let sessionController = require('./controllers/session-controller.js');

app.set('view engine', 'ejs');

app.get('/view/:sessionId', sessionController.viewHandler);

app.param('sessionId', sessionController.validateSession);

io.on('connection', (client) => {
  console.log('client connected');

  client.on('PROCESS_OUT', (data) => {
    io.emit(data.sessionId, data);
  })

  client.on('disconnect', () => {
    console.log('disconnected');
  });
})

http.listen(PORT, () => {
  console.log(`Server started at: ${ HOSTNAME }`);
});
