

import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai";


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors()); 

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY ||"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",
});
const openai = new OpenAIApi(configuration);


app.get('/', async(req, res) => {
  res.status(200).send({
    message: "Hello from learningByWrititng"
  })
});

app.post('/', async(req, res) => {
  try{
    const prompt = req.body.prompt;
    // const prompt = "capital of rwanda";
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    console.log(response.data.choices.text[0].text)
    res.status(200).send({
      bot: response.data.choices.text[0].text      
    })
  } catch(err){
    console.log(err);
    res.status(500).send({ errror: err})
  }  
});


app.listen(3000, () => {
  console.log('Server started on port http://localhost:3000');
});

