const express = require('express');
// const TarjetCredit = require('../../controllers/api/tarjetcredit');
const router = express.Router(); 
// const tarjetcredit = new TarjetCredit();
const { scrappingTarjeta } = require('../../controllers/tarjetaCredito')

// router.post('/', (req,res) =>{ tarjetcredit.postTarjetCredit(req,res)});

router.post('/scrappingTarjeta', scrappingTarjeta);  


module.exports = router;