import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {
  constructor(private toastController: ToastController) {}
  clases: Clase[] = [];

  async ngOnInit() {
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
