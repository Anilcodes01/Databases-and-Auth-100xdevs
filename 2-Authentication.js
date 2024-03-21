// Project for today --
// Let people sign up to your website, only allow signed in users to see people(create a dummy people list)

const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json())

const ALL_USERS = [
  {
    username: "user1@example.com",
    password: "password1",
    name: "John Doe",
  },
  {
    username: "user2@example.com",
    password: "password2",
    name: "Alice Smith",
  },
  {
    username: "user3@example.com",
    password: "password3",
    name: "Bob Johnson",
  },
  {
    username: "user4@example.com",
    password: "password4",
    name: "Emily Brown",
  },
  {
    username: "user5@example.com",
    password: "password5",
    name: "Michael Wilson",
  },
];

function userExists(username, password) {
  let userExists = false;
  for(let i = 0; i<ALL_USERS.length; i++) {
    if(ALL_USERS[i].username == username && ALL_USERS[i].password == password) {
        userExists = true
    }
  }
  return userExists
}

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if(!userExists(username, password)) {
    return res.status(403).json({
        msg: "User doesn't exist in our in memory db!",
    })
}
  var token = jwt.sign({username: username}, jwtPassword)
  return res.json({
    token
  })
});

app.get('/users', (req, res)=> {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    res.json({
        users: ALL_USERS
    })
})

app.listen(3000, (req, res) => {
    console.log('Server app listening on port 3000...')
})
