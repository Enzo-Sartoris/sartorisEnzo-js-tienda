const express = require('express');
const server = express();
const cors = require('cors');

const routes = require ('./routes/index');

server.use(express.static('public'));
server.use(express.json());
server.use(cors()) 
server.use('/', routes);
//listener
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});