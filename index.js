const express = require('express');
const bodyParser = require('body-parser');
const {log}= require("./Database/LogRepository")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const repo= require("./Database/UserRepository");
const app = express();
const port = process.env.PORT || 3000;


// middleware to parse request bodies as JSON
app.use(bodyParser.json());

// middleware to authenticate requests using JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid authentication token' });
    }
    req.user = user;
    next();
  });
};

// register endpoint
app.post('/register', async (req, res) => {
  try {
    // check if user already exists
    const existingUser =await repo.getUserByEmail(req.body.email)
    if (existingUser) {
      return res.status(409).json({ message: 'User with email already exists' });
    }

    // create new user object and hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    await repo.createUser(req.body.phonenumber,req.body.email,hashedPassword,req.body.fullname)
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    await log(`${err} in register`)
    res.status(500).json({ message: 'Internal server error' });
  }
});

// login endpoint
app.post('/login', async (req, res) => {
  try {
    // find user by email
    const user = await repo.getUserByEmail(req.body.email)
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // check password
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // generate JWT token and send it as response
    const token = jwt.sign({ id: user.id }, 'secret_key');
    res.json({ token });
  } catch (err) {
    await log(`${err} in login`)
    res.status(500).json({ message: 'Internal server error' });

  }
});

// protected endpoint
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected API endpoint accessed successfully' });
});

// start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
