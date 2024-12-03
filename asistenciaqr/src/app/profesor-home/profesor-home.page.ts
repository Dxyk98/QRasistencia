import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
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
    private toastController: ToastController,
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
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
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
