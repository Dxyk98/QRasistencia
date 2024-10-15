import { Component, OnInit } from '@angular/core';
import { Platform, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
})
export class HomeStudentPage implements OnInit {
  isMobile: boolean = true;
  isModalOpen: boolean = false;

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

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
