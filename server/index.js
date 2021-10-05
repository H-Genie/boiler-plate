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
app.get('/', (req, res) => res.send('Hello World!'));

const { User } = require('./models/User');

app.post('/signup', (req, res) => {
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, userInfo });
    });
});

app.post('/signin', (req, res) => {
    // 요청된 정보가 DB에 있는지 찾음
    User.findOne({ id: req.body.id }, (err, user) => {
        if (!user) return res.json({ loginSuccess: false, message: '가입되어 있지 않습니다' });

        // DB에 있다면 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: '비밀번호가 일치하지 않습니다' })
        })

        // 비밀번호가 맞으면 토큰 생성
        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);

            // 토큰을 쿠키에 저장
            res.cookie("auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userID: user._id })
        })
    })
})

const { auth } = require('./middleware/auth');
app.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        id: req.user.idy,
        role: req.user.role
    })
})

app.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id },
        { token: '' }
        , (err, user) => {
            if (err) return res.json({ success: false, err });
            res.status(200).send({ success: true })
        }
    )
})

// 포트 실행
const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));