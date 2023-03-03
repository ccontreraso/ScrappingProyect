const express = require('express');
const TarjetCredit = require('../../controllers/api/tarjetcredit');
const router = express.Router(); 
const tarjetcredit = new TarjetCredit();

router.post('/', (req,res) =>{ tarjetcredit.postTarjetCredit(req,res)});

router.post('/scrappingTarjeta', (req,res) => {tarjetcredit.scrappingTarjeta(req,res)});  


module.exports = router;