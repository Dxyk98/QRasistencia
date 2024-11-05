import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //private readonly allowedCredentials = [
  //  { email: 'test@duocuc.cl', password: 'test12345' },
  //  { email: 'profesor@profesor.duoc.cl', password: 'test6789' },
  //];
  constructor(private storage: StorageService) {}
  //funcion para traer personas del storage
  //async cargarPersonas() {
  //  try {
  //    const personas = await this.storageService.obtenerDatos('personas');
  //    this.personas = personas || [];
  //    console.log(this.personas); // Verifica que los datos se estén cargando
  //  } catch (error) {
  //    console.error('Error al cargar personas:', error);
  //    this.mostrarMensaje('Error al cargar las personas');
  //  }
  //}

  //metodo para validar ususario
  //validarServicio(email: string, password: string): boolean {
  //  return this.allowedCredentials.some(
  //    (cred) => cred.email === email && cred.password === password
  //  );
  //}

  //autenticar usuario por email y contraseña
  async autenticar(email: string, contraseña: string): Promise<boolean> {
    const personas = await this.storage.obtenerDatos('personas');
    return personas.some(
      (persona: any) =>
        persona.email === email && persona.contrasena === contraseña
    );
  }
}
