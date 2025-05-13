const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

const options = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'weather.html'));
});

https.createServer(options, app).listen(3000, () => {
    console.log('Сервер работает на https://localhost:3000');
});
