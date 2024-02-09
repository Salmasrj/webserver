const express = require('express')
const app = express()
const port = 3000

const database = require('./database.js');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));


app.get('/', function(req,res){
  res.redirect('/home');
})

app.get('/home', function(req,res){
  res.sendFile(__dirname +'/public/landing-page.html');
})

app.get('/dashboard', function(req,res){
  if (req.cookies.sessionToken !== undefined){   
    res.sendFile(__dirname + '/public/dashboard.html');
    return;
  }
  else{ 
    res.redirect('/login.html');
    return;
  }
})

app.get('/api/:username/city', function(req,res){
  let hasAuthenticatedUser = false;
  for (let i = 0; i < database.users.length; i++){
    const userToCheck = database.users[i];
    if (userToCheck.username == req.params.username){
      res.send(userToCheck.city);
      hasAuthenticatedUser = true;
      break;
    }
  }
  if (hasAuthenticatedUser === false){
    res.sendStatus(404);
  }
})

app.get('/api/:username/profile-picture-path', function(req, res) {
  let hasAuthenticatedUser = false;
  for (let i = 0; i < database.users.length; i++) {
    const userToCheck = database.users[i];
    if (userToCheck.username == req.params.username) {
      res.send(userToCheck.profilePicturePath); 
      hasAuthenticatedUser = true;
      break;
    }
  }
  if (hasAuthenticatedUser === false) {
    res.sendStatus(404);
  }
});


app.post('/api/login',function(req,res){
  let hasAuthenticatedUser = false;
  for (let i = 0; i < database.users.length; i++){
    const userToCheck = database.users[i];
    if (userToCheck.username == req.body.username && userToCheck.password == req.body.password){
      const sessionToken = userToCheck.username + '_' + Date.now();
      res.send(sessionToken);
      hasAuthenticatedUser = true;
      console.log("Authenticated !");
      break;
    }
  }
  if (hasAuthenticatedUser === false){
    res.sendStatus(401); 
    console.log("Unauthenticated !");
  }
})


app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})