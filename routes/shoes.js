const express = require('express');
const router = express.Router();
const Shoes = require('../models/shoes');
const multer = require('multer');
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
    const shoes = await Shoes.find().sort("name price description photo details");
    console.log(shoes);
    res.send(shoes);
});


router.get('/get1',async(req,res) => {
    const shoes = await Shoes.find({
        name: "SHOES1"
    }).sort("name price description photo details");
    console.log(shoes);
    res.send(shoes);
});

router.get('/get2',async(req,res) => {
    const shoes = await Shoes.find({
        name: "SHOES2"
    }).sort("name price description photo details");
    console.log(shoes);
    res.send(shoes);
});
router.get('/get3',async(req,res) => {
    const shoes = await Shoes.find({
        name: "SHOES3"
    }).sort("name price description photo details");
    console.log(shoes);
    res.send(shoes);
});
router.get('/get4',async(req,res) => {
    const shoes = await Shoes.find({
        name: "SHOES4"
    }).sort("name price description photo details");
    console.log(shoes);
    res.send(shoes);
});

router.get('/get5',async(req,res) => {
    const shoes = await Shoes.find({
        name: "SHOES5"
    }).sort("name price description photo details");
    console.log(shoes);
    res.send(shoes);
});
router.get('/get6',async(req,res) => {
    const shoes = await Shoes.find({
        name: "SHOES6"
    }).sort("name price description photo details");
    console.log(shoes);
    res.send(shoes);
});
router.get('/get7',async(req,res) => {
    const shoes = await Shoes.find({
        name: "SHOES7"
    }).sort("name price description photo details");
    console.log(shoes);
    res.send(shoes);
});

router.get('/get/:id',async(req,res) => {
    const shoes = await Shoes.findById(req.params.id);
    if(!shoes) return res.status(404).send('Not find this shoes')
    console.log(shoes);
    res.send(shoes);
});


router.post('/add', upload.single('photo'),async(req,res) => {
    console.log(req.file)

    let shoes = await new Shoes({
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        description: req.body.description,
        details: req.body.details,
        photo: req.file.path
    })

    if(!shoes) return status(400).send({
        message: "Error while saving, please try again"
    });

    await shoes.save();
    return res.send(shoes);
})

router.put('/edite/:id',upload.single('photo') ,async(req,res) => {

    let shoes = await Shoes.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        description: req.body.description,
        details: req.body.details,
        photo: req.file.path
    }, {new:true});
       if(!shoes) return res.status(400).send('Not find');


    await shoes.save();
    return res.send(shoes);
})


router.delete("/remove/:id", async(req,res) => {
    const shoes = await Shoes.findByIdAndRemove(req.params.id);
     console.log('the Delete succssful')
     return res.send(shoes);
})

module.exports = router;