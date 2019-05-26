// External Dependancies
const boom = require('boom')

// Get Data Models
const User = require('./User')

// Get all users
exports.getUsers = async (req, reply) => {
	try {
		return await User.find()
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get single user by ID
exports.getSingleUser = async (req, reply) => {
	try {
		const id = req.params.id
		return await User.findById(id)
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Add a new user
exports.addUser = async (req, reply) => {
	try {
		const user = new User(req.body)
		return user.save()
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Update an existing user
exports.updateUser = async (req, reply) => {
	try {
		const id = req.params.id
		const user = req.body
		const { ...updateData } = user
		return await User.findByIdAndUpdate(id, updateData, {new: true})
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Delete a user
exports.deleteUser = async (req, reply) => {
	try {
		const id = req.params.id
		return await User.findByIdAndRemove(id)
	} catch (err) {
		throw boom.boomify(err)
	}
}
