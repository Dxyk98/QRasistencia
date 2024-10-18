import { Component, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-genera-qr',
  templateUrl: './genera-qr.page.html',
  styleUrls: ['./genera-qr.page.scss'],
})
export class GeneraQrPage implements OnInit {
  constructor() {}

  ngOnInit() {}
  qrData: string = 'Texto de base';
  createdCode: string = '';

  generateQRCode() {
    this.createdCode = this.qrData;
  }
}
