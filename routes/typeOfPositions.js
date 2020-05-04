const router = require('express').Router()
const positionType = require('../models/typeOfPositions.model')
const auth = require('../middleware/auth')

router.get('/',(req,res)=> {
    positionType.find()
        .then(positions => res.json(positions))
        .catch(err => res.status(400).json('msg: ' + err))
})
router.post('/add',auth,(req,res) => {
    const { position_type, position_color } = req.body
    const newPostions = new positionType({
        position_type,
        position_color 
    })
    newPostions.save()
    .then(positionType => res.json({
        newPositionType: positionType
    })
    )
    .catch(err => res.status(400).json('msg: ' + err))
})
router.delete('/delete/:id',auth,(req,res) => {
    positionType.findByIdAndDelete(req.params.id)
    .then(positionType => res.json({
        id : positionType._id
    }))
    .catch(err => res.status(400).json("msg: " + err))
})
module.exports = router 