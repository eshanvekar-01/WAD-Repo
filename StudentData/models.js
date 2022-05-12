const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    Name: String,
    RollNo: String ,
    WadMarks: Number,
    CCMarks: Number,
    DSBDAMarks: Number,
    CNSMarks: Number,

}, {
    timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);