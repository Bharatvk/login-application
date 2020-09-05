var database = require('../config/database.js');
var mongojs = require('mongojs');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var userservice = {};
userservice.createUser = createUser;
userservice.authenticate = authenticate;
module.exports = userservice;

function createUser(params){
    console.log("params---p", params);
    return new Promise(function(resolve, reject) {
        try{
        database.users.findOne({email: params.email}, function(err, user){
            if(err){
                console.log("err", err)
            }
            if(user) {
                resolve({status: "failed", message: "User already exists."})
            } else {
                var userObj = {
                    name: params.name,
                    email: params.email,
                    password: params.password
                }
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(userObj.password, salt, (err, hash) => {
                        if (err) reject(err);
                        userObj.password = hash;
                        database.users.insert(userObj, function(err, createdUser){
                            delete createdUser.password;
                            resolve({status: "success", message: "User created Successfully.", user: createdUser})
                        })
                    })
                })
            }
        })
    } catch(Err){
        console.log("Errrr" ,Err);
    }
    })
}

function authenticate(params){
    return new Promise(function(resolve, reject) {
        // resolve({status: "success"})
    const email = params.email;
    const password = params.password;
    database.users.findOne({email: params.email},{name:1,email:1,password:1,_id:1}, function(err, user){
        if(err){
            console.log("err", err)
        }
        if(user) {
            console.log('pass',user.password);
            console.log('input',password);

            bcrypt.compare(password, user.password ,(err,hash)=> {
                 if (hash) {
                
                const payload = {
                    id: user._id,
                    name: user.name
                  };
                  jwt.sign(
                    payload,
                    config.jwtKey,
                    {
                      expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                    
                    if (params.foreverSign) {
                    expiry = "1";    
                    }
                    else{
                    expiry = "1"; 
                    }

                    database.users.update({_id:user._id},{$push:{session:{
                        token:token,
                        expiry:expiry
                    }} }, (err,res)=>{
                        if (err) {
                            console.log("err----",err)
                        }else{
                        resolve({
                            success: true,
                            message: "User authenticated succesfully",
                            token: "Bearer " + token
                          });
                        }
                    } )


                      
                    })
        }
    else{
        resolve({status: "failed", message: "Incorrect Password"})
    }
    
    })
        } else {
            resolve({status: "failed", message: "Email not found."})

        }
    })
})
}

