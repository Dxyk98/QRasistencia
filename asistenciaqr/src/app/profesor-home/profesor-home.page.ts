import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-profesor-home',
  templateUrl: './profesor-home.page.html',
  styleUrls: ['./profesor-home.page.scss'],
})
export class ProfesorHomePage implements OnInit {
  isMobile: boolean = false;
  isQrOpen: boolean = false;
  qrData: string = 'texto de prueba';
  createdCode: string = 'Clase 1';

  constructor(private platform: Platform) {}

  //determinamos las funciones de pantalla
  ngOnInit() {
    this.isMobile =
      this.platform.is('mobile') ||
      this.platform.is('tablet') ||
      this.isScreenSmall();
  }

  //se determian la medida de la pantalla
  private isScreenSmall(): boolean {
    return window.innerWidth < 768;
  }

  //función para abrir el modal de QR
  setQrOpen(isOpen: boolean) {
    this.isQrOpen = isOpen;
  }
}
