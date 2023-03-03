const {response, request } = require('express');
const TarjetCreditModel = require('../../models/tarjetcredit');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');


class TarjetCredit{

    getTarjetCredit = async (req = request, res = response) => {
        try {
            const {id} = req.params;
            const user = await TarjetCreditModel.findById(id);
            res.status(200).json({
                status : 200,
                mgs:user
            }) 
        } catch (error){
            console.log(error);  
            
        }
    };

    postTarjetCredit = async (req = request, res = response) => {
        try {
            const {montoNacDis,montoNacUti,montoNacTot, montoInterDis, montoInterUti,montoInterTot} = req.body;
            const tarjetcredit = new TarjetCreditModel(montoNacDis,montoNacUti,montoNacTot, montoInterDis, montoInterUti,montoInterTot)
            await tarjetcredit.save();
            res.status(201).json(newTarjectCredit)
        } catch (error) {
            res.status(400).json({message: error.message});

        }
    };

    scrappingTarjeta = async (req = request, res = response) => {
        try {
            
            let scrape = async () => {
                console.log(JSON.stringify(req.body));
                const data = req.body; 
                const rut = data.rut;
                const pass = data.pass;
                console.log(rut);
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
                await page.type(elementToRut, rut);

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

                await page.waitForTimeout(2000);
                
        
                const result = await page.evaluate(() => {
                    let montoNacDis = document.querySelector("#main > fenix-tarjeta-credito-persona-root > div > div > ui-view > fenix-main > section > ui-view > fenix-saldo-movimiento-no-facturados > div.row.mb-5.ng-star-inserted > div.col-12.col-lg-6.mb-4.mb-lg-0.col-print-6 > div > div.summary-header > div.summary-header-lead.pt-0 > div:nth-child(2) > div:nth-child(1) > span").innerText;
                    let montoNacUti = document.querySelector("#main > fenix-tarjeta-credito-persona-root > div > div > ui-view > fenix-main > section > ui-view > fenix-saldo-movimiento-no-facturados > div.row.mb-5.ng-star-inserted > div.col-12.col-lg-6.mb-4.mb-lg-0.col-print-6 > div > div.summary-header > div.summary-header-lead.pt-0 > div:nth-child(2) > div.col-12.col-sm-6.mt-sm-0.mt-2.ta-sm-r.col-print-6.mt-print-0.ta-print-r > span").innerText;
                    let montoNacTot = document.querySelector("#main > fenix-tarjeta-credito-persona-root > div > div > ui-view > fenix-main > section > ui-view > fenix-saldo-movimiento-no-facturados > div.row.mb-5.ng-star-inserted > div.col-12.col-lg-6.mb-4.mb-lg-0.col-print-6 > div > div.summary-body > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span").innerText;
                    let montoInterDis = document.querySelector("#main > fenix-tarjeta-credito-persona-root > div > div > ui-view > fenix-main > section > ui-view > fenix-saldo-movimiento-no-facturados > div.row.mb-5.ng-star-inserted > div:nth-child(2) > div > div.summary-header > div.summary-header-lead.pt-0 > div:nth-child(2) > div:nth-child(1) > span").innerText;
                    let montoInterUti = document.querySelector("#main > fenix-tarjeta-credito-persona-root > div > div > ui-view > fenix-main > section > ui-view > fenix-saldo-movimiento-no-facturados > div.row.mb-5.ng-star-inserted > div:nth-child(2) > div > div.summary-header > div.summary-header-lead.pt-0 > div:nth-child(2) > div.col-12.col-sm-6.mt-sm-0.mt-2.ta-sm-r.col-print-6.mt-print-0.ta-print-r > span").innerText;
                    let montoInterTot = document.querySelector("#main > fenix-tarjeta-credito-persona-root > div > div > ui-view > fenix-main > section > ui-view > fenix-saldo-movimiento-no-facturados > div.row.mb-5.ng-star-inserted > div:nth-child(2) > div > div.summary-body > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span").innerText;
                    let tarjetCreditModel = {
                        montoNacDis : montoNacDis,
                        montoNacUti : montoNacUti,
                        montoNacTot : montoNacTot,
                        montoInterDis : montoInterDis,
                        montoInterUti : montoInterUti,
                        montoInterTot : montoInterTot
                    }
        
                    
                    return tarjetCreditModel;
                    
                });
        
        
                console.log(result);
                browser.close();

                const tarjetcredit = new TarjetCreditModel(result);
                tarjetcredit.save();
                res.status(201).json({status:201, msg:tarjetcredit})
                console.log("Se ha guardado correctamente")
                
            };
            
            scrape().then(value => {

                
                return;
            });

        } catch (error) {
            console.log(error);
            
        }
    }

    scrappingCartola = async (req = request, res = response) => {
        
    }

}

module.exports = TarjetCredit;