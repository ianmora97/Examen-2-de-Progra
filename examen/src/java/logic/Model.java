/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package logic;

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
    ArrayList<Correo> correos = new ArrayList<>();
    ArrayList<Contacto> contactos = new ArrayList<>();
    
    public Model() {
        
        usuarios.add(new Usuario(0, "ianmorar03@gmail.com", "123", "Ian", "Mora"));
        usuarios.add(new Usuario(1, "ecruz@gmail.com", "123", "Edso", "Cruz"));
        usuarios.add(new Usuario(2, "david@gmail.com", "123", "David", "Aguilar"));
        usuarios.add(new Usuario(3, "kevin@gmail.com", "123", "Kevin", "Artavia"));
        usuarios.add(new Usuario(4, "fernanda@gmail.com", "123", "Maria Fernanda", "Gonzales"));
        
        correos.add(new Correo("ianmorar03@gmail.com", "david@gmail.com", 0, "Hola David como esta", "Saludo David"));
        correos.add(new Correo("ianmorar03@gmail.com", "ecruz@gmail.com", 1, "Hola Edso como esta", "Saludo Edso"));
        correos.add(new Correo("david@gmail.com", "ianmorar03@gmail.com", 2, "Hola Ian como esta 1", "Saludo Ian from David"));
        correos.add(new Correo("ecruz@gmail.com", "ianmorar03@gmail.com", 3, "Hola Ian como esta 2", "Saludo Ian from Edso"));
        correos.add(new Correo("david@gmail.com", "ianmorar03@gmail.com", 4, "Hola Ian como esta 3", "Saludo Ian from David"));
        correos.add(new Correo("kevin@gmail.com", "fernanda@gmail.com", 5, "Hola Fer como esta", "Saludo Fer"));
        correos.add(new Correo("fernanda@gmail.com", "kevin@gmail.com", 6, "Hola Kevin como esta", "Saludo Kevin"));
        
        contactos.add(new Contacto("ianmorar03@gmail.com", "david@gmail.com"));
        contactos.add(new Contacto("ianmorar03@gmail.com", "ecruz@gmail.com"));
        contactos.add(new Contacto("david@gmail.com", "ianmorar03@gmail.com"));
        contactos.add(new Contacto("ecruz@gmail.com", "ianmorar03@gmail.com"));
    }
    
    public Usuario findUser(Usuario u){
        try {
            for (Usuario usuario : usuarios) {
                if(usuario.equals(u)){
                    userSession = usuario;
                    return usuario;
                }
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }
    public Correo findCorreo(Correo c){
        try {
            for (Correo correo : correos) {
                if(correo.equals(c)){
                    return correo;
                }
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }
    public void deleteCorreos(String c){
        try {
            for (Correo correo : correos) {
                if(correo.id == Integer.parseInt(c)){
                    correos.remove(correo);
                }
            }
        } catch (Exception e) {
        }
    }
    public void enviarCorreo(Correo correo){
        try {
            correo.setId(correos.size());
            if(correos.add(correo)){
                System.out.println("ak7");
            }
        } catch (Exception e) {
        }
    }
    public ArrayList<Correo> findAllCorreosBy(Usuario u){
        ArrayList<Correo> r = new ArrayList<>();
        try {
            for (Correo correo : correos) {
                if(correo.getDestino().equals(u.correo)){
                    r.add(correo);
                }
            }
            return r;
        } catch (Exception e) {
            return null;
        }
    }
    public ArrayList<Correo> findAllCorreosEnviadosBy(Usuario u){
        ArrayList<Correo> r = new ArrayList<>();
        try {
            for (Correo correo : correos) {
                if(correo.getOrigen().equals(u.correo)){
                    r.add(correo);
                }
            }
            return r;
        } catch (Exception e) {
            return null;
        }
    }
    public ArrayList<Contacto> findAllCorreosByDestinatario(Usuario u){
        ArrayList<Contacto> r = new ArrayList<>();
        try {
            for (Contacto contacto : contactos) {
                if(contacto.getDestino().equals(u.correo)){
                    r.add(contacto);
                }
            }
            return r;
        } catch (Exception e) {
            return null;
        }
    }
    public ArrayList<Correo> buscarCorreosBy(Usuario u, String v){
        ArrayList<Correo> r = new ArrayList<>();
        try {
            if(v.equals("")){
                return findAllCorreosBy(u);
            }
            for (Correo correo : correos) {
                if(correo.getDestino().equals(u.correo)){
                    if(correo.getOrigen().equals(v) || correo.getTitulo().equals(v)){
                        r.add(correo);
                    }
                }
            }
            return r;
        } catch (Exception e) {
            return null;
        }
    }
    public void agregarContacto(Contacto c){
        try {
            if(contactos.add(c)){
                System.out.print("ak7");
            }
        } catch (Exception e) {
            System.out.print(e.getMessage());
        }
    }

    public void validarExistente(String u) throws Exception{
        boolean bandera = false;
        for (Usuario usuario : usuarios) {
            if(usuario.getCorreo().equals(u)){
                bandera = true;
            }
        }
        if(!bandera){
            throw new Exception("Usuario No Existe!");
        }
    }
}
