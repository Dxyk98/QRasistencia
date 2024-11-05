import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  datos: any[] = [];
  dato: any = {};
  private storage: Storage | null = null;

  constructor(private storageInstance: Storage) {
    this.init();
  }

  async init() {
    this.storage = await this.storageInstance.create();
  }

  //función para obtener datos de la persona seleccionada.
  async obtenerDato(key: string, identificador: string) {
    this.datos = (await this.storage?.get(key)) || [];
    this.dato = this.datos.find(
      (valor) => valor.identificador === identificador
    );
    return this.dato;
  }

  //se guardan los datos de la persona y se crea json para poder guardarlo en el storage
  async agregar(key: string, jsonAgregar: any) {
    this.datos = (await this.storage?.get(key)) || [];
    const exist = await this.obtenerDato(key, jsonAgregar.identificador);

    if (!exist) {
      this.datos.push(jsonAgregar);
      await this.storage?.set(key, this.datos);
      return true;
    }

    return false;
  }

  async obtenerDatos(key: string) {
    if (!this.storage) {
      throw new Error('Storage no está inicializado');
    }
    this.datos = (await this.storage.get(key)) || [];
    return this.datos;
  }

  async eliminar(key: string, identificador: string) {
    this.datos = (await this.storage?.get(key)) || [];
    this.datos = this.datos.filter(
      (valor) => valor.identificador !== identificador
    );
    await this.storage?.set(key, this.datos);
  }
}
