const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Use JSON Server middlewares
app.use('/api', middlewares);
app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`JSON Server running on port ${PORT}`);
});
