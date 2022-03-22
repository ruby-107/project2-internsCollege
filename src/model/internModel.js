const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
 
const internSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true, trim:true},
    email: {type:String, required:true, unique:true, trim:true, match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    mobile: {type:String, unique:true, required:true, match:/^[6-9]\d{9}$/},
    collegeId : {type: ObjectId, ref:'College', required:true},
    isDeleted: {type: Boolean, default: false},

},{timestamps: true})

module.exports = mongoose.model('Interns',internSchema);