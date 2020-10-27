const express = require('express');
const nodemailer = require('nodemailer')

const debits = express.Router()

const Debit = require('../models/Debit')

const User = require('../models/User')

debits.get('/:id', async(request, response) => {
    const {id} = request.params    
    console.log(id)
    try{
        const debits = await Debit.find({userID: id})    
        return response.json(debits)
    }catch(error){
        return response.status(400).json({error: "Some error"})
    }
        
})

debits.get('/total/:id', async(request, response) => {
    const {id} = request.params   
    const values = {toReceive: '', Received: '', total: '',} 
    let ToReceive = []
    let Received = []
    try{
        const debits = await Debit.find({userID: id})   
        debits.map(debit => {
            if(debit.status == true){                

                Received.push(debit.value)
                let receivedTotal = Received.reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                )

                values.Received = receivedTotal

            }else{
                ToReceive.push(debit.value)   
                let toReceiveTotal = ToReceive.reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                )
                values.toReceive = toReceiveTotal
                
            }
            
        })

        values.total = values.Received - values.toReceive        
        return response.json(values)
    }catch(error){
        return response.status(400).json({error: "Some error"})
    }
           
})

debits.post('/create/:id', async(request, response) => {
    const {id} = request.params    
    const user = await User.findById(id)
    const userID = user._id               
    try {
        let {value, name, type, parcel, who, status, debitEmail} = request.body
        console.log(debitEmail)        
        const debit = await Debit.create({
            userID,
            value,
            debitEmail,
            rest: value,
            name,
            type,
            parcel,
            restParcel: parcel,
            who,
            status
        })

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_LOGIN, 
              pass: process.env.EMAIL_PASSWORD            
            }
          });
          
          const mailOptions = {
            from: 'photoshopgm82@gmail.com',
            to: `${debitEmail}`,
            to: `photoshopgm82@gmail.com, ${debitEmail}`,
            subject: 'Pay-debits',
            text: `Olá ${who}, seu débito referente a ${name} no valor de R$${value} com ${user.name} foi registrado.`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

        return response.json(debit)
    } catch (error) {
        return response.status(400).json({error: error})
    }            
})

module.exports = debits