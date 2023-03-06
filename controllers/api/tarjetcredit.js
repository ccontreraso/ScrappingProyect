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

    scrappingTarjetaEdwards = async (req = request, res = response) => {
        try {
                console.log(JSON.stringify(req.body));
                const data = req.body; 
                const rutCliente = data.rut;
                const pass = data.pass;
                
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

                await page.waitForTimeout(2000);
                
        
                const result = await page.evaluate(() => {
                    let nombreBanco = "Banco Edwards";
                    let montoNacDis = document.querySelector("#main > fenix-tarjeta-credito-persona-root > div > div > ui-view > fenix-main > section > ui-view > fenix-saldo-movimiento-no-facturados > div.row.mb-5.ng-star-inserted > div.col-12.col-lg-6.mb-4.mb-lg-0.col-print-6 > div > div.summary-header > div.summary-header-lead.pt-0 > div:nth-child(2) > div:nth-child(1) > span").innerText;
                    let montoNacUti = document.querySelector("#main > fenix-tarjeta-credito-persona-root > div > div > ui-view > fenix-main > section > ui-view > fenix-saldo-movimiento-no-facturados > div.row.mb-5.ng-star-inserted > div.col-12.col-lg-6.mb-4.mb-lg-0.col-print-6 > div > div.summary-header > div.summary-header-lead.pt-0 > div:nth-child(2) > div.col-12.col-sm-6.mt-sm-0.mt-2.ta-sm-r.col-print-6.mt-print-0.ta-print-r > span").innerText;
                    let montoNacTot = document.querySelector("#main > fenix-tarjeta-credito-persona-root > div > div > ui-view > fenix-main > section > ui-view > fenix-saldo-movimiento-no-facturados > div.row.mb-5.ng-star-inserted > div.col-12.col-lg-6.mb-4.mb-lg-0.col-print-6 > div > div.summary-body > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span").innerText;
                    let montoInterDis = document.querySelector("#main > fenix-tarjeta-credito-persona-root > div > div > ui-view > fenix-main > section > ui-view > fenix-saldo-movimiento-no-facturados > div.row.mb-5.ng-star-inserted > div:nth-child(2) > div > div.summary-header > div.summary-header-lead.pt-0 > div:nth-child(2) > div:nth-child(1) > span").innerText;
                    let montoInterUti = document.querySelector("#main > fenix-tarjeta-credito-persona-root > div > div > ui-view > fenix-main > section > ui-view > fenix-saldo-movimiento-no-facturados > div.row.mb-5.ng-star-inserted > div:nth-child(2) > div > div.summary-header > div.summary-header-lead.pt-0 > div:nth-child(2) > div.col-12.col-sm-6.mt-sm-0.mt-2.ta-sm-r.col-print-6.mt-print-0.ta-print-r > span").innerText;
                    let montoInterTot = document.querySelector("#main > fenix-tarjeta-credito-persona-root > div > div > ui-view > fenix-main > section > ui-view > fenix-saldo-movimiento-no-facturados > div.row.mb-5.ng-star-inserted > div:nth-child(2) > div > div.summary-body > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span").innerText;
                    let tarjetCreditModel = {
                        rutCliente : data.rut,
                        nombreBanco : nombreBanco,
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
                
            
            

        } catch (error) {
            console.log(error);
            
        }
    }

    scrappingTarjetaScotiabank = async (req = request, res = response) => {


        
            console .log(JSON.stringify(req.body));
            const data = req.body; 
            const rutCliente = data.rut;
            const pass = data.pass;
            console.log(rutCliente);
            console.log(pass);
            const browser = await puppeteer.launch({headless: false}); //Podemos ver lo que va haciendo con el headless = false
            const page = await browser.newPage(); //Interactúa con las paginas
            await page.setViewport({width : 1920, height : 1080});
            await page.goto('https://www.scotiabank.cl/login/personas/',[2000, {waitUntil: "domcontentloaded"}]);

            let elementToRut = rutCliente;
            let elementToPass = pass;
            await page.type('#Validate_rut',elementToRut);
            await page.type('#pass',elementToPass);

            let elementToClick = '#loginForm > div > form > input.btnRed.agregar_Ancho.login_pass';
            await page.waitForSelector(elementToClick);
            await Promise.all([
                page.click(elementToClick),
                page.waitForNavigation({waitUntil: 'networkidle2'}),
            ]);    
            
            elementToClick = '#tarjetas > a';
            await page.waitForSelector(elementToClick);
            await page.click(elementToClick); 

            await page.waitForTimeout(3000); 

            const elemento = await page.$('#tarjetas > ul > li:nth-child(1) > p:nth-child(3)'); 
            await elemento.click(); 



            // <p data-part="itemContainer" class="fix--submenu--label-responsive">
            //     <!-- ko ifnot: hasSubmenu -->
            //     <a href="javascript:void(0);" data-bind="text: title, click: $root.navigate, css: {'producto-nuevo-link': (productoNuevo)}" class="">Saldos y estado de cuenta</a>
            //     <!-- ko if: productoNuevo --><!-- /ko -->
            //     <!-- ko if: badgeText --><!-- /ko -->
            //     <!-- /ko -->
            //     <!-- ko if: hasSubmenu --><!-- /ko -->
            //   </p>

            await page.waitForTimeout(10000); 



            //<p class="text text--small percent-bar__label"><span class="percent-bar__label--value">19%</span> de $400.000</p>
            //await page.waitForSelector('#root > div > div.margin-xs-24--top.margin-md-24--top > div > div > div > div.margin-xs-24--top.margin-sm-24--top.margin-md-24--top.margin-lg-24--top > div > div.tab__content.tab__content--active > ul:nth-child(1) > li > div > div > div:nth-child(1) > div.margin-xs-24--bottom.margin-sm-12--bottom.margin-md-12--bottom.margin-lg-12--bottom > div > h1');
            //const prueba1 = await page.$('#root > div > div.margin-xs-24--top.margin-md-24--top > div > div > div > div.margin-xs-24--top.margin-sm-24--top.margin-md-24--top.margin-lg-24--top > div > div.tab__content.tab__content--active > ul:nth-child(1) > li > div > div > div:nth-child(1) > div.margin-xs-24--bottom.margin-sm-12--bottom.margin-md-12--bottom.margin-lg-12--bottom > div > h1');
            // Obtener un arreglo de todos los elementos h1 con la clase 'heading saldo__text'
            const elementos = await page.$$('.heading.saldo__text');

            // Seleccionar el segundo elemento del arreglo
            const segundoElemento = elementos[0];

            // Obtener el contenido del elemento seleccionado
            const contenido = await segundoElemento.evaluate((element) => element.textContent);

            console.log('El contenido del segundo elemento h1 es:', contenido);

            // const result = await page.evaluate(() => {

            //     let nombreBanco = "Banco Edwards";
            //     let montoNacDis = document.querySelector("#root > div > div.margin-xs-24--top.margin-md-24--top > div > div > div > div.margin-xs-24--top.margin-sm-24--top.margin-md-24--top.margin-lg-24--top > div > div.tab__content.tab__content--active > ul > li > div > div:nth-child(2) > div:nth-child(1) > div > div > h1").innerText;
            //     let montoNacUti = document.querySelector("#root > div > div.margin-xs-24--top.margin-md-24--top > div > div > div > div.margin-xs-24--top.margin-sm-24--top.margin-md-24--top.margin-lg-24--top > div > div.tab__content.tab__content--active > ul:nth-child(1) > li > div > div > div:nth-child(2) > div > h1").innerText;
            //     let montoNacTot = document.querySelector("#root > div > div.margin-xs-24--top.margin-md-24--top > div > div > div > div.margin-xs-24--top.margin-sm-24--top.margin-md-24--top.margin-lg-24--top > div > div.tab__content.tab__content--active > ul:nth-child(1) > li > div > div > div:nth-child(1) > div.hide--xs > p").innerText;
            //     let montoInterDis = document.querySelector("#root > div > div.margin-xs-24--top.margin-md-24--top > div > div > div > div.margin-xs-24--top.margin-sm-24--top.margin-md-24--top.margin-lg-24--top > div > div.tab__content.tab__content--active > ul:nth-child(2) > li > div > div > div.col-xs-12.col-sm-4.col-md-4.col-lg-4 > div.margin-xs-24--bottom.margin-sm-12--bottom.margin-md-12--bottom.margin-lg-12--bottom > div > h1").innerText;
            //     let montoInterUti = document.querySelector("#root > div > div.margin-xs-24--top.margin-md-24--top > div > div > div > div.margin-xs-24--top.margin-sm-24--top.margin-md-24--top.margin-lg-24--top > div > div.tab__content.tab__content--active > ul:nth-child(2) > li > div > div > div:nth-child(2) > div > h1").innerText;
            //     let montoInterTot = document.querySelector("#root > div > div.margin-xs-24--top.margin-md-24--top > div > div > div > div.margin-xs-24--top.margin-sm-24--top.margin-md-24--top.margin-lg-24--top > div > div.tab__content.tab__content--active > ul:nth-child(2) > li > div > div > div.col-xs-12.col-sm-4.col-md-4.col-lg-4 > div.hide--xs > p").innerText;
            //     let tarjetCreditModel = {
            //         rutCliente : rutCliente,
            //         nombreBanco : nombreBanco,
            //         montoNacDis : montoNacDis,
            //         montoNacUti : montoNacUti,
            //         montoNacTot : montoNacTot,
            //         montoInterDis : montoInterDis,
            //         montoInterUti : montoInterUti,
            //         montoInterTot : montoInterTot
            //     }
    
                
            //     return tarjetCreditModel;

            // });
            // console.log(result);
            }
            
            
    

}

module.exports = TarjetCredit;