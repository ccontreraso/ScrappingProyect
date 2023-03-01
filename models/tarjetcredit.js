const {Schema, model} = require('mongoose');

const tarjetCreditSchema = Schema({
    montoNacDisp : {
        type: String,
        require: true
    },
    montoNacUti : {
        type: String,
        require: true
    },
    montoNacTot : {
        type: String,
        require: true
    },
    montoInterDisp : {
        type: String,
        require: true
    },
    montoInterUti : {
        type: String,
        require: true
    },
    montoInterTot : {
        type: String,
        require: true
    }
});

module.exports = model('TarjetCredit',tarjetCreditSchema);