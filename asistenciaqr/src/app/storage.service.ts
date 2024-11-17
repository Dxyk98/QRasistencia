import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  datos: any[] = [];
  dato: any = {};
  clases: Clase[] = [];
  asistencias: Asistencia[] = [];
  private storage: Storage | null = null;

  constructor(private storageInstance: Storage) {
    this.init();
  }

  async init() {
    this.storage = await this.storageInstance.create();
  }

  //función para obtener datos de la persona seleccionada.
  async obtenerDato(
    key: string,
    identificador: string
  ): Promise<Persona | null> {
    if (!this.storage) {
      throw new Error('Storage no está inicializado');
    }
    const datos = (await this.storage.get(key)) || [];
    return (
      datos.find((valor: Persona) => valor.identificador === identificador) ||
      null
    );
  }

  //se guardan los datos de la persona y se crea json para poder guardarlo en el storage
  async agregar(key: string, persona: Persona): Promise<boolean> {
    if (!this.storage) {
      throw new Error('Storage no está inicializado');
    }
    const datos = (await this.storage.get(key)) || [];
    const exist = datos.some(
      (p: Persona) => p.identificador === persona.identificador
    );

    if (!exist) {
      datos.push(persona);
      await this.storage.set(key, datos);
      return true;
    }

    return false;
  }

  // Método para obtener todas las personas
  async obtenerDatos(key: string): Promise<Persona[]> {
    if (!this.storage) {
      throw new Error('Storage no está inicializado');
    }
    return (await this.storage.get(key)) || [];
  }

  //se elimina persona con datos
  async eliminar(key: string, identificador: string): Promise<void> {
    if (!this.storage) {
      throw new Error('Storage no está inicializado');
    }
    const datos = (await this.storage.get(key)) || [];
    const nuevosDatos = datos.filter(
      (valor: Persona) => valor.identificador !== identificador
    );
    await this.storage.set(key, nuevosDatos);
  }

  //metodo para agregar clase
  async agregarClase(clase: Clase) {
    this.clases = (await this.storage?.get('clases')) || [];
    const nuevaClase: Clase = {
      ...clase,
      id: this.generarId(),
    };

    this.clases.push(nuevaClase);
    await this.storage?.set('clases', this.clases);
    return nuevaClase;
  }

  //función para crear id
  private generarId(): string {
    const ahora = new Date();
    return ahora.toISOString().replace(/[^0-9]/g, '');
  }

  //metodo para obtener todas las clases
  async obtenerClases() {
    if (!this.storage) {
      throw new Error('Storage no esta inicializado');
    }
    this.clases = (await this.storage.get('clases')) || [];
    return this.clases;
  }

  // Método corregido para eliminar una clase
  async eliminarClase(id: string) {
    this.clases = (await this.storage?.get('clases')) || [];
    this.clases = this.clases.filter((c) => c.id !== id);
    await this.storage?.set('clases', this.clases);
  }

  guardarCambios(personaActualizada: any) {
    const index = this.datos.findIndex(
      (p) => p.email === personaActualizada.email
    );
    if (index !== -1) {
      // Si la persona existe, actualizamos sus datos
      this.datos[index] = personaActualizada;
    } else {
      // Si la persona no existe, la agregamos
      this.datos.push(personaActualizada);
    }
  }

  //metodo para agregar asistencia a localstorage
  async agregarAsistencia(asis: Asistencia) {
    this.asistencias = (await this.storage?.get('asistencias')) || [];
    const nuevaAsis: Asistencia = {
      ...asis,
      idAsistencia: this.generarId(),
    };

    this.asistencias.push(nuevaAsis);
    await this.storage?.set('asistencias', this.asistencias);
    return nuevaAsis;
  }

  // Método para obtener todas las asistencias
  async obtenerAsistencias(): Promise<Asistencia[]> {
    if (!this.storage) {
      throw new Error('Storage no está inicializado');
    }
    return (await this.storage.get('asistencias')) || [];
  }
}

//interface persona
interface Persona {
  identificador: string;
  nombre: string;
  apellido: string;
  carrera: string;
  tipoPersona: string;
  email: string;
  contrasena: string;
}
//interface clase
interface Clase {
  id: string;
  nombre: string;
  carreraClase: string;
  horaInicio: string;
  horaTermino: string;
  diurnoVespertino: string;
  dias: string;
  profesor: {
    id: '';
    nombre: '';
  };
}
//interface asistencia
interface Asistencia {
  idAsistencia: string;
  idClase: string;
  nombreUsuario: string;
  horaAsistencia: string;
}
