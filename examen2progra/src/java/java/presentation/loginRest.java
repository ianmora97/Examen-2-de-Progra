/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package java.presentation;


import java.logic.Model;
import java.logic.Usuario;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author ianmo
 */
@Path("/login")
public class loginRest {
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void login(Usuario u) {
        try {
            Model.instance().findUser(u);
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }

}
