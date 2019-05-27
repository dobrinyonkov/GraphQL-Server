// Import our Controllers
const visitController = require('./VisitController')

const routes = [
	{
		method: 'GET',
		url: '/api/visits',
		handler: visitController.getVisits
	},
	{
		method: 'GET',
		url: '/api/visits/near',
		handler: visitController.getVisitsNear
	},
	{
		method: 'GET',
		url: '/api/visits/user/:id',
		handler: visitController.getVisitsByUser
	},
	{
		method: 'GET',
		url: '/api/visits/:id',
		handler: visitController.getSingleVisit
	},
	{
		method: 'POST',
		url: '/api/visits',
		handler: visitController.addVisit,
		// schema: documentation.addVisitSchema
	},
	{
		method: 'PUT',
		url: '/api/visits/:id',
		handler: visitController.updateVisit
	},
	{
		method: 'DELETE',
		url: '/api/visits/:id',
		handler: visitController.deleteVisit
	}
]

module.exports = routes
