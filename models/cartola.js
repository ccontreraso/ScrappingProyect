const {Schema, model} = require('mongoose');

const cartolaSchema = Schema({
    rutCliente : {
        type: String,
        require: true
    },
    Cartola :{
        numeroCartola :{
            type:String,
            require:true
        },
        fechaEmision :{
            type:String,
            require : true
        }

    }
})
module.exports = model('Cartola',cartolaSchema);