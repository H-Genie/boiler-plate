// express
const express = require('express');
const app = express();

// mongoose
const mongoose = require('mongoose');
const config = require('./config/key')
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 라우터
app.get('/', (req, res) => res.send('Hello World!'));

const { User } = require('./models/User');
app.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) res.json({ success: false, err });
        res.status(200).json({ success: true, userInfo });
    });
});

// 포트 실행
const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));