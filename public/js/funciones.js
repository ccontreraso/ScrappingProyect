function scrapping1(){

    var txt_rut = document.getElementById("txt_rut").value
    var txt_password = document.getElementById("txt_password").value;
    let ruta = 'http://localhost:3000/tarjetcredit/scrappingTarjeta';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": txt_rut,
        "pass": txt_password
    });

    console.log(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(ruta, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    
}