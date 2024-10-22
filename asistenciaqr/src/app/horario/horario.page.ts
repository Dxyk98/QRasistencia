import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {
  isMobile: boolean = true;
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
