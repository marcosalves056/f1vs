const express = require('express');
const router = express.Router();
const Pilot = require('../models/pilot.models');

// Inserir um piloto ou vários pilotos de uma vez
router.post('/pilots', async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // Caso seja um array de pilotos
      const pilots = await Pilot.create(req.body);
      res.json(pilots);
    } else {
      // Caso seja apenas um piloto
      const pilot = await Pilot.create(req.body);
      res.json(pilot);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao salvar os pilotos.' });
  }
});

// Obter todos os pilotos
router.get('/pilots', async (req, res) => {
  try {
    const pilots = await Pilot.find();
    res.json(pilots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter os pilotos.' });
  }
});

module.exports = router;
