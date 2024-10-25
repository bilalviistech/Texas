const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const connectDB = ()=>{
    // const connect =  mongoose.connect("mongodb://127.0.0.1:27017")
    const connect =  mongoose.connect(process.env.MONGODB_URI)
    const db = mongoose.connection

    db.on("error", err=>console.log(err))
    db.once("open",()=>console.log("DB Connected"))
}

module.exports = connectDB