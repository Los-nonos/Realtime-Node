const express = require('express');
const index = express();

let server = require('http').Server(index);

index.use(express.static('public'));

index.get('/hello', (_req, res) => {
    res.send('Hola');
})

server.listen(3000, () => {
    console.log('App listen has been in port 3000');
});