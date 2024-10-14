import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  private readonly allowedCredentials = [
    { email: 'test@duocuc.cl', password: 'test12345' },
    { email: 'profesor@profesor.duoc.cl', password: 'test6789' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private returnUser: UserService
  ) {
    this.initForm();
  }

  ngOnInit() {}

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@(duocuc.cl|profesor.duoc.cl)$'
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (this.returnUser.validarServicio(email, password)) {
        if (email.endsWith('@duocuc.cl')) {
          this.router.navigate(['/home-student']);
        } else if (email.endsWith('@profesor.duoc.cl')) {
          this.router.navigate(['/profesor-home']);
        }
      } else {
        this.showAlert(
          'Error',
          'Credenciales inválidas. Por favor, intente nuevamente.'
        );
      }
    } else {
      this.showAlert(
        'Error',
        'Por favor, complete todos los campos correctamente.'
      );
    }
  }

  private async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
