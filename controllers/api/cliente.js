const {response, request } = require('express');
const ClienteModel = require('../../../models/cliente');


class Cliente{

    getUser = async (req = request, res = response) => {
        try {
            const {id} = req.params;
            const user = await UserModel.findById(id);
        } catch () {
            
        }
    }

}