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
		chatRooms: {
			type: Array,
			required: false
		},
		locations: {
			type: Array,
			required: false
		},
		socketId: {
			type: String,
			required: false
		},
		role: {
			type: String,
			required: false, // TODO : make true
		},
		profile: {
			default: {
				firstName: {
					label: 'Firs Name',
					value: '',
					disabled: false
				},
				lastName: {
					label: 'Last Name',
					value: '',
					disabled: false
				},
				company: {
					label: 'Company',
					value: '',
					disabled: false
				},
				aboutMe: {
					label: 'About Me',
					value: '',
					disabled: false
				},
				phone: {
					label: 'Phone',
					value: '',
					disabled: false
				},
				country : {
					label: 'Country',
					value: '',
					disabled: false
				},
				city: {
					label: 'City',
					value: '',
					disabled: false
				},
			},
			type: Object,
			required: false
		},
	}
}
