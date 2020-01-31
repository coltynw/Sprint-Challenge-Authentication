/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')
const secret= require('../secrets/secret')
module.exports = (req,res,next)=>{

  const token =req.headers.authorization;
  if(token){
    jwt.verify(token,secret.jwtSecret,(err,decodeToken)=>{
  if(err)
  { 
    res.status(400).json({message:'cant pass'})
  }
  else{
    req.user= {username:decodeToken.username}
    next()}
  })
  } else{
    res.status(400).json({message:'no token'})
  }
}