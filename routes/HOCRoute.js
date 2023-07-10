const express = require('express');
const router = express.Router();

const HOCModel = require('../models/HOCModel');
const counters = require('../models/counters');

// get sequence
async function getNextSequence() {
    try{
        const doc = await counters.findOne({id:'HOCid'}).exec();
        const update = parseInt(doc.seq) + 1;
        const res = await counters.findOneAndUpdate({id:'HOCid'}, {seq:update}).exec();
        return update; 
    }
    catch(error){
        console.log(error);
        return(error);
    }
}

// submit new HOC
router.post('/newHOC', async (req, res) => {
    let createdDate = new Date();
    const newHOCid = await getNextSequence();
    console.log('newHOCid is ', newHOCid);
    const data = new HOCModel({
        creator: req.body.creator,
        finding: req.body.finding,
        action: req.body.action,
        HOCType: req.body.HOCType,
        CSLR: req.body.CSLR,
        DetailActivity: req.body.DetailActivity,
        createdDate: createdDate,
        jobType: req.body.jobType,
        HOCid: newHOCid
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
        console.log(`data is saved: ${dataToSave}`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// delete a HOC by id
router.get('/deleteHOC/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await HOCModel.findByIdAndRemove(id);
        res.send('deleted');
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// get all HOC that have same job type
router.get('/getHOCbyJob/', async (req, res) => {
    try {
        const jobType = req.query.job;
        // get all HOC that have same job type
        const result = await HOCModel.find({ jobType: jobType }).exec();
        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/getRandomHOC/', async (req, res) => {
    try {
        const jobType = req.query.job;
        // get all HOC that have same job type
        const result = await HOCModel.find({ jobType: jobType }).exec();

        // select random index from array of result
        const randomIndex = Math.floor(Math.random() * result.length);
        res.send(result[randomIndex]);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;