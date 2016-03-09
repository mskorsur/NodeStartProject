var mongoose = require('mongoose');

//setting up our data scheme for students
var studentSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    studentNumber: String,
    name : String,
    program : Number,
    courses : [String]
});

//mongoose.model will define collection students in the database
var studentModel = mongoose.model('Student', studentSchema);

module.exports = studentModel;