/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package presentation;
import com.google.gson.Gson;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.core.Context;
import logic.*;
/**
 *
 * @author ianmo
 */
@Path("/correo")
public class CorreoRestful {
    @Context
    HttpServletRequest request;
    
    @POST
    @Produces({MediaType.APPLICATION_JSON})
    public ArrayList<Correo> login() {
        
        try {
            return Model.instance().findAllCorreosBy((Usuario)request.getSession().getAttribute("usuario"));
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }
    @POST
    @Path("/buscarPor")
    @Produces({MediaType.APPLICATION_JSON})
    @Consumes({MediaType.APPLICATION_JSON})
    public ArrayList<Correo> buscarBoton(String valor) {
        try {
            Gson gson = new Gson();
            String parametro = gson.fromJson(valor, String.class);
            return Model.instance().buscarCorreosBy((Usuario)request.getSession().getAttribute("usuario"),parametro);
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }
    @POST
    @Path("/enviados")
    @Produces({MediaType.APPLICATION_JSON})
    public ArrayList<Correo> traerEnviados() {
        try {
            return Model.instance().findAllCorreosEnviadosBy((Usuario)request.getSession().getAttribute("usuario"));
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }

    @POST
    @Path("/getuser")
    @Produces({MediaType.APPLICATION_JSON})
    public Usuario getUser() {
        try {
            return (Usuario)request.getSession().getAttribute("usuario");
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }
    @POST
    @Path("/validar")
    @Consumes({MediaType.APPLICATION_JSON})
    public void validarUsuario(ArrayList<String> correos) {
        try {
            for (String correo : correos) {
                Model.instance().validarExistente(correo);
            }
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }
    @POST
    @Path("/delete")
    @Consumes({MediaType.APPLICATION_JSON})
    public void delete(ArrayList<String> correos) {
        try {
            for (String correo : correos) {
                Model.instance().deleteCorreos(correo);
            }
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }
    @POST
    @Path("/buscarcontactos")
    @Produces({MediaType.APPLICATION_JSON})
    public ArrayList<Contacto> buscarContacto() {
        try {
            return Model.instance().findAllCorreosByDestinatario((Usuario)request.getSession().getAttribute("usuario"));
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }
    
    @POST
    @Path("/add")
    @Consumes({MediaType.APPLICATION_JSON})
    public void add(Correo c) {
        try {
            Usuario u = (Usuario)request.getSession().getAttribute("usuario");
            c.setOrigen(u.getCorreo());
            Model.instance().enviarCorreo(c);
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }
    
    @POST
    @Path("/logout")
    public void logout() {
        try {
            request.getSession(true).removeAttribute("usuario");
            request.getSession(true).removeAttribute("usuario");
            request.getSession(true).invalidate();
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }

    @POST
    @Path("/agregarContacto")
    @Consumes({MediaType.APPLICATION_JSON})
    public void addContacto(Contacto c) {
        try {
            Usuario u = (Usuario)request.getSession().getAttribute("usuario");
            c.setDestino(u.getCorreo());
            Model.instance().agregarContacto(c);
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }
}
