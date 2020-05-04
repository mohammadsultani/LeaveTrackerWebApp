const mongoose = require('mongoose')
const Schema = mongoose.Schema

const typeOfLeavesSchema = new Schema({
    type_of_leave: {type: String, required: true ,unique: true},
    type_of_color: {type: String, required: true,unique: true },
    isCounted: {type: Boolean, required: true } // It determine the leave type to be Added from  
},{                                             // Number of taken leave days by user.     
    timestamps: true
}) 
const type_of_leaves = mongoose.model('type_of_leaves',typeOfLeavesSchema)

module.exports = type_of_leaves