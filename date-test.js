const mongoose = require('mongoose')
const User = require('./src/models/User')
const Todo = require('./src/models/Todo')
const config = require('./config')

mongoose.connect(config.MONGODB_URL)
.then(() => console.log("mongodb connected ..."))
.catch(e => console.log(`failed to connect mongodb: ${e}`))

User.findOne({ email: 'ironman9@gmail.com' })
.then(user => {
    console.log(user)
    var d = new Date(user.lastModifiedAt)
    user.lastModifiedAt = new Date(d.setDate(d.getDate() + 7 )).getTime()
    console.log(user.lastModifiedAt)
    user.save()
    .then(result => console.log(result))
    .catch(e => console.log(e))
})
.catch(e => console.log(e))
