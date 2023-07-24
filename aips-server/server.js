import express from "express";
import mongoose from "mongoose";

//MODELS
import * as model from './db/model/models.js'

const app = express();
app.use(express.json());

const AIPSCONNECT = mongoose.connect('mongodb://127.0.0.1:27017/AIPS')

app.get('/api/questions', (req, res) => {
    let allQuestions =  model.Question.find({}).exec().then((result) => {
        res.send(result);
    });
})
app.post('/api/questions/new', (req, res) => {
    if (req.body){
        model.Question.create(req.body).then((result) => {
            res.send(result);
        });
    } else {
        res.status(400).send("Bad request");
    }
})

app.get('/api/entrants', (req,res) => {
    let allEntrants = model.Entrant.find({}).exec().then((result) => {
        res.send(result);
    })
})

app.get('/api/cases', (req, res) => {
    let allCases = model.Entry.find({}).exec().then((result) => {
        res.send(result);
    })
})

app.get('/api/purposes-of-visit', (req,res) => {
    let allPurposesOfVisits = model.PurposeOfVisit.find({}).exec().then((result) => {
        res.send(result);
    })
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});