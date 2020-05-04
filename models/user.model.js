const mongoose = require('mongoose')

const Schema = mongoose.Schema
 
const userSchema = new Schema({
    name: { type: String , required: true,trim:true },
    email: { type: String, required: true,trim:true, unique: true },
    password: {type: String, required: true, trim:true },
    position: { type: String, required: true },
    access_level: { type: String, required: true },
    numof_leavedays_given:{ type: Number }, //  It is the total number of leave days allocated to a user in a year.
    numof_leavedays_taken: { type: Number }, // It is the number of days remain from allocated leave days in a year. 
    isDeleted: { type: Boolean, required:true }
},
    {
        timestamps: true
    })
const userAccounts = mongoose.model('UserAccounts',userSchema)
module.exports = userAccounts
