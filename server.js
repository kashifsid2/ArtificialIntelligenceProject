const express = require('express');  
const cors = require('cors');  
const multer = require('multer');  
const pdfParse = require('pdf-parse');  
const { OpenAI } = require('openai');  
const fs = require('fs');
  
const app = express();  
const port = 3000;  
  
const upload = multer({ dest: 'uploads/' });  
const openai = new OpenAI({apiKey: 'API Hidden before uploading to Git'}); // replace with your OpenAI API key  
  
app.use(cors());  
  
app.post('/upload', upload.single('file'), async (req, res) => {  
  const dataBuffer = fs.readFileSync(req.file.path);  
  const data = await pdfParse(dataBuffer);  
  // The text of the PDF is in data.text  
  // You could store this in a database or in-memory data structure  
});  
  
app.get('/', async (req, res) => {  
  const message = req.query.message;  
  try {  
    // Use the text from the PDF as the prompt for the OpenAI API  
    const prompt = /* the text from the PDF */ + '\n' + message;  
    const gptResponse = await openai.completions.create({  
      model: 'text-davinci-002',  
      prompt: prompt,  
      max_tokens: 60  
    });  
    res.send(gptResponse.choices[0].text.trim());  
  } catch (error) {  
    console.error(error);  
    res.status(500).send('An error occurred while processing your request.');  
  }  
});  
  
app.listen(port, () => {  
  console.log(`Server listening at http://localhost:${port}`)  
});