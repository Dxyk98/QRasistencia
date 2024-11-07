import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

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
  selector: 'app-profesor-home',
  templateUrl: './profesor-home.page.html',
  styleUrls: ['./profesor-home.page.scss'],
})
export class ProfesorHomePage implements OnInit {
  isMobile: boolean = false;
  isQrOpen: boolean = false;
  qrData: string = '';
  createdCode: string = '';

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
    this.generarQrParaClase;
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  setQrOpen(isOpen: boolean) {
    this.isQrOpen = isOpen;
  }

  claseHoy: any;
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
