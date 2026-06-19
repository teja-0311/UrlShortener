const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const urlRoutes = require("./routes/urlRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const cookieParser = require("cookie-parser");

//rate limiting
const limiter = require("express-rate-limit");
const rate = limiter({
     windowMs:10*60*100,
    max:100
})
const app=express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(rate);
mongoose.connect(process.env.MONGO_URI).then(()=> {

}).catch((err)=>{
    console.error("Failed to connect to MongoDB",err);
});

app.use("/api/urls",urlRoutes);
app.use("/api/users",userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});