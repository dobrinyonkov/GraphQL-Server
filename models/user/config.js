module.exports = {
	
	point: {
		type: {
			type: String,
			enum: ['Point'],
			required: true
		},
		coordinates: {
			type: [Number],
			index: '2dsphere',
			required: true
		}
	},
	
	user: {
		email: {
			type: String,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		locations: {
			type: Array,
			required: false
		},
		role: {
			type: String,
			required: false, // TODO : make true
		},
		image: {
			type: String,
			required: false, // TODO : make true
		},
		profile: {
			default: {
				firstName: '',
				lastName: '',
				company: '',
				aboutMe: '',
				phone: '',
				country: '',
				city: '',
			},
			type: Object,
			required: false
		},
	},
}
