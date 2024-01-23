require('dotenv').config('../.env')

module.exports = {
    PORT: process.env.PORT ,
    dbURI: process.env.MONGODB_URI,
    JWTSecret: process.env.JWT_SECRET,
    bcryptSalt: process.env.BCRYPT_SALT,
}