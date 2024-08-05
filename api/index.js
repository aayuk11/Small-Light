// const express = require('express');

// const app = express();

// const port = 3000;

// const summarizeText = require('./summarize.js');

// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());

// app.use(express.static('public')); // Serve static files from the 'public' directory

// // Handle POST requests to the '/summarize' endpoint
// app.post('/summarize', (req, res) => {
//  // get the text_to_summarize property from the request body
//   const text = req.body.text_to_summarize;

//   // call your summarizeText function, passing in the text from the request
//   summarizeText(text)
//     .then(response => {
//       res.send(response); // Send the summary text as a response
//     })
//     .catch(error => {
//       console.log(error.message);
//     });
// });

// // Start the server
// app.listen(port, () => {
//   console.log('Server running at http://localhost:${port}/');
// });

//new gpt
const express = require('express');
const serverless = require('serverless-http');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/api/summary', async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/YOUR_MODEL',
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error generating summary:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error generating summary' });
  }
});

module.exports = app;
module.exports.handler = serverless(app);

