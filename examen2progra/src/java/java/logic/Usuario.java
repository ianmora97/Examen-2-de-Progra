/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package java.logic;

import java.util.Objects;

/**
 *
 * @author ianmo
 */
public class Usuario {
    int id;
    String correo;
    String clave;
    String nombre;
    String apellido;

    public Usuario() {
        this.id = 0;
        this.correo = "";
        this.clave = "";
        this.nombre = "";
        this.apellido = "";
    }

    public Usuario(int id, String correo, String clave, String nombre, String apellido) {
        this.id = id;
        this.correo = correo;
        this.clave = clave;
        this.nombre = nombre;
        this.apellido = apellido;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Usuario other = (Usuario) obj;
        if (!Objects.equals(this.correo, other.correo)) {
            return false;
        }
        if (!Objects.equals(this.clave, other.clave)) {
            return false;
        }
        return true;
    }
    
    
}
