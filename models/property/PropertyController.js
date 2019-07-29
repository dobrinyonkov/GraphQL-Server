// External Dependancies
const boom = require('boom')

// Get Data Models
const Property = require('./Property')

// Get all properties
const getProperties = async (args) => {
	try {
		return await Property.find()
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get single property by ID
const getSingleProperty = async (args) => {
	try {
		const id = args.id
		return await Property.findById(id)
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Add a new property
const addProperty = async (args) => {
	try {
		const property = new Property(args)
		return property.save()
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Add a new property
const login = async (args) => {
	try {
		const properties = await Property.find({email: args.email})
		const property = properties[0]
		if (!property) {
			throw new boom('Authentication failed. Property not found.', {statusCode: 404});
		} else {
			//check if password matches
			if (property.password === args.password) {
				return property
			} else {
				throw new boom('Authentication failed. Wrong password.', {statusCode: 400});
			}
		}
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Update an existing property
const updateProperty = async (args) => {
	try {
		const id = args.id
		const {...updateData} = args
		return await Property.findByIdAndUpdate(id, updateData, {new: true})
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Delete a property
const deleteProperty = async (args) => {
	try {
		const id = args.id
		return await Property.findByIdAndRemove(id)
	} catch (err) {
		throw boom.boomify(err)
	}
}

const getUserProperties = async (args) => {
	try {
		const data = await Property.find({publisher: args})
		console.log('data-----------', data);
		return data
	} catch (err) {
		throw boom.boomify(err)
	}
}

module.exports = {
	getProperties,
	getSingleProperty,
	addProperty,
	login,
	updateProperty,
	deleteProperty,
	getUserProperties,
}
