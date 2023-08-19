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
    let allQuestions =  model.Question.find({interview_question: {$eq: true}}).exec().then((result) => {
        res.send(result);
    });
})
app.get('/api/questions/:question_id(\\d+)', (req, res) => {
    let allQuestions =  model.Question.findOne({id: {$eq: req.params['question_id']}}).exec().then((result) => {
        res.send(result);
    });
})

app.get('/api/questions/preeval', (req, res, next) => {
    let allQuestions =  model.Question.find({interview_question: {$eq: false}}).exec().then((result) => {
        res.send(result);
    });
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

app.put('/api/questions/:id(\\d+)', (req, res) => {
    let question_id = req.params['id']
    model.Question.findOneAndUpdate({id: {$eq: question_id}}, req.body, {new: true}).then((result) => {
        res.status(200).send(result);
    });

})

app.delete('/api/questions/:id(\\d+)', (req, res) => {
    let question_id = req.params['id']
    model.Question.deleteOne({id: {$eq: question_id}}).then((result) => {
        res.status(204).send();
    });

})

app.post('/api/questions/interview/:entrant_id', (req, res) => {
    const questionCount = 5
    let query = {interview_question: {$eq: true}}
    let generatedQuestions = req.body['generated_questions']
    if (Object.keys(req.body).includes('generated_questions')){
        query['id'] = {$nin: generatedQuestions}
    }
    model.Entry.find({entrant_id: {$eq: req.params.entrant_id }}).exec().then((entries) => {
        // Find latest entry
        entries.sort((entry_a, entry_b) => {
            if (entry_a.date_of_entry > entry_b.date_of_entry) {
                return -1
            } else if (entry_a.date_of_entry < entry_b.date_of_entry) {
                return 1
            } else {
                return 0
            }
        });

        let latestEntry = entries[0]
        console.log("latestEntry:", latestEntry);
        let categoriesSatisfied = latestEntry.categories_satisfied;
        query['category'] = {$nin: categoriesSatisfied}
        model.Question.find(query).exec().then((questions) => {
            let question_weights = questions.map((question) => {
                return {id: question.id, weight:question.weight}
            });
            console.log("Question Weights: ", JSON.stringify(question_weights));
            console.log("Communicating with ChatGPT");
            let openai_request_body = {
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "user",
                        "content": "Select from this list of numbers a combination that would add up to 70 but less than 100, " +
                        `using the numbers from this list of objects coming from the weight property, ${JSON.stringify(question_weights)}. Just provide the values and their corresponding ids in JSON Format which looks like the following [
    {"id": 7989777391, "weight": 19},
    {"id": 4294342853, "weight": 40},
    {"id": 1084144236, "weight": 30},
    {"id": 6955108218, "weight": 30}
  ]`
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
                    let chatGPTResponse = JSON.parse(str);
                    let chatCompletion = chatGPTResponse['choices'][0]['message']['content']
                    console.log("Chat Completion Log:", chatCompletion);
                    let JSONRegex = /"id":\s(\d*),\s*"weight":\s(\d*)/gm
                    let matchArray;
                    let resultObject = []
                    while((matchArray = JSONRegex.exec(chatCompletion)) !== null){
                        resultObject.push({'weight': matchArray[2], 'id':matchArray[1]})
                    }
                    let finalQuestionList = questions.filter((question) => {
                        let found = resultObject.find((chatGPTResult) => {
                            return chatGPTResult.id == question.id
                        });
                        if (found){
                            return true;
                        } else {
                            return false;
                        }
                    })
                    res.send(finalQuestionList);
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
        });
    })
})

app.post('/api/questions/interview/single/:entrant_id', (req, res) => {
    let query = {interview_question: {$eq: true}}
    let generatedQuestions = req.body['generated_questions']
    if (Object.keys(req.body).includes('generated_questions')){
        query['id'] = {$nin: generatedQuestions}
    }
    model.Entry.find({entrant_id: {$eq: req.params.entrant_id }}).exec().then((entries) => {
        // Find latest entry
        entries.sort((entry_a, entry_b) => {
            if (entry_a.date_of_entry > entry_b.date_of_entry) {
                return -1
            } else if (entry_a.date_of_entry < entry_b.date_of_entry) {
                return 1
            } else {
                return 0
            }
        });

        let latestEntry = entries[0]
        console.log("latestEntry:", latestEntry);
        let categoriesSatisfied = latestEntry.categories_satisfied;
        query['category'] = {$nin: categoriesSatisfied}
        model.Question.find(query).exec().then((questions) => {
            let question_weights = questions.map((question) => {
                return {id: question.id, weight:question.weight}
            });
            console.log("Question Weights: ", JSON.stringify(question_weights));
            console.log("Communicating with ChatGPT");
            let openai_request_body = {
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "user",
                        "content": "Select from this list of numbers a combination that would add up to 70 but less than 100, " +
                            `using the numbers from this list of objects coming from the weight property, ${JSON.stringify(question_weights)}. Just provide the values and their corresponding ids in JSON format which looks like the following [
    {"id": 7989777391, "weight": 19},
    {"id": 4294342853, "weight": 40},
    {"id": 1084144236, "weight": 30},
    {"id": 6955108218, "weight": 30}
  ]`
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
                    let chatGPTResponse = JSON.parse(str);
                    let chatCompletion = chatGPTResponse['choices'][0]['message']['content']
                    console.log("Chat Completion Response: ", chatCompletion)
                    let JSONRegex = /"id":\s(\d*),\s"weight":\s(\d*)/gm
                    let matchArray;
                    let resultObject = []
                    while((matchArray = JSONRegex.exec(chatCompletion)) !== null){
                        resultObject.push({'weight': matchArray[2], 'id':matchArray[1]})
                    }
                    let finalQuestionList = questions.filter((question) => {
                        let found = resultObject.find((chatGPTResult) => {
                            return chatGPTResult.id == question.id
                        });
                        if (found){
                            return true;
                        } else {
                            return false;
                        }
                    })
                    res.send(finalQuestionList[Math.floor(Math.random() * finalQuestionList.length)]);
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
        });
    })
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

app.get('/api/cases/for-review', (req, res, next) => {
    model.Entry.find({"status": {$not: {$exists: true}}}).exec().then((result) => {
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