const router = require('express').Router()
let leaveRequest = require('../models/leave.model')

router.route('/').get((req,res) => {
    leaveRequest.find()
        .then(leaves => res.json(leaves))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req,res) => {
    const name = req.body.name
    const type_of_leave = req.body.type_of_leave
    const start = req.body.start
    const end = req.body.end
    const approved = req.body.approved
    const leave_reason = req.body.leave_reason
    const action_reason = req.body.action_reason

    const newLeave = new leaveRequest({
        name,
        type_of_leave,
        leave_reason,
        start,
        end,
        approved,
        action_reason
    })
     newLeave.save()
        .then(() => res.json('Leave Request added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/:id').get((req,res) => {
    leaveRequest.findById(req.params.id)
        .then((leave) => res.json(leave))
        .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/:name').get((req,res) => {
    leaveRequest.findById(req.params.name)
        .then((leave) => res.json(leave))
        .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/:id').delete((req,res) =>{
    leaveRequest.findByIdAndDelete(req.params.id)
        .then(() => res.json('Leave Request deleted!'))
        .catch(err => res.status(400).json("Error: " + err))
})
router.route('/update/:id').post((req,res) => {
    leaveRequest.findById(req.params.id)
        .then(leaveRequest => {
            leaveRequest.name = req.body.name
            leaveRequest.type_of_leave = req.body.type_of_leave
            leaveRequest.leave_reason = req.body.leave_reason
            leaveRequest.start = Date.parse(req.body.start)
            leaveRequest.end = Date.parse(req.body.end)
            leaveRequest.approved = req.body.approved
            leaveRequest.action_reason = req.body.action_reason
            leaveRequest.save()
            .then(() => res.json('Leave Request Updated!'))
            .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))        
})

module.exports = router 