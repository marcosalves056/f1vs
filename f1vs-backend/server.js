const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pilotRoutes = require('./routes/pilots.routes');
const Tracks = require('./models/tracks.models');

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb+srv://marcos:ma727905@f1vs-database.id7dvol.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
mongoose.connection.once('open', () => {
  console.log('Conectado ao banco de dados MongoDB');
});



// Configurar o servidor Express
const app = express();

// Configuração do CORS
app.use(cors());

app.use(express.json());

app.get('/tracks/', async (req, res) => {
  try {
    const votos = await Tracks.find();
    res.json(votos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter os votos.' });
  }
});

app.post('/tracks/vote/', async (req, res) => {
  try {
    // if(!req.body.tracks && req.body.tracks.length<2){
      const { _id } = req.body;
      // Verificar se o voto já existe no banco de dados
      const trackExist = await Tracks.findOne({ _id });
      if (trackExist) {
        // Se o voto já existe, atualizar a quantidade de votos
        trackExist.quantidadeVotos += 1;
        await trackExist.save();
        res.json(trackExist);
      } else {
        // Se o voto não existe, criar um novo registro
        res.json("Voto n computado");
      }
    // }else{
    //   req.body.tracks.map(async (data) => {
    //     const name = data.name
    //     const country = data.country
    //     const flag = data.flag
    //     const image = data.image
    //     const novoVoto = new Tracks({ name, country, flag, image, quantidadeVotos:0 });
    //     await novoVoto.save();
    //   })
      // res.json("Todos Inseridos");
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao salvar o voto.' });
  }
});


app.use('/', pilotRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
