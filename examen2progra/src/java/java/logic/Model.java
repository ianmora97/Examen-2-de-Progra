/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package java.logic;

import java.util.ArrayList;

/**
 *
 * @author ianmo
 */
public class Model {
    private static Model uniqueInstance;

    public static Model instance() {
        if (uniqueInstance == null) {
            uniqueInstance = new Model();
        }
        return uniqueInstance;
    }
    Usuario userSession = null;
    ArrayList<Usuario> usuarios = new ArrayList<>();

    public Model() {
        usuarios.add(new Usuario(0, "ianmorar03@gmail.com", "123", "Ian", "Mora"));
        usuarios.add(new Usuario(0, "ecruz@gmail.com", "123", "Edso", "Cruz"));
        usuarios.add(new Usuario(0, "david@gmail.com", "123", "David", "Aguilar"));
        usuarios.add(new Usuario(0, "kevin@hotmail.com", "123", "Kevin", "Artavia"));
        usuarios.add(new Usuario(0, "fernanda@hotmail.com", "123", "Maria Fernanda", "Gonzales"));
    }
    
    public void findUser(Usuario u){
        try {
            for (Usuario usuario : usuarios) {
                if(usuario.equals(u)){
                    userSession = usuario;                    
                }
            }
        } catch (Exception e) {
        }
    }
}
