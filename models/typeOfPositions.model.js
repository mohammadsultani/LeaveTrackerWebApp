const mongoose = require('mongoose')
const Schema = mongoose.Schema

const positionTypesSchema = new Schema({
    position_type: { type: String, required: true, trim: true, unique: true },
    position_color: { type: String, required: true, trim: true }
},{
    timestamps: true
})
const positionType = mongoose.model('Position_Type', positionTypesSchema)
module.exports = positionType

