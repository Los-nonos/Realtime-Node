const express = require('express');
const app = express();

let server = require('http').Server(app);

app.use(express.static('../public'));

app.get('/hello', (_req, res) => {
    res.send('Hola');
})

server.listen(3000, () => {
    console.log('App listen has been in port 3000');
});