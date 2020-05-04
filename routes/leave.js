const router = require('express').Router()
let leaveRequest = require('../models/leave.model')
const auth = require('../middleware/auth') 

router.get('/',auth,(req,res) => {
    leaveRequest.find()
        .then(leaves => res.json(leaves))
        .catch(err => res.status(400).json('msg: ' + err))
})
router.post('/add',auth,(req,res) => {
    const name = req.body.name
    const type_of_leave = req.body.type_of_leave
    const number_of_days = req.body.number_of_days
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const status = req.body.status
    const leave_reason = req.body.leave_reason
    const action_reason = req.body.action_reason

    const newLeave = new leaveRequest({
        name,
        type_of_leave,
        leave_reason,
        number_of_days,
        startDate,
        endDate,
        status,
        action_reason
    })
     newLeave.save()
        .then(() => res.json('Leave Request added!'))
        .catch(err => res.status(400).json('msg: ' + err))
})
router.get('/:id',auth,(req,res) => {
    leaveRequest.findById(req.params.id)
        .then(leave => res.json(leave))
        .catch(err => res.status(400).json('msg: ' + err))
})
router.delete('/:id',auth,(req,res) =>{
    leaveRequest.findByIdAndDelete(req.params.id)
        .then(() => res.json('Leave Request deleted!'))
        .catch(err => res.status(400).json("msg: " + err))
})
router.post('/update/:id',auth,(req,res) => {
    leaveRequest.findById(req.params.id)
        .then(leaveRequest => {
            leaveRequest.name = req.body.name
            leaveRequest.type_of_leave = req.body.type_of_leave
            leaveRequest.leave_reason = req.body.leave_reason
            leaveRequest.number_of_days = req.body.number_of_days
            leaveRequest.startDate = Date.parse(req.body.startDate)
            leaveRequest.endDate = Date.parse(req.body.endDate)
            leaveRequest.status = req.body.status
            leaveRequest.action_reason = req.body.action_reason
            leaveRequest.save()
            .then(() => res.json('Leave Request Updated!'))
            .catch(err => res.status(400).json('msg: ' + err))
        })
        .catch(err => res.status(400).json('msg: ' + err))        
})

module.exports = router 