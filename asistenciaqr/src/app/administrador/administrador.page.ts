import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';

interface Persona {
  identificador: string;
  nombre: string;
  apellido: string;
  carrera: string;
  email: string;
  contrasena: string;
}

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {
  personaForm: FormGroup;
  personas: Persona[] = [];
  carreras: string[] = [
    'Ingeniería Informatica',
    'Tecnico Informatico',
    'Medicina',
    'Derecho',
    'Arquitectura',
    'Administración',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private toastController: ToastController
  ) {
    this.personaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      carrera: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async ngOnInit() {
    await this.storageService.init(); // Asegúrate de que `init` sea pública en el servicio si necesitas llamarla aquí
    this.cargarPersonas();
  }

  async cargarPersonas() {
    try {
      const personas = await this.storageService.obtenerDatos('personas');
      this.personas = personas || [];
      console.log(this.personas); // Verifica que los datos se estén cargando
    } catch (error) {
      console.error('Error al cargar personas:', error);
      this.mostrarMensaje('Error al cargar las personas');
    }
  }

  async guardarPersona() {
    if (this.personaForm.valid) {
      const persona: Persona = {
        identificador: this.personaForm.value.email,
        ...this.personaForm.value,
      };

      try {
        const resultado = await this.storageService.agregar(
          'personas',
          persona
        );
        if (resultado) {
          this.mostrarMensaje('Persona guardada con éxito');
          this.personaForm.reset();
          this.cargarPersonas();
        } else {
          this.mostrarMensaje('Error: La persona ya existe');
        }
      } catch (error) {
        this.mostrarMensaje('Error al guardar la persona');
        console.error(error);
      }
    } else {
      this.mostrarMensaje('Por favor, complete todos los campos correctamente');
    }
  }

  async obtenerPersona(email: string) {
    try {
      const persona = await this.storageService.obtenerDato('personas', email);
      if (persona) {
        this.mostrarMensaje('Persona encontrada');
        console.log(persona);
      } else {
        this.mostrarMensaje('Persona no encontrada');
      }
    } catch (error) {
      this.mostrarMensaje('Error al buscar la persona');
      console.error(error);
    }
  }

  async eliminarPersona(email: string) {
    try {
      await this.storageService.eliminar('personas', email);
      this.mostrarMensaje('Persona eliminada con éxito');
      this.cargarPersonas();
    } catch (error) {
      this.mostrarMensaje('Error al eliminar la persona');
      console.error(error);
    }
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }
}
