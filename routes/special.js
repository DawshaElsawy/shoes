const express = require('express');
const router = express.Router();
const Special = require('../models/Special');
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
    const special = await Special.find().sort("name price photo description details");
    console.log(special);
    res.send(special);
});
router.get('/getSpecial',async(req,res) => {
    const special = await Special.find({
        name:"Shoes1"
    }).select("photo");
    console.log(special);
    res.send(special);
});


router.get('/getImageSpecial',async(req,res) => {
    const special = await Special.find({
        name:"Shoes2"
    }).select("photo");
    console.log(special);
    res.send(special);
});


router.get('/getSilver',async(req,res) => {
    const special = await Special.find({
        name:"Silver"
    });
    console.log(special);
    res.send(special);
});



router.get('/get/:id',async(req,res) => {
    const special = await Special.findById(req.params.id);
    if(!special) return res.status(404).send('Not find this shoes')
    console.log(special);
    res.send(special);
});


router.post('/add', upload.single('photo'),async(req,res) => {
    console.log(req.file)

    let special = await new Special({
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        description: req.body.description,
        details: req.body.details,
        photo: req.file.path
    })

    if(!special) return status(400).send({
        message: "Error while saving, please try again"
    });

    await special.save();
    return res.send(special);
})

router.put('/edite/:id',upload.single('photo') ,async(req,res) => {

    let special = await Special.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        description: req.body.description,
        details: req.body.details,
        photo: req.file.path
    }, {new:true});
       if(!special) return res.status(400).send('Not find');


    await special.save();
    return res.send(special);
})


router.delete("/remove/:id", async(req,res) => {
    const special = await Special.findByIdAndRemove(req.params.id);
     console.log('the Delete succssful')
     return res.send(special);
})

module.exports = router;