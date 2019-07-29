// External Dependancies
const boom = require('boom')

// Get Data Models
const User = require('./User')

// Get all users
const getUsers = async (args) => {
	try {
		return await User.find()
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get single user by ID
const getSingleUser = async (args) => {
	try {
		const id = args.id
		return await User.findById(id)
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Add a new user
const addUser = async (args) => {
	try {
		const user = new User(args)
		return user.save()
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Add a new user
const login = async (args) => {
	try {
		const users = await User.find({email: args.email})
		const user = users[0]
		if (!user) {
			throw new boom('Authentication failed. User not found.', {statusCode: 404});
		} else {
			//check if password matches
			if (user.password === args.password) {
				return user
			} else {
				throw new boom('Authentication failed. Wrong password.', {statusCode: 400});
			}
		}
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Update an existing user
const updateUser = async (args) => {
	try {
		const id = args.id
		const {...updateData} = args
		return await User.findByIdAndUpdate(id, updateData, {new: true})
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Delete a user
const deleteUser = async (args) => {
	try {
		const id = args.id
		return await User.findByIdAndRemove(id)
	} catch (err) {
		throw boom.boomify(err)
	}
}

const getPropertyPublisher = async (args) => {
	try {
		const id = args.id
		return await User.findByIdAndRemove(id)
	} catch (err) {
		throw boom.boomify(err)
	}
}

module.exports = {
	getUsers,
	getSingleUser,
	addUser,
	login,
	updateUser,
	deleteUser,
}
