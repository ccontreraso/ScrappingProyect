const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const dbConnection = require('../database/config');
const fileUpload = require('express-fileupload');


class Server{


    constructor(path){

        //variables init
        this.app = express();
        this.port = process.env.PORT;
        this.path = path;
        
        //this.middlewares();
        //Conexion BBDD

        this.app.use(cors());
        this.app.use(express.json());

        this.engine();
        
        this.connectDB();

        //Rutas del servidor
        this.route = require('../routes/routes.json');
        this.routes();

        
    }

    async connectDB(){
        await dbConnection();
    }

    engine (){
        this.app.set('view engine', 'ejs');
        this.app.use(express.static(this.path+ '/public'));
        
    }

    routes(){
        
        this.app.use(this.route.routes.api.tarjetcredit, require('../routes/api/tarjetcredit'));
        this.app.use(this.route.routes.api.home, require('../routes/api/home'));
        //this.app.get('/', function(req, res){res.json({msg: "PRobando"}) });

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ambiente en el puerto ${this.port}`);

        })

    }
}
module.exports = Server;