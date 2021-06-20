const express = require('express')
const bodyParser = require ('body-parser')
const app = express ()

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
     res.sendFile(__dirname + "/index.html");
})

//Watson
const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({ apikey: '<yCybSQ4I2WxlLrBqS1j0LD7j7nvHU-EFrzBqoC6NdGhk>' }),
  serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/dfb87479-8581-47c8-90bc-fa89c7543ee5'
});
const params = {
  text: 'Hello from IBM Watson',
  voice: "pt-BR_IsabelaVoice",
  accept: 'audio/wav'
};
textToSpeech
  .synthesize(params)
  .then(response => {
    const audio = response.result;
    return textToSpeech.repairWavHeaderStream(audio);
  })
  .then(repairedFile => {
    fs.writeFileSync('audio.wav', repairedFile);
    console.log('audio.wav written with a corrected wav header');
  })
  .catch(err => {
    console.log(err);
  });

  
app.listen(8000, () => {
    console.log(`Express started at http://localhost:8000`)
})






