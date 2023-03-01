const {Router} = require('express');
const router = Router();
const Home = require('../../controllers/api/home');
const home = new Home();


router.get('/', (req, res) => {home.viewHome(req,res)});

module.exports = router;