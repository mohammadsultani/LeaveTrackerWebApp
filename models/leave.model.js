const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaveSchema = new Schema({
  name: { type: String, trim: true, required: true },
  type_of_leave: { type: String, required: true},
  leave_reason: { type: String, required: true },
  number_of_days: { type: Number, required:true },
  startDate: { type: Date, required: true},
  endDate: { type: Date, required: true },
  status:{ type: String, required: true },
  action_reason: { type:String , trim: true }
}, {
  timestamps: true,
});

const leaveRequest = mongoose.model('leaveRequest', leaveSchema);
module.exports = leaveRequest;