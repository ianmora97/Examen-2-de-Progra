function loaded(event) {
    doLogin();
}
function doLogin() {
    $("#ingresar").click(function () {
        var c = $("#correoId").val();
        var cl = $("#claveId").val();
        var usuario = {
          correo:c,
          clave:cl
        };
        console.log(usuario);
        $.ajax({
            type: "POST",
            url: "api/login",
            data: JSON.stringify(usuario),
            contentType: "application/json"
        }).then((user)=>{
            console.log(user);
            if(user === undefined){
                location.href="index.html";
            }else{
                location.href="correo.html";
            }
        }
        ,(error)=>{
            
        });
    });
}
function errorMessage(status) {
    return "Ha ocurrido un error";
}
document.addEventListener("DOMContentLoaded", loaded);