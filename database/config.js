const mongoose = require('mongoose');


const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB,{
            UseNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos conectada exitosamente')
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = dbConnection;