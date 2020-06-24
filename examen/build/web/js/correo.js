
var correosEnviar = [];
function loaded(event) {
    fill();
    traerUsuario();
    deleteCorreos();
    destinatariosOnClick();
    enviarCorreo();
    doLogout();
    contactosList();
    fillEnviados();
    fillBuscar();
}
function traerUsuario() {
    $.ajax({
        type: "POST",
        url: "api/correo/getuser",
        contentType: "application/json"
    }).then((usuario) => {
        $("#usuarioSession").text(usuario.correo);
        $("#nombreUsuario").text(usuario.nombre + " " + usuario.apellido);
    }
    , (error) => {
        error.status;
    });

}
function fillEnviados() {
    $.ajax({
        type: "POST",
        url: "api/correo/enviados",
        contentType: "application/json"
    }).then((correo) => {
        console.log(correo);
        fillTitulosEnviados(correo);
    }
    , (error) => {
        error.status;
    });

}
function fillTitulosEnviados(correos) {
    $("#listaTitulosEnviados").html("");
    var i = 0;
    correos.forEach((cor) => {
        fillEnviado(cor, i);
        i = i + 1;
    });
}
function fillEnviado(correo, i) {
    var id = correo.id;
    var titulo = correo.titulo;
    var origen = correo.origen;
    var destino = correo.destino;
    var texto = correo.texto;
    var user = origen.substring(0, origen.indexOf('@'));
    $("#listaTitulosEnviados").append(
            '<div class="custom-control custom-checkbox">' +
            '<input type="checkbox" id="checkbox-' + id + '" class="custom-control-input" value="' + id + '" name="checked[]"/>' +
            '<label class="custom-control-label" for="checkbox-' + id + '"></div>' +
            '<a class=" nav-link btn btn-block  btn border-bottom py-2"  href="#' + user + id + '" data-toggle="tab" style="text-align: start;width: 95%;">' +
            '<span style="display:block;"><b>From: </b>' + origen + '</span></label>' +
            '<i class="far fa-star text-muted"></i>' +
            '<span class="pb-2 mx-3">' + titulo + '</span> ' +
            '</a>'
            );
    if (i === 0) {
        $("#correoEnviado").append(
                '<div class="tab-pane active  h-75" id="' + user + id + '">' +
                '<div class="container-fluid w-100  h-75">' +
                '<div class="row border-bottom">' +
                '<span class="address-capsule" style="cursor:pointer;margin:-5px 20px 20px 20px;font-weight: 700;color: cornflowerblue;">' +
                '<span>De: ' + origen + '</span></span>'+
                '<span><i class="fa fa-arrow-right" aria-hidden="true"></i></span>'+
                '<span class="address-capsule" style="cursor:pointer;margin:-5px 20px 20px 20px;font-weight: 700;color: cornflowerblue;">' +
                '<span>Para: ' + destino + '</span></span>'+
                '</div>' +
                '<div class="row border-bottom p-3">' +
                '<h3 class="display-5">' + titulo + '</h3></div>' +
                '<div class="row h-50"><p class="p-5 w-100">' + texto + '</p></div></div>'
                );
    } else {
        $("#correoEnviado").append(
                '<div class="tab-pane h-75" id="' + user + id + '">' +
                '<div class="container-fluid w-100  h-75">' +
                '<div class="row border-bottom">' +
                '<span class="address-capsule" style="cursor:pointer;margin:-5px 20px 20px 20px;font-weight: 700;color: cornflowerblue;">' +
                '<span>De: ' + origen + '</span></span>'+
                '<span><i class="fa fa-arrow-right" aria-hidden="true"></i></span>'+
                '<span class="address-capsule" style="cursor:pointer;margin:-5px 20px 20px 20px;font-weight: 700;color: cornflowerblue;">' +
                '<span>Para: ' + destino + '</span></span>'+
                '</div>' +
                '<div class="row border-bottom p-3">' +
                '<h3 class="display-5">' + titulo + '</h3></div>' +
                '<div class="row h-50"><p class="p-5 w-100">' + texto + '</p></div></div>'
                );
    }


}


function fill() {
    $.ajax({
        type: "POST",
        url: "api/correo",
        contentType: "application/json"
    }).then((correo) => {
        console.log(correo);
        fillTitulosCorreos(correo);
    }
    , (error) => {
        error.status;
    });

}
function fillTitulosCorreos(correos) {
    $("#listaTitulosCorreos").html("");
    $("#correoContent").html("");
    var i = 0;
    correos.forEach((cor) => {
        fillCorreo(cor, i);
        i = i + 1;
    });
}
function fillCorreo(correo, i) {
    var id = correo.id;
    var titulo = correo.titulo;
    var origen = correo.origen;
    var destino = correo.destino;
    var texto = correo.texto;
    var user = origen.substring(0, origen.indexOf('@'));
    $("#listaTitulosCorreos").append(
            '<div class="custom-control custom-checkbox">' +
            '<input type="checkbox" id="checkbox-' + id + '" class="custom-control-input" value="' + id + '" name="checked[]"/>' +
            '<label class="custom-control-label" for="checkbox-' + id + '"></div>' +
            '<a class=" nav-link btn btn-block  btn border-bottom py-2"  href="#' + user + id + '" data-toggle="tab" style="text-align: start;width: 95%;">' +
            '<span style="display:block;"><b>From: </b>' + origen + '</span></label>' +
            '<i class="far fa-star text-muted"></i>' +
            '<span class="pb-2 mx-3">' + titulo + '</span> ' +
            '</a>'
            );
    if (i === 0) {
        $("#correoContent").append(
                '<div class="tab-pane active  h-75" id="' + user + id + '">' +
                '<div class="container-fluid w-100  h-75">' +
                '<div class="row border-bottom">' +
                '<span class="address-capsule" style="cursor:pointer;margin:-5px 20px 20px 20px;font-weight: 700;color: cornflowerblue;"' +
                'onClick="addTo(\'' + user + '\')">'+origen+'<span class="fa fa-plus-circle" style="color:darkseagreen; margin:0 5px;"></span></span>' +
                '<span><i class="fa fa-arrow-right" aria-hidden="true"></i></span>'+
                '<span class="address-capsule" style="cursor:pointer;margin:-5px 20px 20px 20px;font-weight: 700;color: cornflowerblue;">' +
                '<span>Para: ' + destino + '</span>'+
                '</div>' +
                '<div class="row border-bottom p-3">' +
                '<h3 class="display-5">' + titulo + '</h3></div>' +
                '<div class="row h-50"><p class="p-5 w-100">' + texto + '</p></div></div>'
                );
    } else {
        $("#correoContent").append(
                '<div class="tab-pane h-75" id="' + user + id + '">' +
                '<div class="container-fluid w-100  h-75">' +
                '<div class="row border-bottom">' +
                '<span class="address-capsule" style="cursor:pointer;margin:-5px 20px 20px 20px;font-weight: 700;color: cornflowerblue;"' +
                'onClick="addTo(\'' + user + '\')">'+origen+'<span class="fa fa-plus-circle" style="color:darkseagreen; margin:0 5px;"></span></span>' +
                '<span><i class="fa fa-arrow-right" aria-hidden="true"></i></span>'+
                '<span class="address-capsule" style="cursor:pointer;margin:-5px 20px 20px 20px;font-weight: 700;color: cornflowerblue;">' +
                '<span>Para: ' + destino + '</span>'+
                '</div>' +
                '<div class="row border-bottom p-3">' +
                '<h3 class="display-5">' + titulo + '</h3></div>' +
                '<div class="row h-50"><p class="p-5 w-100">' + texto + '</p></div></div>'
                );
    }


}
function fillBuscar() {
    $("#buscarBoton").click(function () {
        var valor = $("#buscarInput").val();
        $.ajax({
            type: "POST",
            url: "api/correo/buscarPor",
            data: JSON.stringify(valor),
            contentType: "application/json"
        }).then((correo) => {
            console.log(correo);
            buscarPor(correo);
        }
        , (error) => {
            error.status;
        });
    });
}
function buscarPor(correos) {
    $("#listaTitulosCorreos").html("");
    $("#correoContent").html("");
    var i = 0;
    correos.forEach((cor) => {
        fillBusqueda(cor, i);
        i = i + 1;
    });
}
function fillBusqueda(correo, i) {
    var id = correo.id;
    var titulo = correo.titulo;
    var origen = correo.origen;
    var texto = correo.texto;
    var user = origen.substring(0, origen.indexOf('@'));
    $("#listaTitulosCorreos").append(
            '<div class="custom-control custom-checkbox">' +
            '<input type="checkbox" id="checkbox-' + id + '" class="custom-control-input" value="' + id + '" name="checked[]"/>' +
            '<label class="custom-control-label" for="checkbox-' + id + '"></div>' +
            '<a class=" nav-link btn btn-block  btn border-bottom py-2"  href="#' + user + id + '" data-toggle="tab" style="text-align: start;width: 95%;">' +
            '<span style="display:block;"><b>From: </b>' + origen + '</span></label>' +
            '<i class="far fa-star text-muted"></i>' +
            '<span class="pb-2 mx-3">' + titulo + '</span> ' +
            '</a>'
            );
    if (i === 0) {
        $("#correoContent").append(
                '<div class="tab-pane active  h-75" id="' + user + id + '">' +
                '<div class="container-fluid w-100  h-75">' +
                '<div class="row border-bottom">' +
                '<span class="address-capsule" style="cursor:pointer;margin:-5px 20px 20px 20px;font-weight: 700;color: cornflowerblue;"' +
                'onClick="addTo(\'' + user + '\')">' +
                '<span>' + origen + '</span><span class="fa fa-plus-circle" style="color:darkseagreen; margin:0 5px;"></span></span></div>' +
                '<div class="row border-bottom p-3">' +
                '<h3 class="display-5">' + titulo + '</h3></div>' +
                '<div class="row h-50"><p class="p-5 w-100">' + texto + '</p></div></div>'
                );
    } else {
        $("#correoContent").append(
                '<div class="tab-pane h-75" id="' + user + id + '">' +
                '<div class="container-fluid w-100  h-75">' +
                '<div class="row border-bottom">' +
                '<span class="address-capsule" style="cursor:pointer;margin:-5px 20px 20px 20px;font-weight: 700;color: cornflowerblue;"' +
                'onClick="addTo(\'' + user + '\')">' +
                '<span>' + origen + '</span><span class="fa fa-plus-circle" style="color:darkseagreen; margin:0 5px;"></span></span></div>' +
                '<div class="row border-bottom p-3">' +
                '<h3 class="display-5">' + titulo + '</h3></div>' +
                '<div class="row h-50"><p class="p-5 w-100">' + texto + '</p></div></div>'
                );
    }


}

function addTo(origen) {
    var correoAdd = origen + "@gmail.com";
    var co = {
        origen: correoAdd
    };
    console.log(co);
    $.ajax({
        type: "POST",
        url: "api/correo/agregarContacto",
        data: JSON.stringify(co),
        contentType: "application/json"
    }).then(() => {
        $("#agregadoDestino").fadeTo(4000, 300).slideUp(200, function () { 
            $("#agregadoDestino").slideUp(200); 
        });
    }, (error) => {
        alert(errorMessage(error.status));
    });
}
function deleteCorreos() {
    $("#eliminarCorreos").click(function () {
        var Options = $("[id*=checkbox-]");
        console.log(Options);
        var OpSelected = [];
        for (let i = 0; i < Options.length; i++) {
            if (Options[i].checked) {
                OpSelected.push(Options[i].value);
            }
        }
        $.ajax({
            type: "POST",
            url: "api/correo/delete",
            data: JSON.stringify(OpSelected),
            contentType: "application/json"
        }).then(() => {
            fill();
        }, (error) => {
            alert(errorMessage(error.status));
        });

    });
}
function doLogout() {
    $("#logout").click(function () {
        $.ajax({
            type: "POST",
            url: "api/correo/logout",
            contentType: "application/json"
        }).then(() => {
            location.href = "index.html";
        }
        , (error) => {

        });
    });
}
function contactosList() {
    $.ajax({
        type: "POST",
        url: "api/correo/buscarcontactos",
        contentType: "application/json"
    }).then((contacto) => {
        $("#contactosList").html("");
        contacto.forEach((co) => {
            $("#contactosList").append(
                    '<a href="#" class="list-group-item color-verdesito">' + co.origen + '</a>'
                    );
        });
    }, (error) => {
        alert(errorMessage(error.status));
    });

}
function destinatariosOnClick() {
    $("#destinatarios").click(function () {
        $("#contactosDestinatarios").html("");
        $.ajax({
            type: "POST",
            url: "api/correo/buscarcontactos",
            contentType: "application/json"
        }).then((contacto) => {
            $("#contactosDestinatarios").html("");
            contacto.forEach((co) => {
                var user = co.origen.substring(0, co.origen.indexOf('@'));
                $("#contactosDestinatarios").append(
                        '<span data-correo="' + co.origen + '" id="' + user + '" style="cursor:pointer;"' +
                        ' onClick="clickDestino(\'' + co.origen + '\')"">' + co.origen + '</span><br>'
                        );
            });
            $("#contactosDestinatarios").toggle();
        }, (error) => {
            alert(errorMessage(error.status));
        });

    });
}
function clickDestino(origen) {
    $('#contactosDestinatarios').hide();
    var wb = $('#destinatarios').width();
    $('#destinatarios').width(wb - 200);
    var user = origen.substring(0, origen.indexOf('@'));
    $('#destinatarios').before(
            '<span class="badge badge-pill badge-primary"' +
            ' style="position: relative;z-index: 10;top: 6px;height: 25px;padding: 5px;width: 200px;font-size: 15px;" id="seleccionado-' + user + '">' + origen +
            '<span onClick="deleteCorreo(\'' + user + '\')"" id="delete-' + user + '" style="float:right; margin-right:10px;">X</span></span>'
            );
    correosEnviar.push(origen);
}
function deleteCorreo(origen) {
    var Options = $("[id*=delete-]");
    for (let i = 0; i < Options.length; i++) {
        if (Options[i].id === 'delete-' + origen) {
            var op = '#seleccionado-' + origen;
            $(op).hide();
            var wb = $('#destinatarios').width();
            $('#destinatarios').width(wb + 200);
            var elEli = origen + "@gmail.com";
        }
    }
    removeItem(correosEnviar, elEli);
    console.log("Correos Enviar: " + correosEnviar);
}
function enviarCorreo() {
    $("#sendCorreoAction").click(function () {
        if ($('#destinatarios').val() === "") {
            console.log("Input vacio");
        } else {
            correosEnviar.push($('#destinatarios').val());
        }

        console.log(correosEnviar);
        $.ajax({
            type: "POST",
            url: "api/correo/validar",
            data: JSON.stringify(correosEnviar),
            contentType: "application/json"
        }).then(() => {
            var correo;
            console.log(correosEnviar);
            for (var i = 0; i < correosEnviar.length; i++) {
                correo = {
                    destino: correosEnviar[i],
                    texto: $("#textoCorreo").val(),
                    titulo: $("#tituloCorreoMensaje").val()
                };
                console.log(correo);
                $.ajax({
                    type: "POST",
                    url: "api/correo/add",
                    data: JSON.stringify(correo),
                    contentType: "application/json"
                }).then(() => {
                    $("#correoSended").fadeTo(3000, 300).slideUp(200, function () { 
                        $("#correoSended").slideUp(200); 
                    });
                }, (error) => {
                    alert(error.status);
                });
            }
        }, (error) => {
            $("#noexistecorreo").fadeTo(2000, 300).slideUp(200, function () { 
                $("#noexistecorreo").slideUp(200); 
            });
        });

    });
}


function removeItem(arr, item) {
    var i = arr.indexOf(item);
    arr.splice(i, 1);
}
function errorMessage(status) {
    return "Ha ocurrido un error";
}
document.addEventListener("DOMContentLoaded", loaded);