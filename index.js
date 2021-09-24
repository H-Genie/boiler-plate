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

app.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) res.json({ success: false, err });
        res.status(200).json({ success: true, userInfo });
    });
});

app.post('/login', (req, res) => {
    // 요청된 정보가 DB에 있는지 찾음
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) res.json({ loginSuccess: false, message: '가입되어 있지 않습니다' });

        // DB에 있다면 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) res.json({ loginSuccess: false, message: '비밀번호가 일치하지 않습니다' })
        })

        // 비밀번호가 맞으면 토큰 생성
        user.generateToken((err, user) => {
            if (err) res.status(400).send(err);

            // 토큰을 쿠키에 저장
            res.cookie("auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userID: user._id })
        })
    })
})
// app.post('/login', (req, res) => {

//     //요청된 이메일을 데이터베이스에서 있는지 찾는다.
//     User.findOne({ email: req.body.email }, (err, user) => {

//         if (!user) res.json({ loginSuccess: false, message: "제공된 이메일에 해당하는 유저가 없습니다." })


//         //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
//         user.comparePassword(req.body.password, (err, isMatch) => {
//             if (!isMatch) res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

//             //비밀번호 까지 맞다면 토큰을 생성하기.
//             user.generateToken((err, user) => {
//                 if (err) res.status(400).send(err);

//                 res.cookie("auth", user.token)
//                     .status(200)
//                     .json({ loginSuccess: true, userId: user._id })
//             })
//         })
//     })
// })

// 포트 실행
const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));