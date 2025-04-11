const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./Routes/User");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./Middlewares/Passport"); // Your Passport config
const path=require('path');
const PORT = process.env.PORT || 3000;
const noteRoutes=require('./Routes/Books');
const cookieParser=require('cookie-parser')
const cookie = require("express-session/session/cookie");
const dept=require('./Routes/Department')
const university=require('./Routes/University')
const news=require('./Routes/News')

app.use(
  session({
    secret: process.env.SESSION_SECRET || "jagdish",
    resave: false,
    saveUninitialized: false, // Prevents setting empty sessions
    cookie: { 
      httpOnly: true, 
      secure: false, // Set `true` in production with HTTPS
      sameSite: "lax", // Allows cross-origin requests 
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);




app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Required to send cookies
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(express.json()); // ✅ For handling JSON data
app.use(express.urlencoded({ extended: true })); // ✅ For URL-encoded data
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "jagdish",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      httpOnly: true, 
      secure: false, // Set `true` in production with HTTPS
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Use your router for authentication and user-related routes
app.use("/user", router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', noteRoutes);
app.use('/dept',dept)
app.use('/uni',university)
app.use('/newsLetter',news)
// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/notes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Not connected to database", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});