import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  recuperarForm!: FormGroup;
  private readonly allowedEmails = [
    { email: 'test@duocuc.cl' },
    { email: 'profesor@profesor.duoc.cl' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
    this.initForm();
  }

  ngOnInit() {}

  private initForm(): void {
    this.recuperarForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@(duocuc.cl|profesor.duoc.cl)$'
          ),
          this.allowedEmailsValidator.bind(this),
        ],
      ],
    });
  }

  private allowedEmailsValidator(control: {
    value: string;
  }): { [key: string]: boolean } | null {
    return this.allowedEmails.some((email) => email.email === control.value)
      ? null
      : { notAllowed: true };
  }

  async onSubmit(): Promise<void> {
    if (this.recuperarForm.valid) {
      const { email } = this.recuperarForm.value;
      const isValidEmail = this.allowedEmails.some(
        (allowedEmail) => allowedEmail.email === email
      );

      if (isValidEmail) {
        console.log('Email válido');
        if (email.endsWith('@duocuc.cl')) {
          this.router.navigate(['/home-student']);
        } else if (email.endsWith('@profesor.duoc.cl')) {
          this.router.navigate(['/profesor-home']);
        }
      } else {
        await this.showAlert(
          'Error',
          'Credenciales inválidas. Por favor, intente nuevamente.'
        );
      }
    } else {
      await this.showAlert(
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
