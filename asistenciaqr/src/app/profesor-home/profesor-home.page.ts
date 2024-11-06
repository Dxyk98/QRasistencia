import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  setQrOpen(isOpen: boolean) {
    this.isQrOpen = isOpen;
  }
}
