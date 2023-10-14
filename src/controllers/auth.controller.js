"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

//JWT => $ npm i jsonwebtoken

const Personnel = require('../models/personnel.model')
const jwt =require('jsonwebtoken')

module.exports ={

login: async (req, res)=>{
        // 1: 30dk => access token => username, firstname, lastname, profileurl, isAdmin, isLogin,  (30dk boyunca access sorulmayacak ve bu nedenle db ye giderek sistemi yormayacak, 30dk sonra refresh istenecek )
        // 2: 72sa => refresh token => IdleDeadline, password (Hayati bilgiler burada saklanmaz)
       

        const {username, password}=req.body
        if(username&password){
            const user = await Personnel.findOne({username, password})
            if(user){
                if(user.isActive){
                    const accessData = {
                        _id:user._id,
                        departmentId:user.departmentId,
                        firstName:user.firstName,
                        lastName:user.lastName,
                        isActive:user.isActive,
                        isLead:user.isLead
                    }

                    const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {expiresIn:'30m'})  // (Gonderilecek data, sifreleme icin key, kullanim omru)

                    const refreshData={
                        username:user.username,
                        password:user.password
                    }

                    const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, {expiresIn:'3d'}) // (Gonderilecek data, sifreleme icin key, kullanim omru)
                     
                    res.send({
                        error:false,
                        token:{
                            accessToken,
                            refreshToken
                    }
                    })

                }else{
                    res.errorStatusCode=401
                    // throw new Error= ('This account is not active.')
                }
            }else{
                res.errorStatusCode=401
                // throw new Error=('Wrong username or password.')
        }
        }else {
            res.errorStatusCode=401
            // throw new Error=('Please enter username and password.')
        }
    },

    refresh:(req, res)=>{

    },

    logout:(req, res)=>{
      res.send({
        error:false,
        message:'No need to logout. You must delete Bearer Token from your browser.'
      })
    }    
}