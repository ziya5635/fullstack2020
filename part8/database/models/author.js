const mongoose = require('mongoose')


const schema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 4
	},
	bookCount: Number,
	born: {
		type: Number
	}
})

module.exports = mongoose.model('Author', schema)