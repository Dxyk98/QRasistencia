import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profesor-home',
  templateUrl: './profesor-home.page.html',
  styleUrls: ['./profesor-home.page.scss'],
})
export class ProfesorHomePage implements OnInit {
  isMobile: boolean = false;
  clases: Clase[] = [];
  qrData: string = '';
  createdCode: string = '';
  claseHoy: any; // Propiedad para almacenar la clase de hoy
  usuario: any; // Store user data here
  selectedProfesorId: string = ''; // Store the selected professor ID
  claseForm: FormGroup;
  personaSeleccionada: Persona | null = null;
  personas: Persona[] = [];
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
    private storageService: StorageService,
    private toastController: ToastController,
    private userService: UserService,
    private formBuilder: FormBuilder
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

  async ngOnInit() {
    await this.storageService.init(); //se llama al servicio publico
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
    this.cargarClases();
    this.cargarPersonas();
    this.usuario = await this.userService.obtenerUsuario(); // Fetch logged-in user
    this.selectedProfesorId = this.usuario.id; // Assign the professor's ID
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  setQData(clase: Clase) {
    this.qrData = clase.id; // Set the selected class's ID as QR data
    this.generateQrCode(); // Generate the QR code based on the selected class's ID
    this.setOpen(true); // Open the modal
  }

  generateQrCode() {
    if (this.qrData) {
      this.createdCode = this.qrData; // Generate the QR code with the QR data
    } else {
      console.error('QR data is not set. Please select a class.');
    }
  }

  //Modal crear clase
  isCrearModalOpen = false;
  setOpenCrear(isOpen: boolean) {
    this.isCrearModalOpen = isOpen;
  }

  // Modal QR
  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async cargarClases() {
    try {
      this.clases = await this.storageService.obtenerClases();
      console.log('Clases cargadas:', this.clases);
    } catch (error) {
      console.error('Error al cargar clases:', error);
      await this.mostrarMensaje('Error al cargar las clases');
    }
  }

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

  async cargarPersonas() {
    try {
      this.personas = await this.storageService.obtenerDatos('personas');
      console.log(this.personas);
    } catch (error) {
      console.error('Error al cargar personas', error);
      this.mostrarMensaje('Error al cargar personas');
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

interface Clase {
  id: string;
  nombre: string;
  carreraClase: string;
  horaInicio: string;
  horaTermino: string;
  diurnoVespertino: string;
  dias: string;
  profesor: {
    id: string;
    nombre: string;
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
