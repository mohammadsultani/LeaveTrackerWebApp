const router = require('express').Router()
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt  = require('jsonwebtoken')
const auth = require('../middleware/auth')
 
// User Registration
router.post('/',(req,res) => {
 const { name, email, password, position , access_level, numof_leavedays_given, numof_leavedays_taken, isDeleted } = req.body
    if (!name || !email || !password || !position || !access_level || !isDeleted) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    } 
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User Already exists!'}) 
        const newUser = new User({
            name,
            email,
            password,
            position,
            access_level,
            numof_leavedays_given,
            numof_leavedays_taken,
            isDeleted
        })

        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(newUser.password,salt, (err, hash) => {
                if(err) throw err
                newUser.password = hash
                newUser.save()
                    .then(user => {
                        jwt.sign(
                            { id: user.id },
                           config.get('jwtSecret'),
                           { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err
                                res.json({
                                    token,
                                    userId: user.id,
                                    userName: user.name,
                                    userEmail: user.email,
                                    userPosition: user.position,
                                    accessLevel: user.access_level,
                                    numOfLeaveDaysGiven: user.numof_leavedays_given,
                                    numOfLeaveDaysTaken: user.numof_leavedays_taken,
                                    isDeleted: user.isDeleted
                                })
                            }
                        )
                    })
            })
        })
        
    })

})
// Fetching All Users
router.get('/',(req,res) => {
    User.find()
    .select('-password')
    .then(users => res.json(users))
    .catch(err => res.status(400).json('msg: ' + err))
})
// Get a User information
router.get('/:name',auth,(req,res) => {
    const name = req.params.name
    User.findOne({ name })
    .select('-password')
        .then(user => res.json(user.numof_leavedays_taken))
        .catch(err => res.status(400).json('msg: ' + err))
})
// Updating User Account
router.post('/updateAccount/:id',auth,(req,res) => {
    const {name, email,position } = req.body
    if (!name || !email || !position) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User Already exists!'}) 
    User.findById(req.params.id)
        .then(updatedUser => {
            updatedUser.name = name
            updatedUser.email = email
            updatedUser.password = updatedUser.password
            updatedUser.position = position
            updatedUser.access_level = updatedUser.access_level,
            updatedUser.numof_leavedays_given = updatedUser.numof_leavedays_given,
            updatedUser.numof_leavedays_taken = updatedUser.numof_leavedays_taken,
            updatedUser.isDeleted = updatedUser.isDeleted
        
            updatedUser.save()
            .then(() => res.json('User Account Updated'))
            .catch(err => res.status(400).json('msg: ' + err))   
        })
        .catch(err => res.status(400).json('msg: ' + err))   
    })
})

// Deleting A User
router.post('/delete/:id',auth,(req,res) => {
    const { isDeleted } = req.body
    User.findById(req.params.id)
        .then(deleteUser => {
            deleteUser.name = deleteUser.name
            deleteUser.email = deleteUser.email
            deleteUser.password = deleteUser.password
            deleteUser.position = deleteUser.position
            deleteUser.access_level = deleteUser.access_level
            deleteUser.numof_leavedays_given = deleteUser.numof_leavedays_given
            deleteUser.numof_leavedays_taken = deleteUser.numof_leavedays_taken
            deleteUser.isDeleted = isDeleted
            
            deleteUser.save()
            .then(() => res.json('User Deleted!'))
            .catch(err => res.status(400).json("msg: " + err))

        })
        .catch(err => res.status(400).json("msg: " + err))
})
//  Updating User Access Level && Number of Leave Days Given
router.post('/update/:id',auth, (req, res) => {
    const { access_level, numof_leavedays_given } = req.body
    User.findById(req.params.id)
    .then(updatedUser => {
        updatedUser.name = updatedUser.name
        updatedUser.email = updatedUser.email
        updatedUser.password = updatedUser.password
        updatedUser.position = updatedUser.position
        updatedUser.access_level = access_level
        updatedUser.numof_leavedays_given = numof_leavedays_given
        updatedUser.numof_leavedays_taken = updatedUser.numof_leavedays_taken
        updatedUser.isDeleted = updatedUser.isDeleted
        
        updatedUser.save()
        .then(() => res.json('User Updated'))
        .catch(err => res.status(400).json("msg: " + err))
    })
    .catch(err => res.status(400).json('msg: ' + err))
})
// Updating Number of taken after leave approval.
router.post('/leaveDaysTaken',auth,(req,res) => {
    const { name, numof_leavedays_taken } = req.body
    User.findOne({ name })
        .then(approvedUser => {
            approvedUser.name = name
            approvedUser.email = approvedUser.email
            approvedUser.password = approvedUser.password
            approvedUser.position = approvedUser.position
            approvedUser.access_level = approvedUser.access_level
            approvedUser.numof_leavedays_given = approvedUser.numof_leavedays_given
            approvedUser.numof_leavedays_taken = numof_leavedays_taken
            approvedUser.isDeleted = approvedUser.isDeleted
            
            approvedUser.save()
            .then(() => res.json('User Approved'))
            .catch(err => res.status(400).json('msg: ' + err))
        })
        .catch(err => res.status(400).json('msg: ' + err))
})

router.delete('/:id',(req,res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('user deleted'))
})
module.exports = router