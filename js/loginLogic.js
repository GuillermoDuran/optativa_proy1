window.onload = function () {
    /*var sessionValues = JSON.parse(sessionStorage.getItem("sessionValues"));*/
    var mail = document.getElementById("login_mail");
    var pswd = document.getElementById("login_pswd");
    var form = document.getElementById("login_frm");

    const popup = document.getElementById("overlay");
    const popupClose = document.getElementById("close-btn");
    const popupTitle = document.getElementById("alert-title");
    const popupMessage = document.getElementById("alert-message");

    if (popup) {
        popupClose.addEventListener("click", function () {
            popup.classList.toggle("active");
        });
    }

    //Validacion de la contrasena
    pswd.oninput = function () {

        if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{6,}/.test(pswd.value)) {
            pswd.setCustomValidity("");

            return true;
        }else{
            pswd.setCustomValidity("Debe contener al menos un número, una letra mayúscula, un caracter" + 
                                        " especial(!@#$%^&*) y por los menos 6 caracteres de longitud");
            return false;
        }
        
    }

    //
    function authUser () {
        var userId;
        var userType;

        var ref = firebase.database().ref('users/');

        auth
            .signInWithEmailAndPassword(mail.value, pswd.value)
            .then(userCredential => {
                ref.once('value')
                .then(function (snapshot) {
                    var childKeys = Object.keys(snapshot.val());
                    for (i = 0; i < childKeys.length; i++) {
                        var userMail = snapshot.child(childKeys[i] + "/correo").val();
                        if (userMail == mail.value) {
                            userId = childKeys[i]
                            userType = snapshot.child(childKeys[i] + "/tipo").val();
                            break;
                        }
                    }
                    sessionStorage.setItem("id", userId)
                    if(userType === "normal") {
                        document.body.style.cursor = 'default';
                        window.location = '/normal_user.html';
                    } else {
                        document.body.style.cursor = 'default';
                        window.location = '/admin_user.html';
                    }
                });
            })
            .catch((error) => {
                document.body.style.cursor = 'default';
                popupTitle.innerText = "Error :(";
                popupMessage.innerText = "No existe el usuario! Verifique que escribio bien los datos.";
                popup.classList.toggle("active");
            });
    }

    form.addEventListener("submit", function (e) {
        
        e.preventDefault()

        document.body.style.cursor = 'wait';

        authUser();

    })

}