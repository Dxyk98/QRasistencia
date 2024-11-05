import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  recuperarForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private returnUser: UserService
  ) {
    this.initForm();
  }

  ngOnInit() {}

  //patrones de validación
  private initForm(): void {
    this.recuperarForm = this.fb.group({
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

  //onsubmit: al colocar los valores necesarios, validara que este todo bien y redireccionara donde se debe.
  //onSubmit() {
  //  if (this.recuperarForm.valid) {
  //    const { email, password } = this.recuperarForm.value;
  //    if (this.returnUser.validarServicio(email, password)) {
  //      if (email.endsWith('@duocuc.cl')) {
  //        this.router.navigate(['/home-student']);
  //      } else if (email.endsWith('@profesor.duoc.cl')) {
  //        this.router.navigate(['/profesor-home']);
  //      }
  //    } else {
  //      this.showAlert(
  //        'Error',
  //        'Credenciales inválidas. Por favor, intente nuevamente.'
  //      );
  //    }
  //  } else {
  //    this.showAlert(
  //      'Error',
  //      'Por favor, complete todos los campos correctamente.'
  //    );
  //  }
  //}

  async onSubmit() {
    if (this.recuperarForm.valid) {
      const { email, password } = this.recuperarForm.value;
      //llamamos a la función del servicio
      const autenticado = await this.returnUser.autenticar(email, password);
      if (autenticado) {
        //se redirige según el termino del correo
        if (email.endsWith('@duocuc.cl')) {
          this.router.navigate(['/student/home-student']);
        } else if (email.endsWith('@profesor.duoc.cl')) {
          this.router.navigate(['/profesor-home']);
        }
      } else {
        this.showAlert(
          'Error',
          'Credenciales invalidas. Por favor, intente nuevamente.'
        );
      }
    } else {
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
