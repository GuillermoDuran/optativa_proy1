window.onload = function () {
    /*var sessionValues = JSON.parse(sessionStorage.getItem("sessionValues"));*/
    var mail = document.getElementById("login_mail");
    var pswd = document.getElementById("login_pswd");
    var form = document.getElementById("login_frm");
    var submit = document.getElementById("submit_login");

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

    form.addEventListener("submit", function (e) {
        if (mail.value.length != 0 && pswd.value.length >= 6 && 
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail.value) &&
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{6,}/.test(pswd.value)){
            if(mail.value =="usuario@admin.com" && pswd.value =="pO@1234") {
                e.preventDefault()
                window.location = '/admin_user.html';
            }else{
                form.action = "/normal_user.html";
                e.preventDefault()
                window.location = '/normal_user.html';
            }
        }

    })

}