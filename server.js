const server = require('./server/src/app')();
const db = require('./server/config/db');

// create the basic server setup 
server.create(db);

if (process.env.ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
// start the server
server.start();