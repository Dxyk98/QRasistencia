import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.page.html',
  styleUrls: ['./crear-clase.page.scss'],
})
export class CrearClasePage implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private storage: StorageService,
    private toast: ToastController
  ) {
    this.claseForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      carreraClase: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required],
      diurnoVespertino: ['', Validators.required],
      dias: ['', Validators.required],
      profesor: ['', Validators.required],
    });
  }

  personas: Persona[] = [];
  claseForm: FormGroup;
  clases: Clase[] = [];
  personaSeleccionada: Persona | null = null;
  carreras: string[] = [
    'Ingeniería Informatica',
    'Tecnico Informatico',
    'Medicina',
    'Derecho',
    'Arquitectura',
    'Administración',
  ];
  horario: string[] = ['Diurno', 'Vespertino'];
  diaSemana: string[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];

  async ngOnInit() {
    await this.storage.init();
    this.cargarClases();
  }

  async cargarClases() {
    try {
      const clases = await this.storage.obtenerClases();
      this.clases = clases || [];
      console.log(this.clases);
    } catch (error) {
      console.error('error al cargar las clases', error);
      this.mostrarMensaje('Error al cargar clases');
    }
  }

  async guardarClase() {
    if (this.claseForm.valid) {
      const clase = this.claseForm.value;
      try {
        const nuevaClase = await this.storage.agregarClase(clase);
        this.mostrarMensaje(`Clase guardada con éxito. ID: ${nuevaClase.id}`);
        this.claseForm.reset();
        this.cargarClases();
      } catch (error) {
        this.mostrarMensaje('Error al guardar la clase');
        console.error(error);
      }
    } else {
      this.mostrarMensaje('Por favor, complete todos los campos correctamente');
    }
  }

  //mesajes
  async mostrarMensaje(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }

  //funcion para eliminar clase
  async eliminarClase(id: string) {
    try {
      await this.storage.eliminarClase(id);
      this.mostrarMensaje('Clase eliminada con éxito');
      this.cargarClases();
    } catch (error) {
      this.mostrarMensaje('Error al eliminar la clase');
      console.error(error);
    }
  }
}

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
