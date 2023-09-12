const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes")

const PORT = 3000;
const app = express();


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userModule', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("connected to Database");
})
.catch((error) => {
    console.log(error);
})

//Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})













// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const userRoutes = require('./routes/userRoutes');


// const PORT = 3000;
// const app = express();


// // Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // mongoose
// // .connect('mongodb://localhost:27017/userModule', {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// // })
// // .then(() => {
// //     console.log("connected to Database");
// // })
// // .catch((error) => {
// //     console.log(error);
// // })


// mongoose.connect('mongodb://localhost/userModule', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });


// //Routes
// app.use("/api/users",userRoutes);


// app.listen(PORT, ()=>{
//     console.log(`Server is running on port ${PORT}`);
// })