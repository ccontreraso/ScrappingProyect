const express = expres();
const app = expres();
const puppeteer = require('puppeteer');
const CartolaModel = require('../../models/cartola');

class Cartola{

    srappingCartolaEdwards = async (req = app.req ,res = app.res) => {


        try {
            console.log(JSON.stringify(req.body));
            const data = req.body; 
            const rutCliente = data.rut;
            const pass = data.pass;
            //Fecha
            const fecha = new Date();
            const hoy = fecha.getDate();
            const mes = fecha.getMonth();
            const año = fecha.getFullYear();1
            console.log(hoy,(mes+1),año);

            console.log(rutCliente);
            console.log(pass);
            const browser = await puppeteer.launch({headless: false}); //Podemos ver lo que va haciendo con el headless = false
            const page = await browser.newPage(); //Interactúa con las paginas
            await page.setViewport({width : 1920, height : 1080});
            await page.goto('https://portales.bancoedwards.cl/personas',[2000, {waitUntil: "domcontentloaded"}]);//La URL con los ms que queremos que espere en que cargue el contenido
            
            //Seleccionar
            let elementToClick = '#pbec_header-link-banco_en_linea';
            await page.waitForSelector(elementToClick);
            await Promise.all([
                page.click(elementToClick),
                page.waitForNavigation({waitUntil: 'networkidle2'}),
            ]);
    
            let elementToRut = '#iduserName';
            await page.type(elementToRut, rutCliente);

            let elementToPass = 'input[name="userpassword"]';
            await page.type(elementToPass,pass)
    
            elementToClick = '#idIngresar';
            await page.waitForSelector(elementToClick);
            await Promise.all([
                page.click(elementToClick),
                page.waitForNavigation({waitUntil: 'networkidle2'}),
            ]);
    
            elementToClick = '#main > fenix-mf-fenix-home-root > div > div > fenix-home > div.bch-home > div > div.mb-4.pb-2 > div:nth-child(2) > section.mt-2.mb-5 > div > div > div > div > div.col-lg-12.col-xl-10.d-flex.fw-w.ai-c.jc-sa.mt-lg-2.mt-xl-0.pl-lg-0.pl-xl-4 > div:nth-child(4) > bch-button > div > button';
            await page.waitForSelector(elementToClick);
            await Promise.all([
                page.click(elementToClick),
                page.waitForNavigation({waitUntil: 'networkidle2'}),
            ]);



    }catch (error) {
        console.log(error);
        
    }

}
}

module.exports = Cartola;