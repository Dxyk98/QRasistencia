import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  allowedEmails: string[] = ['test@duocuc.cl', 'profesor@profesor.duoc.cl']; // Array de correos permitidos
  allowedPasswords: string[] = ['test12345', 'test6789']; // Array de contraseñas correspondientes a los correos permitidos

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@(duocuc.cl|profesor.duoc.cl)$'
          ),
          this.allowedEmailValidator.bind(this),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {}

  allowedEmailValidator(control: { value: string }) {
    return this.allowedEmails.includes(control.value)
      ? null
      : { notAllowed: true };
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      const emailIndex = this.allowedEmails.indexOf(email);

      if (emailIndex !== -1 && this.allowedPasswords[emailIndex] === password) {
        console.log('Login exitoso');
        this.router.navigate(['/home']);
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Credenciales inválidas. Por favor, intente nuevamente.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos correctamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
