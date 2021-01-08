window.onload = function () {

    const reqs = document.getElementsByClassName("req");
    for (const req of reqs) {
        req.innerHTML = req.innerHTML
            .replace(/[*]/g, '<span style="color: #E37D24; font-weight: 600;">*</span>');
    }

    let form = document.getElementById('reg_frm');

    let popup = document.getElementById("popup").children[0];
    let popupClose = popup.children[0].children[0].children[0];
    let popupTitle = popup.children[0].children[0].children[1];
    let popupMessage = popup.children[0].children[0].children[2];

    popupClose.addEventListener("click", function () {
        popup.classList.toggle("active");
    });

    let popo = document.getElementById('popo')

    var cedula = document.getElementById("id");
    var contrasena = document.getElementById("passwd");

    /*Validacion de la cedula*/
    cedula.oninput = function () {
        
        //Preguntamos si la cedula consta de 10 digitos
        if(cedula.value.length == 10){
            cedula.setCustomValidity("");

            //Obtenemos el digito de la region que sonlos dos primeros digitos
            var digito_region = cedula.value.substring(0,2);
            
            //Pregunto si la region existe ecuador se divide en 24 regiones
            if( digito_region >= 1 && digito_region <=24 ){
                cedula.setCustomValidity("");
            
                // Extraigo el ultimo digito
                var ultimo_digito   = cedula.value.substring(9,10);
        
                //Agrupo todos los pares y los sumo
                var pares = parseInt(cedula.value.substring(1,2)) + parseInt(cedula.value.substring(3,4)) +
                                 parseInt(cedula.value.substring(5,6)) + parseInt(cedula.value.substring(7,8));
        
                //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
                var numero1 = cedula.value.substring(0,1);
                var numero1 = (numero1 * 2);
                if( numero1 > 9 ){ var numero1 = (numero1 - 9); }
        
                var numero3 = cedula.value.substring(2,3);
                var numero3 = (numero3 * 2);
                if( numero3 > 9 ){ var numero3 = (numero3 - 9); }
        
                var numero5 = cedula.value.substring(4,5);
                var numero5 = (numero5 * 2);
                if( numero5 > 9 ){ var numero5 = (numero5 - 9); }
        
                var numero7 = cedula.value.substring(6,7);
                var numero7 = (numero7 * 2);
                if( numero7 > 9 ){ var numero7 = (numero7 - 9); }
        
                var numero9 = cedula.value.substring(8,9);
                var numero9 = (numero9 * 2);
                if( numero9 > 9 ){ var numero9 = (numero9 - 9); }
        
                var impares = numero1 + numero3 + numero5 + numero7 + numero9;
        
                //Suma total
                var suma_total = (pares + impares);
        
                //extraemos el primero digito
                var primer_digito_suma = String(suma_total).substring(0,1);
        
                //Obtenemos la decena inmediata
                var decena = (parseInt(primer_digito_suma) + 1)  * 10;
        
                //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
                var digito_validador = decena - suma_total;
        
                //Si el digito validador es = a 10 toma el valor de 0
                if(digito_validador == 10)
                    var digito_validador = 0;
        
                //Validamos que el digito validador sea igual al de la cedula
                if(digito_validador == ultimo_digito){
                    cedula.setCustomValidity("");
                }else{
                    cedula.setCustomValidity("Cedula incorrecta.");
                    return false;
                }
            }else{
            // Si no pertenece a ninguna region
                cedula.setCustomValidity("Cedula incorrecta.");
                return false;
            }
        }else{
            // Si no tiene 10 digitos
            cedula.setCustomValidity("Cedula incorrecta.");
            return false;
        }  
    } 

    /*Validacion de la clave*/
    contrasena.oninput = function () {
        if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{6,}/.test(contrasena.value)) {
            contrasena.setCustomValidity("");
            return true;
        }else{
            contrasena.setCustomValidity("Debe contener al menos un número, una letra mayúscula, un caracter" + 
                                        " especial(!@#$%^&*) y por los menos 6 caracteres de longitud");
            return false;
        }
    }

    /*Almacenamiento de los valores*/
    form.addEventListener("submit", function (e) {

        e.preventDefault();

        document.body.style.cursor = 'wait';

        /*obtener los valores*/
        var nombre_padre = document.getElementById("name");
        var apell_padre = document.getElementById("lstname");
        var pswd = document.getElementById("passwd");
        var telf = document.getElementById("phone");
        var mail = document.getElementById("email");
            
        /*Creamos el objeto con los valores a guardar*/
        var valores = {
            nombre:nombre_padre.value,
            apellido:apell_padre.value,
            password:pswd.value,
            telefono:telf.value,
            correo:mail.value,
            tipo:"normal"
        };

        /*Obtenemos la base de datos*/ 
        var database = firebase.database();

        var ref = database.ref('users/' + cedula.value);

        /*Verifica existencia de la cedula*/
        ref.transaction(function(currentData) {
            if (currentData === null) {
                auth
                    .createUserWithEmailAndPassword(mail.value, pswd.value)
                    .then(userCredential => {
                        console.log("exito");
                    });
                return valores;
            }else{
                return;
            } 
        }, function (error, committed, snapshot) {
            if (error) {
                document.body.style.cursor = 'default';
                popupTitle.innerText = "Error";
                popupMessage.innerText = "Sucedio un error";
                popup.classList.toggle("active");
            }else if (!committed) {
                document.body.style.cursor = 'default';
                cedula.setCustomValidity("Ya existe un usuario con ese número de cédula!");
                return false;
            }else{
                sessionStorage.setItem("id", cedula.value);
                window.location = '/normal_user.html';
                document.body.style.cursor = 'default';
            }
        });
    
    });

}