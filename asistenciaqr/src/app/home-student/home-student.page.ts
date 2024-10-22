import { Component, OnInit } from '@angular/core';
import { Platform, IonicModule } from '@ionic/angular';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
})
export class HomeStudentPage implements OnInit {
  isMobile: boolean = true;
  isModalCredential: boolean = false;
  isModalSettings: boolean = false;
  isModalScanner: boolean = false;
  scannerResult: string | null = null;
  private html5QrCode: Html5QrcodeScanner | null = null;
  isCameraPermission: boolean = false;

  constructor(private platform: Platform) {}

  //se determinan las pantallas
  ngOnInit() {
    this.isMobile =
      this.platform.is('mobile') ||
      this.platform.is('tablet') ||
      this.isScreenSmall();
    console.log('isMobile:', this.isMobile);
  }

  //pantalla permitida como celuar, si es mayor se motrara un mensaje
  private isScreenSmall(): boolean {
    return window.innerWidth < 768;
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
          alert('Error al solicitar permisos de camará');
        });
    } else {
      alert('Navegador no soporta el acceso a camará');
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
