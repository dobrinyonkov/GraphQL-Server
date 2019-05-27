// External Dependancies
const boom = require('boom')

// Get Data Models
const Visit = require('./Visit')
const Place = require('../place/Place')

// Get all visits
exports.getVisits = async (req, reply) => {
	try {
		return await Visit.find()
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get all visits
exports.getVisitsByUser = async (req, reply) => {
	try {
		let user = req.params.id
		return await Visit.find({user}).populate('place')
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get all visits near
exports.getVisitsNear = async (req, reply) => {
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
					$maxDistance: req.query.range
				}
			},
			visits: { $exists: true, $not: {$size: 0} }
		}
		return await Place.find(query).populate({
			path: 'visits',
			populate: { path: 'place user' }
		})
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get single visit by ID
exports.getSingleVisit = async (req, reply) => {
	try {
		const id = req.params.id
		return await Visit.findById(id)
			.populate('user')
			.populate('place')
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Add a new visit
exports.addVisit = async (req, reply) => {
	try {
		const visit = new Visit(req.body)
		await Place.findByIdAndUpdate({_id: visit.place}, { $push: { visits: visit.id } }, { new: true } )
		return visit.save()
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Update an existing visit
exports.updateVisit = async (req, reply) => {
	try {
		const id = req.params.id
		const visit = req.body
		const {...updateData} = visit
		return await Visit.findByIdAndUpdate(id, updateData, {new: true})
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Delete a visit
exports.deleteVisit = async (req, reply) => {
	try {
		const id = req.params.id
		return await Visit.findByIdAndRemove(id)
	} catch (err) {
		throw boom.boomify(err)
	}
}
