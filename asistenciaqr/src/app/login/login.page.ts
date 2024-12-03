import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthenticationService
  ) {
    this.initForm();
  }

  ngOnInit() {}

  //patrones de validación
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

  //se crea nueva función para autenticar desde el storage
  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      try {
        // Llamamos al servicio para autenticar
        const autenticado = await this.authService.autenticar(email, password);

        if (autenticado) {
          // Redirigir según el dominio del correo
          if (email.endsWith('@duocuc.cl')) {
            this.router.navigate(['/student/home-student']);
            this.loginForm.reset();
          } else if (email.endsWith('@profesor.duoc.cl')) {
            this.router.navigate(['/profesor-home']);
            this.loginForm.reset();
          } else if (email.endsWith('@administrador.cl')) {
            this.router.navigate(['/administrador']);
            this.loginForm.reset();
          }
          this.loginForm.reset();
        } else {
          // Mostrar alerta de credenciales inválidas
          this.showAlert(
            'Error',
            'Credenciales inválidas. Por favor, intente nuevamente.'
          );
        }
      } catch (err) {
        // Mostrar alerta de error (por ejemplo, dominio no permitido)
        this.showAlert('Error', 'Error');
      }
    } else {
      // Mostrar alerta de formulario incompleto
      this.showAlert(
        'Error',
        'Por favor, complete todos los campos correctamente.'
      );
    }
  }

  //showalert: función para mostrar la alerta emergente
  private async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
