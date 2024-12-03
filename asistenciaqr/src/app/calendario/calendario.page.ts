import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  constructor(private toastController: ToastController) {}
  asistencia: Asistencia[] = [];

  async ngOnInit() {
    //se llama al servicio publico
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
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
}

//interface asistencia
interface Asistencia {
  idAsistencia: string;
  idClase: string;
  nombreUsuario: string;
  horaAsistencia: string;
}
