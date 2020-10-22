const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		minlength: 2
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Author',
		required: true
	},
	published: {
		type: String
	},
	genres: [{type: String}]
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Book', schema)