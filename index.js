const listen = require('./controller/listener')

listen.get('/', (req, res) => {
    res.send("Hello world!");
});


