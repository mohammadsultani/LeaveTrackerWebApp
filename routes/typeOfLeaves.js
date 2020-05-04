const router = require('express').Router()
const leaveTypes = require('../models/typeOfLeave.model')
const auth = require('../middleware/auth')

router.post('/add',auth,(req,res) => {
    const { type_of_leave , type_of_color, isCounted } = req.body

    const newTypes = new leaveTypes({
        type_of_leave,
        type_of_color,
        isCounted
    })
    newTypes.save()
    .then(leaveType => res.json({
        newLeaveType: leaveType
    }))
    .catch(err => res.status(400).json('msg: ' + err))    
})
router.get('/',auth,(req,res) => {
    leaveTypes.find()
        .then(types => res.json(types))
        .catch(err => res.status(400).json('msg: ' + err))
})
router.delete('/delete/:id',auth,(req,res) => {
    leaveTypes.findByIdAndDelete(req.params.id)
        .then(leaveType => res.json({
            id: leaveType._id
        }))
        .catch((err) => res.status(400).json('msg: ' + err))
})

module.exports = router 