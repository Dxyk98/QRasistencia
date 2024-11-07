import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';

//interface persona con atributos
interface Persona {
  identificador: string;
  nombre: string;
  apellido: string;
  carrera: string;
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

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {
  //se crea usuario de administrador para poder administrar los usuarios, clases y asistencias.
  personaForm: FormGroup; //formulario para agregar persona
  claseForm: FormGroup; //formulario para agregar clase
  personas: Persona[] = [];
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
    this.claseForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required],
      diurnoVespertino: ['', Validators.required],
      dias: ['', Validators.required],
      profesor: ['', Validators.required],
    });
  }

  async ngOnInit() {
    await this.storageService.init(); //se llama al servicio publico
    this.cargarPersonas(); //se cargan los datos en la pagina
    this.cargarClases();
  }

  async cargarPersonas() {
    try {
      this.personas = await this.storageService.obtenerDatos('personas');
      console.log(this.personas);
    } catch (error) {
      console.error('Error al cargar personas:', error);
      this.mostrarMensaje('Error al cargar las personas');
    }
  }

  //función para guardar a una persona (debería de ser un alumno, pero preferimos hacerlo con personas)
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

  //metodo para cargar persona
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

  //metodo para eliminar persona
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

  //mensaje de alerta para ver si esta todo correcto
  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }

  //metodo para cargar las clases
  async cargarClases() {
    try {
      const clases = await this.storageService.obtenerClases();
      this.clases = clases || [];
      console.log(this.clases);
    } catch (error) {
      console.error('Error al cargar clases', error);
      this.mostrarMensaje('Error al cargar las clases');
    }
  }

  //funcion para guardar clase
  async guardarClase() {
    if (this.claseForm.valid) {
      const clase = this.claseForm.value;
      try {
        const nuevaClase = await this.storageService.agregarClase(clase);
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

  //funcion para eliminar clase
  async eliminarClase(id: string) {
    try {
      await this.storageService.eliminarClase(id);
      this.mostrarMensaje('Clase eliminada con éxito');
      this.cargarClases();
    } catch (error) {
      this.mostrarMensaje('Error al eliminar la clase');
      console.error(error);
    }
  }

  editar(email: string) {
    const personaSeleccionada = this.personas.find(
      (persona) => persona.email === email
    );
    if (personaSeleccionada) {
      this.personaForm.patchValue({
        nombre: personaSeleccionada.nombre,
        apellido: personaSeleccionada.apellido,
        carrera: personaSeleccionada.carrera,
        email: personaSeleccionada.email,
        contrasena: personaSeleccionada.contrasena,
      });
    }
  }

  // Ejemplo de función para guardar (puedes adaptarla si es necesario)
  // Ejemplo de función para guardar (adaptada para actualizar si ya existe)
  guardarCambios() {
    const persona = this.personaForm.value;
    // Buscar si la persona ya existe en el array `personas`
    const index = this.personas.findIndex((p) => p.email === persona.email);
    if (index !== -1) {
      // Si la persona existe, actualiza sus datos
      this.personas[index] = persona;
    } else {
      // Si la persona no existe, agrégala al array
      this.personas.push(persona);
    }
    // Guardar cambios en el servicio para persistencia
    this.storageService.guardarCambios(persona);
    // Resetear el formulario
    this.personaForm.reset();
  }
}
