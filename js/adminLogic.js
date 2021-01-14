window.onload = () => {

    //id de la solicitud
    let solicitudKeys;

    //Elementos html
    let nombre_padre = document.getElementById("name");
    let cedula = document.getElementById('id');
    let telefono = document.getElementById('phone');
    let correo = document.getElementById('email');
    let nombre_nino =document.getElementById('name1');
    let edad_nino = document.getElementById('edad1');
    let tiempo_nino = document.getElementById('time_av');
    let curso_nino = document.getElementById('cursos-admin');
    let acpt_btn = document.getElementById('acpt-btn');
    let rjct_btn = document.getElementById('rjct-btn');
    let id_sol = document.getElementById('id-solicitud');
    let container = document.getElementById('container-input-reg');
    let wrapper = document.getElementById('frm_reg_wrapper');
    let pend_items = document.getElementById('pend-items');
    let acpt_items = document.getElementById('acpt-items');
    let rchz_items = document.getElementById('rchz-items');
    let side_pend_id = document.getElementsByName('side-menu-pend-id');
    let side_acpt_id = document.getElementsByName('side-menu-acpt-id');
    let side_rchz_id = document.getElementsByName('side-menu-rch-id');
    let frm_title = document.getElementById('frm-title');

    //Popup
    let popup = document.getElementById("popup").children[0];
    let popupClose = popup.children[0].children[0].children[0];
    let popupTitle = popup.children[0].children[0].children[1];
    let popupMessage = popup.children[0].children[0].children[2];

    popupClose.addEventListener("click", function () {
        popup.classList.toggle("active");
    });

    //Obtiene el id del usuario
    var id = sessionStorage.getItem("id")

    //Elemento HTML del nombre de usuario
    var usr_nam = document.getElementById("nombre-usr");

    //Referencias a la base de datos
    var ref = firebase.database().ref('/users/' + id);
    var usersRef = firebase.database().ref('/users');

    //Carga el nombre del usuario
    ref.once('value')
        .then((snapshot) => {
            usr_nam.innerText = snapshot.child('nombre').val() + " " + snapshot.child('apellido').val();
        })
        .catch((error) => {
            console.log(error)
        })

    //Cargamos las solicitudes pendientes en el menu lateral y muestra la primera en el cuerpo de la pagina
    const cargarSolicitudes = () => {
        usersRef.once('value')
        .then((snapshot) => {
            var childKeys = Object.keys(snapshot.val());
            for(i = 0; i < childKeys.length; i++){
                var ninosRef = snapshot.child(childKeys[i] + "/ninos");
                if(ninosRef.hasChildren()){
                    var ninosKeys = Object.keys(snapshot.child(childKeys[i] + "/ninos").val());
                    for(j = 0; j < ninosKeys.length; j++){
                        var estadoSol = snapshot.child(childKeys[i] + "/ninos/" + ninosKeys[j] + "/estadoSol").val();
                        if(estadoSol == "Por revisar" && id_sol.innerText == "") {
                            side_pend_id[side_pend_id.length-1].innerText = childKeys[i]+ninosKeys[j];
                            side_pend_id[side_acpt_id.length-1].dataset.padre = childKeys[i];
                            side_pend_id[side_acpt_id.length-1].dataset.nino = ninosKeys[j];
                            id_sol.innerText = childKeys[i]+ninosKeys[j];
                            pend_items.childNodes[1].innerText = childKeys[i]+ninosKeys[j];
                            nombre_padre.innerText = snapshot.child(childKeys[i] + "/nombre").val() + " " +
                                                        snapshot.child(childKeys[i] + "/apellido").val();
                            cedula.innerText = childKeys[i];
                            telefono.innerText = snapshot.child(childKeys[i] + "/telefono").val();
                            correo.innerText = snapshot.child(childKeys[i] + "/correo").val();
                            nombre_nino.innerText = snapshot.child(childKeys[i] + "/ninos/" + ninosKeys[j] + "/nombre").val() +
                                        " " + snapshot.child(childKeys[i] + "/ninos/" + ninosKeys[j] + "/apellido").val();
                            edad_nino.innerText = snapshot.child(childKeys[i] + "/ninos/" + ninosKeys[j] + "/edad").val();
                            tiempo_nino.innerText = snapshot.child(childKeys[i] + "/ninos/" + ninosKeys[j] + "/tiempoDisp").val();
                            curso_nino.innerText = snapshot.child(childKeys[i] + "/ninos/" + ninosKeys[j] + "/curso").val();
                            solicitudKeys = [childKeys[i], ninosKeys[j]];
                            side_pend_id[side_pend_id.length-1].addEventListener('click', e => {
                                var datoNino = e.currentTarget.dataset.nino;
                                var datoPadre = e.currentTarget.dataset.padre;
                                nombre_padre.innerText = snapshot.child(datoPadre + "/nombre").val() + " " +
                                                        snapshot.child(datoPadre + "/apellido").val();
                                cedula.innerText = datoPadre;
                                telefono.innerText = snapshot.child(datoPadre + "/telefono").val();
                                correo.innerText = snapshot.child(datoPadre + "/correo").val();
                                nombre_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/nombre").val() +
                                            " " + snapshot.child(datoPadre + "/ninos/" + datoNino + "/apellido").val();
                                edad_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/edad").val();
                                tiempo_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/tiempoDisp").val();
                                curso_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/curso").val();
                                frm_title.innerText = "Pendiente";
                                id_sol.innerText = datoPadre+datoNino;
                                solicitudKeys = [datoPadre, datoNino];
                                rjct_btn.style.display = "inline-block";
                                acpt_btn.style.display = "inline-block";
                            })
                        } else if (estadoSol == "Por revisar"){
                            side_pend_id[side_pend_id.length-1].insertAdjacentHTML("afterend",
                            `<li name="side-menu-pend-id" data-padre="" data-nino=""></li>`);
                            side_pend_id[side_pend_id.length-1].innerText = childKeys[i]+ninosKeys[j];
                            side_pend_id[side_pend_id.length-1].dataset.padre = childKeys[i];
                            side_pend_id[side_pend_id.length-1].dataset.nino = ninosKeys[j];
                            //Evento para cada elemento creado
                            side_pend_id[side_pend_id.length-1].addEventListener('click', e => {
                                var datoNino = e.currentTarget.dataset.nino;
                                var datoPadre = e.currentTarget.dataset.padre;
                                nombre_padre.innerText = snapshot.child(datoPadre + "/nombre").val() + " " +
                                                        snapshot.child(datoPadre + "/apellido").val();
                                cedula.innerText = datoPadre;
                                telefono.innerText = snapshot.child(datoPadre + "/telefono").val();
                                correo.innerText = snapshot.child(datoPadre + "/correo").val();
                                nombre_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/nombre").val() +
                                            " " + snapshot.child(datoPadre + "/ninos/" + datoNino + "/apellido").val();
                                edad_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/edad").val();
                                tiempo_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/tiempoDisp").val();
                                curso_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/curso").val();
                                frm_title.innerText = "Pendiente";
                                id_sol.innerText = datoPadre+datoNino;
                                solicitudKeys = [datoPadre, datoNino];
                                rjct_btn.style.display = "inline-block";
                                acpt_btn.style.display = "inline-block";
                            })
                        } if(estadoSol == "Aprobado" && side_acpt_id[side_acpt_id.length-1].innerText == "") {
                            side_acpt_id[side_acpt_id.length-1].innerText = childKeys[i]+ninosKeys[j];
                            side_acpt_id[side_acpt_id.length-1].dataset.padre = childKeys[i];
                            side_acpt_id[side_acpt_id.length-1].dataset.nino = ninosKeys[j];
                            side_acpt_id[side_acpt_id.length-1].addEventListener('click', e => {
                                var datoNino = e.currentTarget.dataset.nino;
                                var datoPadre = e.currentTarget.dataset.padre;
                                nombre_padre.innerText = snapshot.child(datoPadre + "/nombre").val() + " " +
                                                        snapshot.child(datoPadre + "/apellido").val();
                                cedula.innerText = datoPadre;
                                telefono.innerText = snapshot.child(datoPadre + "/telefono").val();
                                correo.innerText = snapshot.child(datoPadre + "/correo").val();
                                nombre_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/nombre").val() +
                                            " " + snapshot.child(datoPadre + "/ninos/" + datoNino + "/apellido").val();
                                edad_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/edad").val();
                                tiempo_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/tiempoDisp").val();
                                curso_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/curso").val();
                                container.style.display = "inherit";
                                rjct_btn.style.display = "inherit";
                                acpt_btn.style.display = "none";
                                wrapper.style.height = "647px";
                                id_sol.innerText = datoPadre+datoNino;
                                frm_title.innerText = "Aprobado";
                                solicitudKeys = [datoPadre, datoNino];
                            })
                        } else if(estadoSol == "Aprobado") {
                            side_acpt_id[side_acpt_id.length-1].insertAdjacentHTML("afterend",
                            `<li name="side-menu-acpt-id" data-padre="" data-nino=""></li>`);
                            side_acpt_id[side_acpt_id.length-1].dataset.padre = childKeys[i];
                            side_acpt_id[side_acpt_id.length-1].dataset.nino = ninosKeys[j];
                            side_acpt_id[side_acpt_id.length-1].innerText = childKeys[i]+ninosKeys[j];
                            side_acpt_id[side_acpt_id.length-1].addEventListener('click', e => {
                                var datoNino = e.currentTarget.dataset.nino;
                                var datoPadre = e.currentTarget.dataset.padre;
                                nombre_padre.innerText = snapshot.child(datoPadre + "/nombre").val() + " " +
                                                        snapshot.child(datoPadre + "/apellido").val();
                                cedula.innerText = datoPadre;
                                telefono.innerText = snapshot.child(datoPadre + "/telefono").val();
                                correo.innerText = snapshot.child(datoPadre + "/correo").val();
                                nombre_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/nombre").val() +
                                            " " + snapshot.child(datoPadre + "/ninos/" + datoNino + "/apellido").val();
                                edad_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/edad").val();
                                tiempo_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/tiempoDisp").val();
                                curso_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/curso").val();
                                container.style.display = "inherit";
                                wrapper.style.height = "647px";
                                id_sol.innerText = datoPadre+datoNino;
                                frm_title.innerText = "Aprobado";
                                rjct_btn.style.display = "inherit";
                                acpt_btn.style.display = "none";
                                solicitudKeys = [datoPadre, datoNino];
                            })
                        } else if(estadoSol == "Rechazado" && side_rchz_id[side_rchz_id.length-1].innerText == "") {
                            side_rchz_id[side_rchz_id.length-1].dataset.padre = childKeys[i];
                            side_rchz_id[side_rchz_id.length-1].dataset.nino = ninosKeys[j];
                            side_rchz_id[side_rchz_id.length-1].innerText = childKeys[i]+ninosKeys[j];
                            side_rchz_id[side_rchz_id.length-1].addEventListener('click', e => {
                                var datoNino = e.currentTarget.dataset.nino;
                                var datoPadre = e.currentTarget.dataset.padre;
                                nombre_padre.innerText = snapshot.child(datoPadre + "/nombre").val() + " " +
                                                        snapshot.child(datoPadre + "/apellido").val();
                                cedula.innerText = datoPadre;
                                telefono.innerText = snapshot.child(datoPadre + "/telefono").val();
                                correo.innerText = snapshot.child(datoPadre + "/correo").val();
                                nombre_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/nombre").val() +
                                            " " + snapshot.child(datoPadre + "/ninos/" + datoNino + "/apellido").val();
                                edad_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/edad").val();
                                tiempo_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/tiempoDisp").val();
                                curso_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/curso").val();
                                container.style.display = "inherit";
                                rjct_btn.style.display = "none";
                                acpt_btn.style.display = "inherit";
                                wrapper.style.height = "647px";
                                id_sol.innerText = datoPadre+datoNino;
                                frm_title.innerText = "Rechazado";
                                solicitudKeys = [datoPadre, datoNino];
                            })
                        } else if(estadoSol == "Rechazado") {
                            side_rchz_id[side_rchz_id.length-1].insertAdjacentHTML("afterend",
                            `<li name="side-menu-rch-id" data-padre="" data-nino=""></li>`);
                            side_rchz_id[side_rchz_id.length-1].dataset.padre = childKeys[i];
                            side_rchz_id[side_rchz_id.length-1].dataset.nino = ninosKeys[j];
                            side_rchz_id[side_rchz_id.length-1].innerText = childKeys[i]+ninosKeys[j];
                            side_rchz_id[side_rchz_id.length-1].addEventListener('click', e => {
                                var datoNino = e.currentTarget.dataset.nino;
                                var datoPadre = e.currentTarget.dataset.padre;
                                nombre_padre.innerText = snapshot.child(datoPadre + "/nombre").val() + " " +
                                                        snapshot.child(datoPadre + "/apellido").val();
                                cedula.innerText = datoPadre;
                                telefono.innerText = snapshot.child(datoPadre + "/telefono").val();
                                correo.innerText = snapshot.child(datoPadre + "/correo").val();
                                nombre_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/nombre").val() +
                                            " " + snapshot.child(datoPadre + "/ninos/" + datoNino + "/apellido").val();
                                edad_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/edad").val();
                                tiempo_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/tiempoDisp").val();
                                curso_nino.innerText = snapshot.child(datoPadre + "/ninos/" + datoNino + "/curso").val();
                                frm_title.innerText = "Rechazado";
                                id_sol.innerText = datoPadre+datoNino;
                                container.style.display = "inherit";
                                wrapper.style.height = "647px";
                                rjct_btn.style.display = "none";
                                acpt_btn.style.display = "inherit";
                                solicitudKeys = [datoPadre, datoNino];
                            })
                        }
                    }
                }
            }           
            if(id_sol.innerText == ""){
                id_sol.innerText = "No hay solicitudes pendientes."
                container.style.display = "none";
                wrapper.style.height = "647px"
                pend_items.style.display = "none";
            } else if (side_rchz_id[0].innerText == "") {
                rchz_items.style.display = "none";
            } else if (side_acpt_id[0].innerText == "") {
                acpt_items.style.display = "none";
            }
        }).catch((e) => {
            console.log(e);
            popupTitle.innerText = "Error :(";
            popupMessage.innerText = "Ocurrio un erro.";
            popup.classList.toggle("active");
        });
    }

    //
    cargarSolicitudes();

    //Aceptar solicitud
    const aceptarSolicitud = () => {
        var updates = {};
        updates[solicitudKeys[0] + "/ninos/" + solicitudKeys[1] + "/estadoSol"] = "Aprobado";
        return usersRef.update(updates).catch((e) => {
            console.log(e);
            popupTitle.innerText = "Error :(";
            popupMessage.innerText = "Ocurrio un error.";
            popup.classList.toggle("active");
        });
    }

    //Aceptar solicitud
    const rechazarSolicitud = () => {
        var updates = {};
        updates[solicitudKeys[0] + "/ninos/" + solicitudKeys[1] + "/estadoSol"] = "Rechazado";
        return usersRef.update(updates).catch((e) => {
            console.log(e);
            popupTitle.innerText = "Error :(";
            popupMessage.innerText = "Ocurrio un error.";
            popup.classList.toggle("active");
        });
    }

    //Evento del boton aceptar
    acpt_btn.addEventListener("click", (e) => {
        aceptarSolicitud();
    })
    
    //Evento del boton rechazar
    rjct_btn.addEventListener("click", (e) => {
        rechazarSolicitud();
    })

}