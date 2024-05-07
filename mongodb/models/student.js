const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
   
    marks: {
        type: Number,
        required: true,
        default: 0
    }
});

const student = mongoose.model("student ", studentSchema);

module.exports = student;
