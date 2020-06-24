/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package presentation;

/**
 *
 * @author david
 */
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.core.Context;
import logic.Model;
import logic.Usuario;

@Path("/login")
public class login {
    @Context
    HttpServletRequest request;
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Usuario login(Usuario usuario) {
        try {
            Usuario base = Model.instance().findUser(usuario);
            if (base != null) {
                request.getSession(true).setAttribute("usuario", base);
            }
            return base;
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }

}
