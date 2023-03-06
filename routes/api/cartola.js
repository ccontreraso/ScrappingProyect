const express = require('express');
const app = express();7
const Cartola = require('../../controllers/api/cartola');
const cartola = new Cartola();
const router = express.Router();