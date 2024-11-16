import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';
import { UserService } from '../user.service';

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

  constructor(
    private storageService: StorageService,
    private toastController: ToastController,
    private userService: UserService
  ) {}

  async ngOnInit() {
    await this.storageService.init(); //se llama al servicio publico
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
    this.cargarClases();
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
