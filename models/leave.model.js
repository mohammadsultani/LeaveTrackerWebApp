const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaveSchema = new Schema({
  name: { type: String, trim: true, required: true },
  type_of_leave: { type: String, required: true},
  leave_reason: { type: String, required: true },
  start: { type: Date, required: true},
  end: { type: Date, required: true },
  approved:{ type: String, required: true },
  action_reason: { type:String }
}, {
  timestamps: true,
});

const leaveRequest = mongoose.model('leaveRequest', leaveSchema);
module.exports = leaveRequest;