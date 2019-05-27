// Import our Controllers
const placeController = require('./PlaceController')

const routes = [
	{
		method: 'GET',
		url: '/api/places',
		handler: placeController.getPlaces
	},
	{
		method: 'GET',
		url: '/api/places/near',
		handler: placeController.getPlacesNear
	},
	{
		method: 'GET',
		url: '/api/places/:id',
		handler: placeController.getSinglePlace
	},
	{
		method: 'POST',
		url: '/api/places',
		handler: placeController.addPlace,
		// schema: documentation.addPlaceSchema
	},
	{
		method: 'PUT',
		url: '/api/places/addVisit',
		handler: placeController.addPlaceVisit
	},
	{
		method: 'PUT',
		url: '/api/places/:id',
		handler: placeController.updatePlace
	},
	{
		method: 'DELETE',
		url: '/api/places/:id',
		handler: placeController.deletePlace
	}
]

module.exports = routes
