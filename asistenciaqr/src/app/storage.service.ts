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
    this.init(); //inicializa el almacenamiento
  } //fin de contructor

  async init() {
    const storage = await this.storageInstance.create();
    if (!this.storage) {
      this.storage = await this.storageInstance.create();
    }
  }

  async obtenerDato(key: string, identificador: string) {
    this.datos = (await this.storage?.get(key)) || [];
    this.dato = this.datos.find(
      (valor) => valor.identificador == identificador
    );
    return this.dato;
  }

  async agregar(key: string, jsonAgregar: any) {
    this.dato = (await this.storage?.get(key)) || [];
    let exist = await this.obtenerDato(key, jsonAgregar.identificador);

    if (exist == undefined) {
      this.datos.push(jsonAgregar);
      await this.storage?.set(key, this.datos);
      return true;
    }

    return false;
  }

  async obtenerDatos(key: string) {
    if (!this.storage) {
      throw new Error('Storage no esta inicializado');
    }
    this.datos = (await this.storage.get(key)) || [];
    return this.dato;
  }

  async eliminar(key: string, identificador: string) {
    this.datos = (await this.storage?.get(key)) || [];
    this.datos.forEach((valor, indice) => {
      if (valor.identificador == identificador) {
        this.datos.splice(indice, 1);
      }
    });
    await this.storage?.set(key, this.datos);
  }
}
