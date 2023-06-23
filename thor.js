const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

let dogFeedingSchedule = [];

// Endpoint para adicionar um horário de alimentação
app.post('/schedule', (req, res) => {
  //const { time, meal } = req.body;
  const time = req.body.time
  const meal = req.body.meal
  console.log("recebendo informaçao do frontend:")
  console.log(req.body)
  const feedingTime = {
    time,
    meal
  };
  dogFeedingSchedule.push(feedingTime);
  res.status(201).json({ message: 'Horário de alimentação adicionado com sucesso.' });
});

// Endpoint para obter o cronograma de alimentação
app.get('/schedule', (req, res) => {
  res.json(dogFeedingSchedule);
});

// Endpoint para remover um horário de alimentação
app.delete('/schedule/:time', (req, res) => {
  const time = req.params.time;
  dogFeedingSchedule = dogFeedingSchedule.filter(feedingTime => feedingTime.time !== time);
  res.json({ message: 'Horário de alimentação removido com sucesso.' });
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
