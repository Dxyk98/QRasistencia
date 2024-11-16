import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})
export class CrearCuentaPage implements OnInit {
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
    private storage: StorageService,
    private toast: ToastController
  ) {
    this.personaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      carrera: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@(duocuc.cl|profesor.duoc.cl)$'
          ),
        ],
      ],
      contrasena: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  async ngOnInit() {
    await this.storage.init();
  }

  async cargarPersonas() {
    try {
      this.personas = await this.storage.obtenerDatos('personas');
      console.log(this.personas);
    } catch (error) {
      console.error('Error al cargar personas', error);
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
        const result = await this.storage.agregar('personas', persona);
        if (result) {
          this.mostrarMensaje('Cuenta Creada con éxito');
          this.personaForm.reset();
          this.cargarPersonas();
        } else {
          this.mostrarMensaje('Error la cuenta ya existe');
        }
      } catch (error) {}
    }
  }

  //mensaje de alerta para ver si esta todo correcto
  async mostrarMensaje(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }
}

interface Persona {
  identificador: string;
  nombre: string;
  apellido: string;
  carrera: string;
  email: string;
  contrasena: string;
}
