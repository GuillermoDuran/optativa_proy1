window.onload = function () {

    const reqs = document.getElementsByClassName("req");
    for (const req of reqs) {
        req.innerHTML = req.innerHTML
            .replace(/[*]/g, '<span style="color: #E37D24; font-weight: 600;">*</span>');
    }
    
    var sessionValues = JSON.parse(sessionStorage.getItem("sessionValues"));
    var usr_nam = document.getElementById("nombre-usr");

    usr_nam.innerText = sessionValues[0] + " " + sessionValues[1];

    console.log(sessionValues)

    var submit = document.getElementById("submit_reg_hijo");
    var form = document.getElementById("frm-reg-nino");
    var consult_btn = document.getElementById("sub-menu2");
    var reg_btn = document.getElementById("sub-menu1");

    form.addEventListener("submit", function (e) {

        var nombre_nino = document.getElementById("name1").value;
        var apell_nino = document.getElementById("apell1").value;
        var edad_nino = document.getElementById("edad1").value;
        var tiempo_nino = document.getElementById("time1").value;
        var curso_nino = document.getElementsByName("curso");

        var curso;

        for(c = 0; c < curso_nino.length; c++) {
            if(curso_nino[c].checked) {
                curso = curso_nino[c].value;
            }
        }

        sessionValues.push([nombre_nino, apell_nino, edad_nino, tiempo_nino, curso]);

        e.preventDefault();
            escribirDatosNinos();
            document.body.style.cursor = 'wait';
            setTimeout( function () {
            document.getElementById("frm_user_wrapper").style.display = "none";
            document.getElementById("consulta").style.display = "inherit";
            document.body.style.cursor = 'default';
            }, 1500);
    });

    var nombre_nino = document.getElementsByName("name1-cons");
    var apell_nino = document.getElementsByName("apell1-cons");
    var edad_nino = document.getElementsByName("edad1-cons");
    var tiempo_nino = document.getElementsByName("time_av1-cons");
    var curso_nino = document.getElementsByName("curso-nino-cons");

    var contaioner_cons = document.getElementsByName("container-input-cons");

    if(sessionValues.length > 4) {
        for(n = 4; n < sessionValues.length; n++) {
            if(n + 1 == 5) {
                var datos_nino = sessionValues[n]
                nombre_nino[n-4].innerText = datos_nino[0];
                apell_nino[n-4].innerText = datos_nino[1];
                edad_nino[n-4].innerText = datos_nino[2];
                tiempo_nino[n-4].innerText = datos_nino[3];
                curso_nino[n-4].innerText = datos_nino[4];
            }else{
                contaioner_cons[n-5].insertAdjacentHTML("afterend", 
                `<div class="container-inptbxs container-input-cons" name="container-input-cons">
                    <p>
                        <label class="req" for="name1">Nombre del niño</label>
                        <span class="name_nino" name="name1-cons" id="name-nino"> Nombre nino </span>
                    </p>
        
                    <p>
                        <label class="req" for="apell1">Apellido del niño</label>
                        <span class="apell_ninos" name="apell1-cons" id="apell-nino"> Apellido </span>
                    </p>
        
                    <p>
                        <label class="req" for="edad1">Edad del niño</label>
                        <span class="edad_ninos" name="edad1-cons" id="edad-nino"> Edad nino </span>
                    </p>
        
                    <p>
                        <label class="req" for="time_av1">Tiempo disponible del niño</label>
                        <span class="time_ninos" name="time_av1-cons" id="time_av_nino"> Tiempo </span>
                    </p>
        
                    <p>
                        <label class="req" for="curso-nino">Curso</label>
                        <span class="curso-ninos" name="curso-nino-cons" id="curso-nino"> Curso nino </span>
                    </p>
                </div>`);
                var datos_nino = sessionValues[n];
                console.log(n)
                nombre_nino[n-4].innerText = datos_nino[0];
                apell_nino[n-4].innerText = datos_nino[1];
                edad_nino[n-4].innerText = datos_nino[2];
                tiempo_nino[n-4].innerText = datos_nino[3];
                curso_nino[n-4].innerText = datos_nino[4];
            }
        }
    }

    function escribirDatosNinos () {
        console.log(sessionValues)
        console.log(sessionValues.length-5)
        if(sessionValues.length == 5){
            var datos_nino = sessionValues[4];
            nombre_nino[sessionValues.length-5].innerText = datos_nino[0];
            apell_nino[sessionValues.length-5].innerText = datos_nino[1];
            edad_nino[sessionValues.length-5].innerText = datos_nino[2];
            tiempo_nino[sessionValues.length-5].innerText = datos_nino[3];
            curso_nino[sessionValues.length-5].innerText = datos_nino[4];
            
        }else{
            contaioner_cons[sessionValues.length-6].insertAdjacentHTML("afterend", 
            `<div class="container-inptbxs" name="container-input-cons">
                <p>
                    <label class="req" for="name1">Nombre del niño</label>
                    <span class="name_nino" name="name1-cons" id="name-nino"> Nombre nino </span>
                </p>
    
                <p>
                    <label class="req" for="apell1">Apellido del niño</label>
                    <span class="apell_ninos" name="apell1-cons" id="apell-nino"> Apellido </span>
                </p>
    
                <p>
                    <label class="req" for="edad1">Edad del niño</label>
                    <span class="edad_ninos" name="edad1-cons" id="edad-nino"> Edad nino </span>
                </p>
    
                <p>
                    <label class="req" for="time_av1">Tiempo disponible del niño</label>
                    <span class="time_ninos" name="time_av1-cons" id="time_av_nino"> Tiempo </span>
                </p>
    
                <p>
                    <label class="req" for="curso-nino">Curso</label>
                    <span class="curso-ninos" name="curso-nino-cons" id="curso-nino"> Curso nino </span>
                </p>
            </div>`);
            var datos_nino = sessionValues[sessionValues.length-1];
            nombre_nino[sessionValues.length-5].innerText = datos_nino[0];
            apell_nino[sessionValues.length-5].innerText = datos_nino[1];
            edad_nino[sessionValues.length-5].innerText = datos_nino[2];
            tiempo_nino[sessionValues.length-5].innerText = datos_nino[3];
            curso_nino[sessionValues.length-5].innerText = datos_nino[4];
        }

        sessionStorage.setItem("sessionValues", JSON.stringify(sessionValues));

        console.log(sessionValues);
    }
    
    consult_btn.addEventListener("click", function () {
        document.getElementById("frm_user_wrapper").style.display = "none";

        if(sessionValues == null || sessionValues.length < 5) {
            nombre_nino[0].innerText = "No hay datos";
            apell_nino[0].innerText = "No hay datos";
            edad_nino[0].innerText = "No hay datos";
            tiempo_nino[0].innerText = "No hay datos";
            curso_nino[0].innerText = "No hay datos";
        }/*else{
            for(n = 4; n < sessionValues.length; n++){
                var datos = sessionValues[n]
                nombre_nino[n-4].innerText = datos[0]
                apell_nino[n-4].innerText = datos[1]
            }
        }*/

        document.getElementById("consulta").style.display = "inherit";
    });

    reg_btn.addEventListener("click", function () {
        document.getElementById("consulta").style.display = "none";

        document.getElementById("frm_user_wrapper").style.display = "inherit";
    });

}