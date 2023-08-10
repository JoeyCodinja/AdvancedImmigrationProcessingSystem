import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';
import http from 'node:http';
import https from 'node:https';

//MODELS
import * as model from './db/model/models.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    next(err);
})

const AIPSCONNECT = mongoose.connect('mongodb://127.0.0.1:27017/AIPS')

app.get('/api/questions', (req, res) => {
    let allQuestions =  model.Question.find({}).exec().then((result) => {
        res.send(result);
    });
})

app.get('/api/questions/', (req, res, next) => {
    try {
        let question = model.Question.findOne({}).exec().then((result) => {
            res.send(result);
        });
    } catch (error) {
        next(error);
    }
})

app.post('/api/questions/new', (req, res) => {
    if (req.body){
        model.Question.create(req.body).then((result) => {
            res.status(201).send(result);
        });
    } else {
        res.status(400).send("Bad request");
    }
})

app.post('/api/questions/interview/:entrant_id', (req, res) => {
    const questionCount = 5
    model.Question.find({}).exec().then((result) => {
        let interviewQuestions = () => {
            let interviewArray = [];
            for (let count of Array(questionCount).keys()){
                interviewArray.push(result[Math.floor(Math.random() * questionCount)]);
            }
            return interviewArray;
        }
        res.send(interviewQuestions());
    });
})


app.get('/api/entrants', (req,res) => {
    let allEntrants = model.Entrant.find({}).exec().then((result) => {
        res.send(result);
    })
})

app.post('/api/entrants/find/', (req, res) => {
    let result;
    model.Entry.find({passport_number: req.body.passport_number}).sort({date_of_entry: -1}).exec().then( (history) => {
        model.Entrant.findOne({id: history[0].entrant_id}).exec().then((result) => {
            let responseBody = {
                "entrant": result,
                "history": history
            }
            res.send(responseBody);
        }).catch((error) => {
            console.log("Something went wrong");
            console.log(error);
            res.status(500).send()
        })
    }).catch((error) => {
        console.log("Something went wrong");
        console.log(error);
        res.status(500).send()
    });
})

app.get('/api/cases', (req, res, next) => {
    let allCases = model.Entry.find({}).exec().then((result) => {
        res.send(result);
    })
})

app.get('/api/categories', (req,res,next) => {
    let allCategories = model.Category.find({}).exec().then((result) => {
        res.send(result);
    })
})

app.get('/api/purposes-of-visit', (req,res) => {
    let allPurposesOfVisits = model.PurposeOfVisit.find({}).exec().then((result) => {
        res.send(result);
    })
})

app.get('/api/prompts', (req, res) => {
    let allPrompts = model.Prompt.find({}).exec().then((result) => {
        res.send(result);
    })
})

app.post('/api/prompt-chatgpt', (req, res, next) => {
    let openai_request_body = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "user",
                "content": req.body.content
            }
        ],
        "temperature": 0.7
    }
    let request_options = {
        host: 'api.openai.com',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
            'OpenAI-Organization': `${process.env.OPENAI_ORG_KEY}`,
            'Connection': 'keepalive'
        }
    }

    function process_response(response) {
        // TODO: Will have to parse the response as
        //  json for content type reasons at some point
        console.log("processing response");
        let str = '';
        let errstr = '';
        response.on('data', function(chunk) {
            str += chunk;
        });
        response.on('end', function() {
            res.send(JSON.parse(str));
        })
        response.on('error', function(error) {
            res.send(error);
        })
    }
    try {
        let chatGPTRequest = https.request(request_options, process_response);
        console.log("Request Body:\n", openai_request_body);
        chatGPTRequest.write(JSON.stringify(openai_request_body));
        chatGPTRequest.end();
    } catch (error) {
        next(error);
    }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});