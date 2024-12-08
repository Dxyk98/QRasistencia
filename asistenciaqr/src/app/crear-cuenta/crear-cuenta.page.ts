import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { StoreService } from '../store.service';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-crear-cuenta',
    templateUrl: './crear-cuenta.page.html',
    styleUrls: ['./crear-cuenta.page.scss'],
    standalone: false
})
export class CrearCuentaPage implements OnInit {
  personaForm: FormGroup;
  carreras: string[] = [
    'Ingeniería Informatica',
    'Tecnico Informatico',
    'Medicina',
    'Derecho',
    'Arquitectura',
    'Administración',
  ];
  tipo: string[] = ['Alumno', 'Profesor'];
  horario: string[] = ['Diurno', 'Vespertino'];
  mostrarHorario = false;
  placeholderCorreo = 'correo@duocuc.cl | correo@profesor.duoc.cl';

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastController,
    private auth: AuthenticationService,
    private store: StoreService,
    private route: Router
  ) {
    this.personaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      carrera: ['', [Validators.required]],
      horario: ['', [Validators.required]],
      tipoPersona: ['', [Validators.required]],
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

  ngOnInit() {}

  async guardarPersona() {
    if (this.personaForm.valid) {
      const { email, contrasena, ...additionalData } = this.personaForm.value;

      try {
        // Paso 1: Registrar al usuario en Firebase Authentication
        const uid = await this.auth.register(email, contrasena);

        const dataWithUid = { ...additionalData, uid };
        // Paso 2: Guardar los datos adicionales en Firestore
        await this.store.saveUserData(uid, dataWithUid);
        // Mostrar mensaje de éxito
        this.mostrarMensaje('Cuenta creada exitosamente.');
        setTimeout(() => {
          this.route.navigate(['/']); // Ruta raíz
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.mostrarMensaje('Por favor complete todos los campos correctamente.');
    }
  }

  onTipoPersonaChange(event: any) {
    const tipoPersona = event.detail.value;
    if (tipoPersona === 'Alumno') {
      this.mostrarHorario = true;
      this.placeholderCorreo = 'correo@duocuc.cl';
      this.personaForm.get('horario')?.setValidators(Validators.required);
    } else if (tipoPersona === 'Profesor') {
      this.mostrarHorario = false;
      this.placeholderCorreo = 'correo@profesor.duoc.cl';
      this.personaForm.get('horario')?.clearValidators();
    }
    this.personaForm.get('horario')?.updateValueAndValidity();
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
