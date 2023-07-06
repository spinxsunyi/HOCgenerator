const express = require('express');
const router = express.Router();

const HOCModel = require('../models/HOCModel');

// submit new HOC
router.post('/newHOC', async(req,res) =>{
    let createdDate = new Date();
    const data = new HOCModel ({
        creator: req.body.creator,
        finding: req.body.finding,
        action: req.body.action,
        HOCType: req.body.HOCType,
        CSLR: req.body.CSLR,
        DetailActivity: req.body.DetailActivity,
        createdDate: createdDate,
        jobType: req.body.jobType
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

// delete a HOC by id
router.get('/deleteHOC/:id', async(req,res) =>{
    try{
        const id = req.params.id;
        const result = await HOCModel.findByIdAndRemove(id);
        res.send('deleted');
    }
    catch (error){
        res.status(400).json({message: error.message})
    }
})

// get all HOC that have same job type
router.get('/getHOCbyJob/', async(req, res) =>{
    try{
        const jobType = req.query.job;
        const result = await HOCModel.find({ jobType: jobType }).exec();
        res.send(result);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

module.exports = router;