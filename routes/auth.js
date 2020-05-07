const router = require('express').Router()
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt  = require('jsonwebtoken')
const auth = require('../middleware/auth')
const nodemailer = require('nodemailer')
//Login validation
router.post('/',(req,res) => {
 const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    } 
    User.findOne({ email })
        .then(user => {
            if(!user) {
                res.status(400).json({ msg: 'User Does not exists!'}) 
            }else if (user.isDeleted) {
                res.status(400).json({ msg: 'User Does not exists!'}) 
            }

        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({ msg: "Invalid credential" })
                jwt.sign(
                    { id: user.id},
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err
                        res.json( {
                            token,
                            userId: user.id,
                            userName: user.name,
                            userEmail: user.email,
                            accessLevel: user.access_level,
                            userPosition: user.position,
                            numOfLeaveDaysGiven: user.numof_leavedays_given,
                            numOfLeaveDaysTaken: user.numof_leavedays_taken,
                            isDeleted: user.isDeleted
                        })
                    }
                )
            })
        
    })
  
})
// Loading User 
router.get('/user',auth,(req,res) => { // This endpoint check the token and if verified
    User.findById(req.user.id)  // User will be loaded with all information
    .select('-password')
        .then(user => {
            if(!user) {
                return res.status(404).json('User not found')
            }
            return res.json(
                {   
                    userId: user.id,
                    userName: user.name,
                    userEmail: user.email,
                    accessLevel: user.access_level,
                    userPosition: user.position,
                    numOfLeaveDaysGiven: user.numof_leavedays_given,
                    numOfLeaveDaysTaken: user.numof_leavedays_taken,
                    isDeleted: user.isDeleted
                }
            )
            
        })
})
// Sending Email For Reseting Password
router.post('/sendemail',(req,res) => {
    const { email } = req.body
    User.findOne({ email })
    .then(user => {
        if(!user){
            res.status(400).json({ msg: 'User Does Not exists!' }) 
        }else {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: "samsultani21@gmail.com", // generated ethereal user
                  pass: process.env.GMAIL_PASS // generated ethereal password
                },
                tls:
                    {
                    rejectUnauthorized:false
                    }
              });
              // Getting the Token
              const token = jwt.sign(
                { id: user.id},
                config.get('jwtSecret'),
                { expiresIn: 3600 })
              // send mail with defined transport object
              let mailOptions = {
                from: '"Resting Password" <samsultani21@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Password Reseting", // Subject line
                text: "Resting Password\n\n\nClick the link below to reset your password\n"+
                "http://localhost:3000/resetpass/"+token
              };
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
              console.log("Message sent: %s", info.messageId);
              console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
              res.json({
                  token,
                    email:user.email,
                    msg: "Email Sent"          
              })
            })
        } 
    })
        
})
// Reseting Password and Logging in 
router.post('/resetpass',auth,(req, res) => {
    const { email , password } = req.body
    User.findOne({ email })
    .then(updatedUser => {
        updatedUser.name = updatedUser.name
        updatedUser.email= email
        updatedUser.password = password
        updatedUser.position = updatedUser.position
        updatedUser.access_level = updatedUser.access_level
        updatedUser.numof_leavedays_given = updatedUser.numof_leavedays_given
        updatedUser.numof_leavedays_taken = updatedUser.numof_leavedays_taken
        updatedUser.isDeleted = updatedUser.isDeleted

        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(updatedUser.password,salt, (err, hash) => {
                if(err) throw err
                updatedUser.password = hash
                updatedUser.save()

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

module.exports = router