import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {
  constructor(
    private storage: StorageService,
    private toastController: ToastController
  ) {}
  clases: Clase[] = [];

  async ngOnInit() {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
    await this.storage.init(); //se llama al servicio publico
    this.cargarClases();
  }

  isMobile: boolean = true;
  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  //metodo para cargar las clases
  async cargarClases() {
    try {
      const clases = await this.storage.obtenerClases();
      this.clases = clases || [];
      console.log(this.clases);
    } catch (error) {
      console.error('Error al cargar clases', error);
      this.mostrarMensaje('Error al cargar las clases');
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
