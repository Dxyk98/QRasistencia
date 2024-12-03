import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private firestore: AngularFirestore) {}

  async saveUserData(uid: string, userData: any): Promise<void> {
    try {
      await this.firestore.collection('Users').doc(uid).set(userData);
      console.log('Datos del usuario guardados correctamente.');
    } catch (error) {
      console.error('Error al guardar datos en Firestore:', error);
      throw error;
    }
  }

  getUserData(uid: string) {
    return this.firestore.collection('Users').doc(uid).valueChanges();
  }
}
