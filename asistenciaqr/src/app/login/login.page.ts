import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { CloudService } from '../cloud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  //Si ve este mensaje profesor, es para informarle que el registro a la aplicación se hace a traves de /administrador
  //Se crea un usuario @profesor.duoc.cl y así poder ingresar, también así en la parte del alumno, que es @duocuc.cl
  //Saludos!!

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private returnUser: UserService,
    private cloud: CloudService
  ) {
    this.initForm();
  }

  async ngOnInit() {
    this.cloud.verifyConnection();
  }

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

  //onsubmit: al colocar los valores necesarios, validara que este todo bien y redireccionara donde se debe.
  //onLogin() {
  //  if (this.loginForm.valid) {
  //    const { email, password } = this.loginForm.value;
  //    if (this.returnUser.validarServicio(email, password)) {
  //      if (email.endsWith('@duocuc.cl')) {
  //        this.router.navigate(['/student/home-student']);
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

  //se crea nueva función para autenticar desde el storage
  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      //llamamos a la función del servicio
      const autenticado = await this.returnUser.autenticar(email, password);
      if (autenticado) {
        //se redirige según el termino del correo tanto estudiante, profesor y administrador
        if (email.endsWith('@duocuc.cl')) {
          this.router.navigate(['/student/home-student']);
        } else if (email.endsWith('@profesor.duoc.cl')) {
          this.router.navigate(['/profesor-home']);
        } else if (email.endsWith('@administrador.cl')) {
          this.router.navigate(['/administrador']); //autenticación de administrador no es funcional
        }
      } else {
        this.showAlert(
          //muestra alerta de error
          'Error',
          'Credenciales invalidas. Por favor, intente nuevamente.'
        );
      }
    } else {
      this.showAlert(
        //muestra alerta de error
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
