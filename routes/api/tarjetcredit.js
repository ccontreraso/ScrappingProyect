const express = require('express');
const TarjetCredit = require('../../controllers/api/tarjetcredit');
const router = express.Router(); 
const tarjetcredit = new TarjetCredit();

router.post('/', (req,res) =>{ tarjetcredit.postTarjetCredit(req,res)});

router.post('/scrappingTarjetaEdwards', (req,res) => {tarjetcredit.scrappingTarjetaEdwards(req,res)});  

router.post('/scrappingTarjetaScotiabank', (req,res) => {tarjetcredit.scrappingTarjetaScotiabank(req,res)});


module.exports = router;