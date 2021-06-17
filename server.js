const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/build'));

app.listen(process.env.PORT || 9001);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
})
