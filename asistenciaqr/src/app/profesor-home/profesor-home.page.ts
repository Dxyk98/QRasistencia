import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';

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

  constructor(
    private storageService: StorageService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.storageService.init(); //se llama al servicio publico
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
    this.cargarClases();
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  async cargarClases() {
    try {
      this.clases = await this.storageService.obtenerCalses();
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

  async generarQrParaClase() {
    const clasesHoy: Clase[] = await this.storageService.obtenerCalses();

    const diaActual = new Date().getDay();
    const diasSemana = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ];
    const nombreDiaActual = diasSemana[diaActual];

    // Buscar la clase para el día actual
    const claseHoy = clasesHoy.find((c) => c.dias === nombreDiaActual);

    if (claseHoy) {
      // Generar el QR para la clase encontrada
      this.qrData = JSON.stringify({
        id: claseHoy.id,
        nombre: claseHoy.nombre,
        diaSemana: nombreDiaActual,
      });
      this.createdCode = this.qrData;
      this.claseHoy = claseHoy; // Asigna la clase a `claseHoy` para mostrar en la interfaz
    } else {
      console.log('No hay clase programada para hoy');
    }
  }
}
