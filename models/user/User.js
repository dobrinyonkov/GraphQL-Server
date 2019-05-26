const mongoose = require('mongoose')
const { user, point} = require('./config')

const pointSchema = new mongoose.Schema(point);

const userSchema = new mongoose.Schema({
	...user,
	location: pointSchema
})

module.exports = mongoose.model('User', userSchema)
