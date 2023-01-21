const app = require('./controller/app');
const PORT = 3000;



// start server to listen for HTTP requests
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

