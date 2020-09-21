const express = require('express');
const user = express.Router()
const Bcrypt = require('bcryptjs')
const User = require('../models/User')

user.get('/all', async (request, response) => {
    const users = await User.find({}, ['name', 'email'])               
    return response.json({users})
})

user.post('/', async(request, response) => {
    let {name, email, password} = request.body
    password = Bcrypt.hashSync(request.body.password, 10)        
    const userExist = await User.findOne({email})    
    if(!userExist){
        const user = await User.create({
            name,
            email,
            password
        })
        return response.json(user)
    }else{
        return response.status(400).json({error: "User already exists"})
    }
})

module.exports = user