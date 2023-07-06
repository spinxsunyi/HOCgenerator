const express = require('express');
const router = express.Router();

const HOCModel = require('../models/HOCModel');

router.post('/newHOC', async(req,res) =>{
    let createdDate = new Date();
    const data = new HOCModel ({
        creator: req.body.creator,
        finding: req.body.finding,
        action: req.body.action,
        HOCType: req.body.HOCType,
        CSLR: req.body.CSLR,
        DetailActivity: req.body.DetailActivity,
        createdDate: createdDate
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
        console.log(`data is saved: ${dataToSave}`)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

module.exports = router;