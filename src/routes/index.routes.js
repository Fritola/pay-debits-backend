const express = require('express');
const router = express.Router()
const Bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.post('/login', async(request, response) => {
    let {email, password} = request.body
    const user = await User.findOne({ email })

    try{
        if(!user){
            return response.status(400).json({message: "Incorrect username or password"})
        }if(!Bcrypt.compareSync(password, user.password)){
            return response.status(400).json({message: "Password invalid"})
        }   
        
        let id = user._id            
        const token = jwt.sign({id}, '11f386cc34d87a16b1139c8ecc4f972d', {                
            expiresIn: '24h'
        })
        delete user.password

        return response.json({user, token})            

    } catch(err) {
        response.status(500).send(err)
    }
})

module.exports = router