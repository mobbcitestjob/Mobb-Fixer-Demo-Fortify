const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

const validUsername = 'admin';
const validPassword = 'password';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/login-not-set', (req, res) => {
  const { username, password } = req.body;

  if (username === validUsername && password === validPassword) {
    res.cookie('session', 'valid', { httpOnly: true, path: '/' });
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.post('/cookie-no-options', (req, res) => {
  const { username, password } = req.body;

  if (username === validUsername && password === validPassword) {
    res.cookie('session', 'valid');
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/chaineed-func', function(req, res){
  res.cookie('name', 'express').send('cookie set'); //Sets name = express
});


app.post('/login-insecure', (req, res) => {
  const { username, password } = req.body;

  if (username === validUsername && password === validPassword) {
    res.cookie('session', 'valid', { 
      secure: false,
      httpOnly: true, 
      path: '/' 
    });
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.post('/', (req, res) => {
  res.append('Set-Cookie', 'user=admin; Max-Age=900000;');  
  res.send('secure cookie not set');
});

app.post('/append', (req, res) => {
  res.append('Set-Cookie', 'user=admin; Max-Age=900000; HttpOnly; SameSite=Strict');
  res.send('secure cookie impliciity set to false');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
