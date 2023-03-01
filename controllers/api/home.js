const {response, request} = require('express');

class Home{

    viewHome = async (req = request, res = response) => {
        try {
            res.render('home')
        } catch (error) {
            console.log(error);
            
        }
    }
}
module.exports = Home 