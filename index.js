const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/routes/vehicles.router');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/api/vehicles', routes);

const server = app.listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});
