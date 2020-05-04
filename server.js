const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')
const bodyParser = require("body-parser")


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true})
    
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully"); 
})

const leaveRouter = require('./routes/leave');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const leavesTypes = require('./routes/typeOfLeaves')
const positionTypes = require('./routes/typeOfPositions')
app.use('/leaveTypes',leavesTypes)
app.use('/leaves', leaveRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter)
app.use('/positions', positionTypes)

// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static('leaMohammadsultani44@gmail.cove-tracker/build'))

//     app.get('*', (req,res) => {
//         res.sendFile(path.resolve(__dirname,'leave-tracker','build','index.html'))
//     })
// }

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})