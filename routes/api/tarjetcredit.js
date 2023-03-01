const {Router} = require('express');
const TarjetCredit = require('../../controllers/api/tarjetcredit');
const router = Router();
const tarjetcredit = new TarjetCredit();

router.post('/', (req,res) =>{ tarjetcredit.postTarjetCredit(req,res)});

router.get('/scrapping', (req,res) =>{

})  


module.exports = router;