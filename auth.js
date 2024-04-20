const config = require('./config')
const jwt = require('jsonwebtoken')

const generateToken = (user) => { // 토큰 생성 
    return jwt.sign({
        _id: user._id, // 사용자 정보 (json) 
        name: user.name, 
        email: user.email, 
        userId: user.userId, 
        isAdmin: user.isAdmin, 
        createdAt: user.createdAt, 
    },
    config.JWT_SECRET, // JWT 비밀키
    {
        expiresIn: '1d', // 만료기한 (하루)
        issuer: 'sunrise',
    } )
}

const isAuth = (req, res, next) => { // 권한 확인
    const bearerToken = req.headers.authorization 
    if(!bearerToken){
        res.status(401).json({message: 'Token is not supplied'})
    }else{
        const token = bearerToken.slice(7, bearerToken.length)
        jwt.verify(token, config.JWT_SECRET, (err, userInfo) => {
            if(err && err.name === 'TokenExpiredError'){
                return res.status(419).json({ code: 419, message: 'token expired!'})
            }else if(err){
                return res.status(401).json({ code: 401, message: 'Invalid Token!'})
            }
            req.user = userInfo
            next()
        })
    }
}
const isAdmin = (req, res, next) => { // 관리자 확인
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401).json({ code: 401, message: 'You are not valid admin user!'})
    }
}
module.exports = {
    generateToken, 
    isAuth, 
    isAdmin
}