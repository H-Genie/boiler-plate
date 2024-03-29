const { User } = require('../models/User')

let auth = (req, res, next) => {
    // 클라이언트 쿠키에서 토큰을 가져옴
    let token = req.cookies.auth;

    // 토큰을 복호화 한 후 유저를 찾음
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) res.json({ isAuth: false, error: true });

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth }