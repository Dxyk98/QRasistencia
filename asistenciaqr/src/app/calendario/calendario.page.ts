import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  constructor(
    private storage: StorageService,
    private toastController: ToastController
  ) {}
  asistencia: Asistencia[] = [];

  async ngOnInit() {
    await this.storage.init(); //se llama al servicio publico
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
    this.cargarAsistencia();
  }

  isMobile: boolean = true;
  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  //mensaje de alerta para ver si esta todo correcto
  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }

  async cargarAsistencia() {
    try {
      const asistencia = await this.storage.obtenerAsistencias();
      this.asistencia = asistencia || [];
      console.log(this.asistencia);
    } catch (error) {
      console.error('Error al cargar clases', error);
      this.mostrarMensaje('Error al cargar las clases');
    }
  }
}

//interface asistencia
interface Asistencia {
  idAsistencia: string;
  idClase: string;
  nombreUsuario: string;
  horaAsistencia: string;
}
