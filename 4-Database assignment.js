const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
mongoose.connect(
    "mongodb+srv://anilcodes01:anilcodes01@cluster0.kbsq56y.mongodb.net/user_app_new"
  );
  

const app = express();
app.use(express.json())
app.use(cors())

// Middleware to allow CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

app.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser = await User.findOne({email: email})
    if(existingUser) {
        return res.status(400).send('User already exists!')
    }

    const user = new User({
        name: name,
        email: username,
        password: password
    })

    
user.save()
res.json({
    msg: 'User created successfully!'
})
})

app.listen(3000, (req, res) => {
    console.log('Server app listening on port 3000...')
})