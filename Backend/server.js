const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path')
const cors = require('cors');
const mongoose = require('mongoose');
const { isMainThread } = require('worker_threads');
const userRoutes = require('./routes/userRoute');

const app = express();
app.use(bodyParser.json());

const PORT = 1111;

const buildPath = path.join(__dirname, '/../frontend/build');
app.use(express.static(buildPath));

// MongoDB 연결
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
try {
    mongoose.connect(process.env.MONGO_DB_SECRET) 
    console.log('MongoDb 연결 완료')
} catch (error) {
    console.log(error)
}

app.use(userRoutes);

app.listen(PORT, function() {
    console.log(`Listening on http://localhost:${PORT}`);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

