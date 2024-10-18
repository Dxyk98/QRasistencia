import { Component, OnInit, OnDestroy } from '@angular/core';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { from } from 'rxjs';

@Component({
  selector: 'app-scanqr',
  templateUrl: './scanqr.page.html',
  styleUrls: ['./scanqr.page.scss'],
})
export class ScanqrPage implements OnInit, OnDestroy {
  scannerResult: string | null = null;
  private html5QrCode: Html5QrcodeScanner | null = null;
  isCameraPermissionGranted: boolean = false;

  constructor() {}

  ngOnInit() {}

  requestCameraPermission() {
    alert('entre');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((strem) => {
          this.isCameraPermissionGranted = true;
          this.startScanner();
        })
        .catch((error) => {
          alert('Error al solicitar permisos de camara');
        });
    } else {
      alert('Navegador no soporta el acceso a la camara');
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
      this.html5QrCode.clear(); //detiene scanner
    }
  }
}
