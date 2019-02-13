const express = require('express');
const router = express.Router();
const Request = require('../models/requests');
const multer = require('multer');
const passport = require('passport');
const user = require('./register');
require('../config/passport')(passport) // as strategy in ./passport.js needs passport object

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + file.originalname)
    }
  })
   
  const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' ||file.mimetype === 'image/png') {
        cb(null, true)
    } else {

        cb(null, false)
    }
      
  }
  
  var upload = multer({ storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
},
fileFilter: fileFilter
})



router.get('/gets',async(req,res) => {
    const request = await Request.find().sort("name price description photo details");
    console.log(request);
    res.send(request);
});


router.get('/getUser', passport.authenticate('jwt', { session: false }),async(req,res) => {
    const request = await Request.find({
        user: req.user.id
    })
    console.log(request);
    res.send(request);
});
router.get('/get/:id', passport.authenticate('jwt', { session: false }),async(req,res) => {
    const request = await Request.findById(req.params.id);
    if(!request) return res.status(404).send('Not find this shoes')
    console.log(request);
    res.send(request);
});


router.post('/add', passport.authenticate('jwt', { session: false }), async(req,res) => {
    let request = await new Request({
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        address: req.body.address,
        user: req.user.id
    })

    //console.log(req.body)

    if(!request) return status(400).send({
        message: "Error while saving, please try again"
    });

    await request.save();
    return res.send(request);
})

router.put('/edite/:id', passport.authenticate('jwt', { session: false }), upload.single('photo'),async(req,res) => {

    let request = await Request.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        address: req.body.address
    }, {new:true});
       if(!request) return res.status(400).send('Not find');


    await request.save();
    return res.send(request);
})


router.delete("/remove/:id", async(req,res) => {
    const request = await Request.findByIdAndRemove(req.params.id);
     console.log('the Delete succssful')
     return res.send(request);
})

module.exports = router;