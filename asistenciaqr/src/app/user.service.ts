import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly allowedCredentials = [
    { email: 'test@duocuc.cl', password: 'test12345' },
    { email: 'profesor@profesor.duoc.cl', password: 'test6789' },
  ];
  constructor() {}
  //metodo para validar ususario
  validarServicio(email: string, password: string): boolean {
    return this.allowedCredentials.some(
      (cred) => cred.email === email && cred.password === password
    );
  }
}
