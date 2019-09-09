const express = require('express')
const db = require('../data/dbConfig.js');

const router = express.Router()

// will become json in the server.js
// router.use(express.json())

//WROTE EVERYTHING OUT FOR PRACTICE.
//## Note to future self. Practice JS by abstracting the id check into a function. Following Thee methods laid out previously.

router.get('/', (req, res) => {
    db('accounts')
    .select('name', 'budget')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({ error: 'oops somethings happened' })
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    db('accounts')
        .where({ id })
        .first()
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({ error: 'oops somethings happened' })
        })
});

router.post('/', (req, res) => {
    //if statements above in this to run before and not during  checking otherwise SQLite will grab it first
    const {name, budget} = req.body
    if(!name || !budget){
        return res.status(404).json({ error: 'Please enter a valid obj kay pattern. Name && Budget'})
    }
    db('accounts')
        .insert(req.body, 'id')          
            .then(([id]) => {
                
                db('accounts')
                    .where({ id })
                    .first()
                    
                    .then(accounts => {
                        res.status(200).json(accounts)
                    })
                    .catch(err =>{
                        console.log(err)
                        res.status(500).json({ error: 'oops somethings inside happened' })
                    })
            })
            .catch(err =>{
                console.log(err)
                res.status(500).json({ error: 'oops somethings happened' })
            })
});
// .update(accounts, 'id')
router.put('/:id', (req, res) => {
    const accountChange = req.body
    db('accounts')
        .where( 'id', req.params.id)       
        .update(accountChange)
        .then(count => {
            //returns a number of how many items updated
            res.status(200).json({ message: `updated ${count} account(s)`})
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({ error: 'oops somethings inside happened' })
        })        
});

//.where comes first to find whatchu need before running through the whole DB
//ORDER MATTERS 
router.delete('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            //returns a number of how many items deleted
            res.status(200).json({ message: `deleted ${count} account`})
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({ error: 'oops somethings happened' })
        })
});
module.exports = router