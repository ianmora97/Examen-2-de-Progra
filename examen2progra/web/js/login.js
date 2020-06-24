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
        
        $.ajax({
            type: "POST",
            url: "api/entrar",
            data: JSON.stringify(usuario),
            contentType: "application/json"
            
        });
    });
}
function errorMessage(status) {
    return "Ha ocurrido un error";
}
document.addEventListener("DOMContentLoaded", loaded);