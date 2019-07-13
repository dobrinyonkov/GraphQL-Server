// External Dependancies
const boom = require('boom')

// Get Data Models
const User = require('./User')

// Get all users
const getUsers = async (req, reply) => {
	try {
		return await User.find()
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get all users near
const getUsersNear = async (req, reply) => {
	try {
		const coordinates = [
			parseFloat(req.query.longitude),
			parseFloat(req.query.latitude)
		]
		
		console.error(req.query.userId);
		
		const query = {
			location: {
				$near: {
					$geometry: {
						type: "Point",
						coordinates
					},
					$maxDistance: parseInt(req.query.range)
				}
			},
			_id: { $ne: req.query.userId }
		}
		
		return await User.find(query).select({
			profile: 1,
			location: 1,
			_id: 1
		})
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get single user by ID
const getSingleUser = async (req, reply) => {
	try {
		const id = req.params.id
		return await User.findById(id)
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Add a new user
const addUser = async (req, reply) => {
	try {
		const user = new User(req.body)
		return user.save()
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Add a new user
const login = async (req, reply) => {
	try {
		const users = await User.find({email: req.body.email})
		const user = users[0]
		if (!user) {
			throw new boom('Authentication failed. User not found.', {statusCode: 404});
		} else {
			//check if password matches
			if (user.password === req.body.password) {
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
const updateUser = async (req, reply) => {
	try {
		const id = req.params.id
		const user = req.body
		const {...updateData} = user
		return await User.findByIdAndUpdate(id, updateData, {new: true})
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Delete a user
const deleteUser = async (req, reply) => {
	try {
		const id = req.params.id
		return await User.findByIdAndRemove(id)
	} catch (err) {
		throw boom.boomify(err)
	}
}

module.exports = {
	getUsers,
	getUsersNear,
	getSingleUser,
	addUser,
	login,
	updateUser,
	deleteUser,
}
