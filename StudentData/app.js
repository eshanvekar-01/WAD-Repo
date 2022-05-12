const express = require('express');
const bodyParser = require('body-parser');var app = express()
var port = 3000
const Student =require('./models')

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const dbConfig = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.render("index")
});

app.post("/addstudent", (req, res) => {
    var myData = new Student(req.body);
    myData.save()
    .then(item => {
    
    res.send("item saved to database");
    //res.redirect('/getStudents');
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    })
});


app.get('/getStudents',(req,res)=>{
    console.log(req.query)
    Student.find(req.query).
    then(student =>{
        console.log(student.length);
        res.render("table",{student:student,count:student.length})
    }).catch(err=>{
        res.json({ "message" : "err"})
    })
})



app.post('/deleteStudents/:id',(req,res)=>{
    Student.findByIdAndDelete(req.params.id).
    then(student=>{
        console.log("Deleted Successfully")
        res.redirect('/getStudents')
    })
})
app.post('/updateStudents/:id',(req,res)=>{
    currMarks = req.params.WadMarks;
    Student.findByIdAndUpdate(req.params.id,{$inc:{WadMarks:10}}).
    then(student=>{
        console.log("Updated Successfully")
        res.redirect('/getStudents')
    })
})
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
