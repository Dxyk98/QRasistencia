import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StoreService } from '../store.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  constructor(
    private toastController: ToastController,
    private auth: AuthenticationService,
    private store: StoreService
  ) {}
  asistencia: any[] = [];
  usuario: any = { nombre: '', carrera: '' };

  async ngOnInit() {
    //se llama al servicio publico
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
    this.auth.getCurrentUser().subscribe((user) => {
      if (user) {
        this.store.getUserData(user.uid).subscribe((userData: any) => {
          this.usuario.nombre = userData?.nombre || 'Usuario'; // Asigna el nombre o un valor por defecto
          this.usuario.carrera = userData?.carrera || 'Carrera';
        });
      } else {
        this.usuario.nombre = 'Invitado';
      }
    });
    this.store.getAllAsistens().subscribe(
      (asistencias: any[]) => {
        this.asistencia = asistencias; // Guardar los datos obtenidos
        console.log('Asistencias obtenidas:', this.asistencia);
      },
      (error) => {
        console.error('Error al obtener las asistencias:', error);
      }
    );
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
