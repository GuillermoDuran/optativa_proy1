window.onload = function () {

    const reqs = document.getElementsByClassName("req");
    for (const req of reqs) {
        req.innerHTML = req.innerHTML
            .replace(/[*]/g, '<span style="color: #E37D24; font-weight: 600;">*</span>');
    }
    
    var id = sessionStorage.getItem("id")

    console.log(id)

    var usr_nam = document.getElementById("nombre-usr");

    var ref = firebase.database().ref('users/' + id);
    var ninosRef = firebase.database().ref("users/" + id + "/ninos");
    var ninos;

    ref.once("value")
        .then(function (snapshot) {
            usr_nam.innerText = snapshot.child("nombre").val() + " " + snapshot.child("apellido").val();
            ninos = snapshot.child("ninos").val();
        })


    var submit = document.getElementById("submit_reg_hijo");
    var form = document.getElementById("frm-reg-nino");
    var consult_btn = document.getElementById("sub-menu2");
    var reg_btn = document.getElementById("sub-menu1");

    var nombres = document.getElementById("name1");
    var apells = document.getElementById("apell1");
    var edads = document.getElementById("edad1");
    var tiempos = document.getElementById("time1");
    var cursos = document.getElementsByName("curso");

    var curso;

        for(c = 0; c < cursos.length; c++) {
            if(cursos[c].checked) {
                curso = cursos[c].value;
                break;
            }
        }

    form.addEventListener("submit", function (e) {

        e.preventDefault();
            escribirDatosNinos();
            document.body.style.cursor = 'wait';
            document.getElementById("frm_user_wrapper").style.display = "none";
            document.getElementById("consulta").style.display = "inherit";
            document.body.style.cursor = 'default';
    });

    var nombre_nino = document.getElementsByName("name1-cons");
    var apell_nino = document.getElementsByName("apell1-cons");
    var edad_nino = document.getElementsByName("edad1-cons");
    var tiempo_nino = document.getElementsByName("time_av1-cons");
    var curso_nino = document.getElementsByName("curso-nino-cons");

    var contaioner_cons = document.getElementsByName("container-input-cons");
    
    consult_btn.addEventListener("click", function () {
        document.getElementById("frm_user_wrapper").style.display = "none";
        if(ninos == null) {
            nombre_nino[0].innerText = "No hay datos";
            apell_nino[0].innerText = "No hay datos";
            edad_nino[0].innerText = "No hay datos";
            tiempo_nino[0].innerText = "No hay datos";
            curso_nino[0].innerText = "No hay datos";
        }/*else{
            ninosRef.once('value')
            .then(function (snapshot) {
                var childKeys = Object.keys(snapshot.val());
                for (i = 0; i < childKeys.length; i++) {
                    var ninoNombre = snapshot.child(childKeys[i] + "/nombre").val();
                    var ninoApell = snapshot.child(childKeys[i] + "/apellido").val();
                    var ninoEdad = snapshot.child(childKeys[i] + "/edad").val();
                    var ninoTiempo = snapshot.child(childKeys[i] + "/tiempo").val();
                    var ninoCurso = snapshot.child(childKeys[i] + "/curso").val();
                    if (childKeys.length === 0) {
                        userId = childKeys[i]
                        nombre_nino[i].innerText = ninoNombre;
                        apell_nino[i].innerText = ninoApell;
                        edad_nino[i].innerText = ninoEdad;
                        tiempo_nino[i].innerText = ninoTiempo;
                        curso_nino[i].innerText = ninoCurso;
                        break;
                    }else{
                        contaioner_cons[i].insertAdjacentHTML("afterend", 
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
                        nombre_nino[i].innerText = ninoNombre;
                        apell_nino[i].innerText = ninoApell;
                        edad_nino[i].innerText = ninoEdad;
                        tiempo_nino[i].innerText = ninoTiempo;
                        curso_nino[i].innerText = ninoCurso;
                    }
                }
            }).catch((error) => {
                console.log(error);
            });
        }*/
        document.getElementById("consulta").style.display = "inherit";
    });

    function escribirDatosNinos () {

        data = {
            nombre: nombres.value,
            apellido: apells.value,
            edad: edads.value,
            tiempoDisp: tiempos.value,
            curso: curso
        }

        if(ninos == null) {
            console.log(ninos)
            ref.child("ninos").push().set(data);
        }else{ 
            ninosRef.once('value')
            .then(function (snapshot) {
                var childKeys = Object.keys(snapshot.val());
                for (i = 0; i < childKeys.length; i++) {
                    var ninoNombre = snapshot.child(childKeys[i] + "/nombre").val();
                    var ninoApell = snapshot.child(childKeys[i] + "/apellido").val();
                    var ninoEdad = snapshot.child(childKeys[i] + "/edad").val();
                    var ninoTiempo = snapshot.child(childKeys[i] + "/tiempo").val();
                    var ninoCurso = snapshot.child(childKeys[i] + "/curso").val();
                    if (childKeys.length === 0) {
                        userId = childKeys[i]
                        nombre_nino[i].innerText = ninoNombre;
                        apell_nino[i].innerText = ninoApell;
                        edad_nino[i].innerText = ninoEdad;
                        tiempo_nino[i].innerText = ninoTiempo;
                        curso_nino[i].innerText = ninoCurso;
                        break;
                    }else{
                        contaioner_cons[i].insertAdjacentHTML("afterend", 
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
                        nombre_nino[i].innerText = ninoNombre;
                        apell_nino[i].innerText = ninoApell;
                        edad_nino[i].innerText = ninoEdad;
                        tiempo_nino[i].innerText = ninoTiempo;
                        curso_nino[i].innerText = ninoCurso;
                    }
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    reg_btn.addEventListener("click", function () {
        document.getElementById("consulta").style.display = "none";

        document.getElementById("frm_user_wrapper").style.display = "inherit";
    });

    ninosRef.once('value')
        .then(function (snapshot) {
            console.log(snapshot.val())
            var childKeys = Object.keys(snapshot.val());
            for (i = 0; i < childKeys.length; i++) {
                var ninoNombre = snapshot.child(childKeys[i] + "/nombre").val();
                var ninoApell = snapshot.child(childKeys[i] + "/apellido").val();
                var ninoEdad = snapshot.child(childKeys[i] + "/edad").val();
                var ninoTiempo = snapshot.child(childKeys[i] + "/tiempo").val();
                var ninoCurso = snapshot.child(childKeys[i] + "/curso").val();
                if (childKeys.indexOf(childKeys[i]) == 0) {
                    userId = childKeys[i]
                    nombre_nino[i].innerText = ninoNombre;
                    apell_nino[i].innerText = ninoApell;
                    edad_nino[i].innerText = ninoEdad;
                    tiempo_nino[i].innerText = ninoTiempo;
                    curso_nino[i].innerText = ninoCurso;
                    break;
                }else{
                    contaioner_cons[i].insertAdjacentHTML("afterend", 
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
                    nombre_nino[i].innerText = ninoNombre;
                    apell_nino[i].innerText = ninoApell;
                    edad_nino[i].innerText = ninoEdad;
                    tiempo_nino[i].innerText = ninoTiempo;
                    curso_nino[i].innerText = ninoCurso;
                }
            }
        }).catch((error) => {
            console.log(error);
        });

}