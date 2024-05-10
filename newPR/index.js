const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const jwtPassword ="123456";
const port = 3000;

app.use(express.json())

const USER_DATA =[{
  username:"ajey@somesome",
  password:"11223344"},
{
  username:"yashwant@outlook.com",
  password:"223311"},
{
  username:"Idek@atm",
  password:"SomeOMe12"
}]
const len= USER_DATA.length;

function userExist(username , password){
  let userExist = false;
  for(let i =0;i<len;i++){
    if(USER_DATA[i].username === username && USER_DATA[i].password === password){
      return true;
    }
  }
  userExist();
}

app.post("SignIn", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  if(!userExist(username,password)){
    res.status(411).send("Invalid Input")
  } else{
    var token = jwt.sign({password: password}, jwtPassword) 
    res.json({
      token,
    });
  } 
});

app.get("signIn", function(req, res){
  var token = req.headers.authorization;
  const decoded = jwt.verify(token, jwtPassword);
  const username = decoded.username;

  res.json({
    users: USER_DATA.filter(function(value){
      if(value.username === username){
        return false
      }
        else
      {
        return true;  
      }
      })
  })
});
app.listen(3000);
