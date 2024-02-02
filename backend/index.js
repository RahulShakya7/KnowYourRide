const express = require('express');
const mongoose = require('mongoose');
const newsroute = require('./routes/newsRoute');
const vehicleroute = require('./routes/vehicleRoute');
const userroute = require('./routes/userRoute');
const { verifyUser, verifyAdmin } = require('./middlewares/authMiddleware');
const connectDB = require('./db');
const cors = require('cors');
const { logAPICall } = require('./utils/logger');

require('dotenv').config()
const port = process.env.PORT

connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:3001', 
  }));
  
app.use(express.json());
app.use(logAPICall)

app.use(express.static('public'))

app.use('/users', userroute);
app.use('/vehicle',vehicleroute);
app.use('/news', newsroute);
app.use('/uploads/news', express.static('public/images/news'));
app.use('/uploads/vehicles', express.static('public/images/vehicles'));


app.use((err, req, res, next) => {
    console.error(err);
    if(err.name === 'ValidationError') {
        res.status(400)
        next();
    } else if (err.name == "CastError") {
        res.status(400)
        res.json({ error: err.message })
        next();
    }
})


app.use((req, res, next) => {
    res.status(404).json({error:"Path not found"})
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});


module.exports = app;