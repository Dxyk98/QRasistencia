import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private allowedDomians = ['@duocuc.cl', '@profesor.duoc.cl'];

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  private isAllowedEmail(email: string): boolean {
    return this.allowedDomians.some((domain) => email.endsWith(domain));
  }

  // Método para iniciar sesión
  async autenticar(email: string, password: string): Promise<boolean> {
    if (!this.isAllowedEmail(email)) {
      throw new Error('El dominio del correo electrónico no está permitido.');
    }
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      return true; // Autenticación exitosa
    } catch (error) {
      console.error('Error en la autenticación');
      return false; // Fallo en la autenticación
    }
  }

  async register(email: string, password: string): Promise<string> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      const uid = userCredential.user?.uid;
      if (uid) {
        return uid; // Devuelve el UID del usuario
      } else {
        throw new Error('No se pudo obtener el UID del usuario.');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      console.log('Sesión cerrada');
      this.router.navigate(['/']); // Redirigir al login
    });
  }
}
