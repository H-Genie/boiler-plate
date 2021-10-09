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

// cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// 라우터
app.use('/', require('./routes/routes'));

// 포트 실행
const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));