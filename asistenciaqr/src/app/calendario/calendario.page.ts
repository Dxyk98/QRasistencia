import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
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

  //pantalla permitida como celuar, si es mayor se motrara un mensaje
  private isScreenSmall(): boolean {
    return window.innerWidth < 768;
  }
}
