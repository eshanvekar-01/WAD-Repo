const mongoose = require('mongoose');

const MusicSchema = mongoose.Schema({
	Songname: String,
	Film: String,
	Music_Director: String,
	singer: String,
	actor: String,
	actress: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Music', MusicSchema);

