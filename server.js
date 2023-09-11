const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes')

const PORT = 3000;
const app = express();

app.use(bodyParser.json());


mongoose
.connect('mongodb://localhost:27017/user-module', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("connected to Database");
})
.catch((error) => {
    console.log(error);
})


//connect to MongoDB
mongoose.connect(MONGODB_URI,  {useNewUrlParser:true,})


//Routes
app.use("/api/users",userRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})