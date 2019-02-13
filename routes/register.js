const express = require('express');
const router = express.Router();
const User = require('../models/register');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const path = require('path')
router.post('/register', async(req,res) => {
    let user = await User.findOne({email:req.body.email});
    
    if(user) return res.status(400).send('User already registered');

   
    user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    
   
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    return res.send(user);
})


router.post('/auth', async(req,res) => {
    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('User already registered');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    
    if(!validPassword) return res.status(400).send('this password not find');
    const ONE_WEEK = 6156642;
    const token = jwt.sign({user},process.env.SECRET, {expiresIn:ONE_WEEK});
    //let payload = { subject: user._id }
    //let token = jwt.sign(payload, 'secretKey')
    let returnUser = {
        name: user.name,    
        email: user.email,
        id: user._id,
        token
    }

    return res.send({
        success: true,
        message: 'You can login now',
        user: returnUser,
        token
    })
})

module.exports = router;