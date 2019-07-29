// Import our Controllers
const propertyController = require('./PropertyController')

const routes = [
	{
		method: 'GET',
		url: '/api/properties',
		handler: propertyController.getProperties
	},
	{
		method: 'GET',
		url: '/api/properties/:id',
		handler: propertyController.getSingleProperty
	},
	{
		method: 'POST',
		url: '/api/properties',
		handler: propertyController.addProperty,
		// schema: documentation.addPropertySchema
	},
	{
		method: 'POST',
		url: '/api/properties/login',
		handler: propertyController.login,
		// schema: documentation.addPropertySchema
	},
	{
		method: 'PUT',
		url: '/api/properties/:id',
		handler: propertyController.updateProperty
	},
	{
		method: 'DELETE',
		url: '/api/properties/:id',
		handler: propertyController.deleteProperty
	}
]

module.exports = routes
