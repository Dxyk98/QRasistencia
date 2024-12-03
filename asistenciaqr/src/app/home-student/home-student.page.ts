import { Component, OnInit } from '@angular/core';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
})
export class HomeStudentPage implements OnInit {
  private html5QrCode: Html5QrcodeScanner | null = null;
  scannerResult: string | null = null; //string de escaner de QR
  isCameraPermission: boolean = false;
  usuario: { nombre: string; carrera: string } = { nombre: '', carrera: '' };
  clases: Clase[] = [];
  asistencia: Asistencia[] = [];

  constructor(private toastController: ToastController) {}

  //se determinan las pantallas
  async ngOnInit() {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  isMobile: boolean = true;
  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  //funciones para abrir modales.
  isModalScanner: boolean = false; //modal de scanner de clases
  setScannerOpen(isOpen: boolean) {
    this.isModalScanner = isOpen;
  }

  isModalCredential: boolean = false; //Boolean para abrir y cerrar modal de credencial
  setCredentialOpen(isOpen: boolean) {
    this.isModalCredential = isOpen;
  }

  isModalSettings: boolean = false; //modal de configuraciones o ajustes
  setSettingsOpen(isOpen: boolean) {
    this.isModalSettings = isOpen;
  }

  //funcion que pide autorizar la camara del dispositivo para poder escanear el codigo
  requestPermission() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.isCameraPermission = true; //Si se otrogan permisos, establece isCameraPermission en true
          this.startScanner();
        })
        .catch((error) => {
          alert('Error al solicitar permisos de cámara');
        });
    } else {
      alert('Navegador no soporta el acceso a cámara');
    }
  }

  //funcion que escanea el QR
  startScanner() {
    const config = {
      fps: 10,
      qrbox: 250,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };
    this.html5QrCode = new Html5QrcodeScanner('reader', config, true); //Se inicializa el escaner con el ID reader y la configuración determinada. El tercer parámetro 'true' es para habilitar la desactivacion de forma automatica
    this.html5QrCode.render(
      async (result) => {
        this.scannerResult = result;
        console.log('resultado del scanner', result); //callback de exito, al escanear el código QR exitosamente

        const nuevaAsistencia: Asistencia = {
          idAsistencia: '', // Este campo se llenará en el servicio al generar el ID
          idClase: result, // Asume que el resultado del QR es el ID de la clase
          nombreUsuario: this.usuario.nombre, // Asigna el nombre del usuario actual
          horaAsistencia: new Date().toISOString(), // Hora actual en formato ISO
        };

        //const asistenciaGuardada = await this.storageService.agregarAsistencia(
        //  nuevaAsistencia
        //);
        //console.log('Asistencia guardada:', asistenciaGuardada); // Verifica que se haya guardado correctamente

        // Muestra un mensaje de éxito
        this.mostrarMensaje('Asistencia guardada exitosamente');
        // Detener el escáner para evitar múltiples registros
        this.html5QrCode?.clear();
      },
      (error) => {
        console.warn('error al escanear codigo QR', error); //callback, si ocurre un error, se imprime una advertencia en la consola.
      }
    );
  }

  ngOnDestroy() {
    if (this.html5QrCode) {
      this.html5QrCode.clear(); //debería limpiar cualquier recurso usado por el escaner.
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

//interface asistencia
interface Asistencia {
  idAsistencia: string;
  idClase: string;
  nombreUsuario: string;
  horaAsistencia: string;
}
