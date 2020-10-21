const mongoose = require('mongoose')

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


module.exports = mongoose.model('Book', schema)