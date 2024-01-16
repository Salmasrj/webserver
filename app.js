const express = require('express')
const app = express()
const port = 3000

const database = require('./database.js');

//static pour avoir accès au data et urlencoded pour recuperer les post
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.get('/', function(req,res){
  res.redirect('/home');
})

app.get('/home', function(req,res){
  res.sendFile(__dirname + '/public/landing-page.html');
})

app.post('/api/login',function(req,res){
  let hasAuthenticatedUser = false;

  for (let i = 0; i < database.users.length; i++){
    const userToCheck = database.users[i];
    if (userToCheck.username == req.body.username && userToCheck.password == req.body.password){
      
      const sessionToken = userToCheck.username + '_' + Date.now();
      res.send(sessionToken);

      hasAuthenticatedUser = true;
      break;
    }
  }

  if (hasAuthenticatedUser === false){
    res.sendStatus(401); // ameliorer avec les web developpers tools sur Edge
    console.log("Unauthenticated !");
  }
  
  console.log(req.body); //user.body.username affiche juste username

  /*if (req.body.uname === 'salmaS' && req.body.psw === 'sriji' ){
      res.send('You are logged in ! Password right')
  }
  else {
      res.send('Username or password wrong')
  }*/
})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})