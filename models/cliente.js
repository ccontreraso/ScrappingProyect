const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = Schema({
    rut_cliente : {
        type: String,
        require: true
    },
    nombre_completo : {
        type: String,
        require: true
    },
    fecha_nacimiento : {
        type: String,
        require: true
    }

})


module.exports = Cliente = mongoose.model('cliente',clienteSchema);