const http = require('http');
const app = require('./app');
const server = http.createServer(app);

port = process.env.PORT ||2000;


server.listen(port, ()=>{
    console.log('server listening at port ' + port)
});