// External Dependancies
const boom = require('boom')

// Get Data Models
const Place = require('./Place')

// Get all places
exports.getPlaces = async (req, reply) => {
	try {
		return await Place.find()
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get all places near
exports.getPlacesNear = async (req, reply) => {
	try {
		const coordinates = [
			parseFloat(req.query.latitude),
			parseFloat(req.query.longitude)
		]
		
		const query = {
			location: {
				$near: {
					$geometry: {
						type: "Point",
						coordinates
					},
					$maxDistance: 5000
				}
			}
		}
		return await Place.find(query)
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get single place by ID
exports.getSinglePlace = async (req, reply) => {
	try {
		const id = req.params.id
		return await Place.findById(id)
			.populate('visitors')
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Add a new place
exports.addPlace = async (req, reply) => {
	try {
		const place = new Place(req.body)
		return place.save()
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Add a new place
exports.addPlaceVisitor = async (req, reply) => {
	try {
		const id = req.body.place
		const visitor = req.body.visitor
		return await Place.findByIdAndUpdate({_id: id}, { $push: { visitors: visitor } }, { new: true } )
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Update an existing place
exports.updatePlace = async (req, reply) => {
	try {
		const id = req.params.id
		const place = req.body
		const {...updateData} = place
		return await Place.findByIdAndUpdate(id, updateData, {new: true})
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Delete a place
exports.deletePlace = async (req, reply) => {
	try {
		const id = req.params.id
		return await Place.findByIdAndRemove(id)
	} catch (err) {
		throw boom.boomify(err)
	}
}
