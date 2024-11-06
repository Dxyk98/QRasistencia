import { Component, OnInit } from '@angular/core';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
})
export class HomeStudentPage implements OnInit {
  isMobile: boolean = true;
  isModalCredential: boolean = false; //Boolean para abrir y cerrar modal de credencial
  isModalSettings: boolean = false; //modal de configuraciones o ajustes
  isModalScanner: boolean = false; //modal de scanner de clases
  scannerResult: string | null = null; //string de escaner de QR
  private html5QrCode: Html5QrcodeScanner | null = null;
  isCameraPermission: boolean = false;

  constructor() {}

  //se determinan las pantallas
  ngOnInit() {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  //funciones para abrir modales.
  setScannerOpen(isOpen: boolean) {
    this.isModalScanner = isOpen;
  }

  setCredentialOpen(isOpen: boolean) {
    this.isModalCredential = isOpen;
  }

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
      (result) => {
        this.scannerResult = result;
        console.log('resultado del scanner', result); //callback de exito, al escanear el código QR exitosamente
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
}
