const express = require('express');
const app = express();7
const Cartola = require('../../controllers/api/cartola');
const cartola = new Cartola();
const router = express.Router();

router.get('/scrappingCartolaEdwards', (req,res) => {cartola.scrappingCartolaEdwards(req,res)});

module.exports = router;