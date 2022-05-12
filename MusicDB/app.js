const express = require('express');
const bodyParser = require('body-parser');
const { urlencoded, json } = require('body-parser');
const Music = require('./models')

var app = express();
var port = 3000;

app.set("view engine", "ejs");
app.use(urlencoded({extended: true}));
app.use(json());

const dbConfig = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
	console.log('Successfull connected to the database')
}).catch((err) => {
	console.log("Could not connect to the database");
	process.exit();
});

app.get('/', (req, res) => {
	res.render("index");
});

app.post("/addsong", (req, res) => {
	var myData = new Music(req.body);
	myData.save()
	.then(item => {
	res.send("item saved to database");
	})
	.catch(err => {
	res.status(400).send("unable to save to database");
	})
});

app.get("/getSongs", (req, res) => {
	console.log(req.query);
	Music.find(req.query).then((music) => {
		res.render("table", {music:music})
	}).catch(err => {
		console.log(err);
		res.json({"message" : err})
	})
});

app.get('/getTen', (req, res) => {
	Music.find(req.query).limit(5).then((music) => {
		res.render("table" ,{music: music})
	}).catch(err => {
		console.log(err);
		res.json({"message": err})
	})
})

app.get('/getDirectorSongs', (req, res) => {
	console.log(req.query);
	Music.find(req.query).then(dirmusic => {
		res.render("table", {music: dirmusic})
	}).catch(err => {
		console.log(err);
		res.json({"message": err})
	})
})

app.get('/getDirectorAndSingerSongs', (req, res) => {
	Music.find(req.query)
	.then((music) => {
		res.render("table", {music:music})
	}).catch(err => {
		res.json({"message": err})
	})
})

app.post('/updateActors/:id', (req, res) => {
	Music.findByIdAndUpdate(req.params.id, {actor: req.body.actor, actress: req.body.actress})
	.then(music => {
		console.log('Successfully Updated')
		res.redirect('/getSongs')
	}).catch(err => {
		res.json({"message": err})
	})
})

app.post("/deleteSongs/:id", (req, res) => {
	Music.findByIdAndDelete(req.params.id)
	.then(music => {
		console.log("Sucessfully Deleted")
		res.redirect("/getSongs")
	})
});

app.listen(3000, ()=>{
	console.log("Server listening to port 3000");
})