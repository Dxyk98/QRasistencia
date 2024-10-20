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

  ngOnInit() {
    this.isMobile =
      this.platform.is('mobile') ||
      this.platform.is('tablet') ||
      this.isScreenSmall();
    console.log('isMobile:', this.isMobile);
  }

  private isScreenSmall(): boolean {
    return window.innerWidth < 768;
  }

  setScannerOpen(isOpen: boolean) {
    this.isModalScanner = isOpen;
  }

  setCredentialOpen(isOpen: boolean) {
    this.isModalCredential = isOpen;
  }

  setSettingsOpen(isOpen: boolean) {
    this.isModalSettings = isOpen;
  }

  requestPermisssion() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((strem) => {
          this.isCameraPermission = true;
          this.startScanner();
        })
        .catch((error) => {
          alert('Error al solicitar permisos de camará');
        });
    } else {
      alert('Navegador no soporta el acceso a camará');
    }
  }

  startScanner() {
    const config = {
      fps: 10,
      qrbox: 250,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };
    this.html5QrCode = new Html5QrcodeScanner('reader', config, false);
    this.html5QrCode.render(
      (result) => {
        this.scannerResult = result;
        console.log('resultado del scanner', result);
      },
      (error) => {
        console.warn('error al escanear codigo QR', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.html5QrCode) {
      this.html5QrCode.clear();
    }
  }
}
