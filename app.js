const express = require('express')
const app = express()
const port = 3000

const database = require('./database');
const users = require('./database');

//static pour avoir accès au data et urlencoded pour recuperer les post
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.get('/test', function (req, res) {
  res.send('Hello World!')
})

app.post('/api/login',function(req,res){
  let hasAuthenticatedUser = false;

  for (let i = 0; i < database.users.length; i++){
    const userToCheck = users[i];
    if (userToCheck.username == req.body.username && userToCheck.password == req.body.password){
      res.send("Authenticated !");
      hasAuthenticatedUser = true;
      break;
    }
  }

  if (hasAuthenticatedUser === false){
    res.send("Unauthenticated !");
  }
  
  console.log(req.body); //user.body.username affiche juste username

  if (req.body.uname === 'salmaS' && req.body.psw === 'sriji' ){
      res.send('You are logged in ! Password right')
  }
  else {
      res.send('Username or password wrong')
  }
})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})