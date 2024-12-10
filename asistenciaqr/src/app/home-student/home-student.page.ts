import { Component, OnInit } from '@angular/core';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
  standalone: false,
})
export class HomeStudentPage implements OnInit {
  private html5QrCode: Html5QrcodeScanner | null = null;
  scannerResult: string | null = null; //string de escaner de QR
  isCameraPermission: boolean = false;
  usuario: any = { nombre: '', carrera: '', userId: '', horario: '' };
  clases: any[] = [];

  constructor(
    private toastController: ToastController,
    private auth: AuthenticationService,
    private store: StoreService
  ) {}

  //se determinan las pantallas
  async ngOnInit() {
    window.addEventListener('resize', () => this.checkIfMobile());
    this.auth.getCurrentUser().subscribe((user) => {
      if (user) {
        this.store.getUserData(user.uid).subscribe((userData: any) => {
          this.usuario.nombre = userData?.nombre || 'Usuario'; // Asigna el nombre o un valor por defecto
          this.usuario.carrera = userData?.carrera || 'Carrera';
          this.usuario.userId = userData?.uid || 'Id';
          this.usuario.horario = userData?.horario || 'Horario';
          this.loadClasses();
        });
      } else {
        this.usuario.nombre = 'Invitado';
      }
    });
  }

  isMobile: boolean = true;
  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  //funciones para abrir modales.
  isModalScanner: boolean = false; //modal de scanner de clases
  setScannerOpen(isOpen: boolean) {
    this.isModalScanner = isOpen;
  }

  isModalCredential: boolean = false; //Boolean para abrir y cerrar modal de credencial
  setCredentialOpen(isOpen: boolean) {
    this.isModalCredential = isOpen;
  }

  isModalSettings: boolean = false; //modal de configuraciones o ajustes
  setSettingsOpen(isOpen: boolean) {
    this.isModalSettings = isOpen;
  }

  //funcion que pide autorizar la camara del dispositivo para poder escanear el codigo
  requestPermission() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.isCameraPermission = true; //Si se otrogan permisos, establece isCameraPermission en true
          this.startScanner();
        })
        .catch((error) => {
          alert('Error al solicitar permisos de cámara');
        });
    } else {
      alert('Navegador no soporta el acceso a cámara');
    }
  }

  //funcion que escanea el QR
  startScanner() {
    const config = {
      fps: 10,
      qrbox: 250,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };
    let isScannig = true;
    this.html5QrCode = new Html5QrcodeScanner('reader', config, true); //Se inicializa el escaner con el ID reader y la configuración determinada. El tercer parámetro 'true' es para habilitar la desactivacion de forma automatica
    this.html5QrCode.render(
      async (result) => {
        if (!isScannig) {
          return;
        }
        isScannig = false;
        this.scannerResult = result;
        console.log('resultado del scanner', result); //callback de exito, al escanear el código QR exitosamente
        const now = new Date();
        const asistensId = now.toISOString();

        const nuevaAsistencia = {
          idAsistencia: asistensId, // Este campo se llenará en el servicio al generar el ID
          idClase: result, // Asume que el resultado del QR es el ID de la clase
          nombreUsuario: this.usuario.nombre, // Asigna el nombre del usuario actual
          idUsuario: this.usuario.userId, //Se asigna id del usuario para poder crear la consulta.
          horaAsistencia: new Date().toISOString(), // Hora actual en formato ISO
        };

        const asistenciaGuardada = await this.store.saveAsistenciaData(
          asistensId,
          nuevaAsistencia
        );
        console.log('Asistencia guardada:', asistenciaGuardada); // Verifica que se haya guardado correctamente

        // Muestra un mensaje de éxito
        this.mostrarMensaje('Asistencia guardada exitosamente');
        // Detener el escáner para evitar múltiples registros
        this.html5QrCode?.clear();
      },
      (error) => {
        console.warn('error al escanear codigo QR', error); //callback, si ocurre un error, se imprime una advertencia en la consola.
      }
    );
  }

  ngOnDestroy() {
    if (this.html5QrCode) {
      this.html5QrCode.clear(); //debería limpiar cualquier recurso usado por el escaner.
    }
  }

  loadClasses() {
    console.log('Horario del usuario:', this.usuario.horario); // Verifica el valor de horario
    console.log('Carrera del usuario:', this.usuario.carrera); // Verifica el valor de carrera
    if (this.usuario.horario && this.usuario.carrera) {
      this.store
        .getFilteredClasses(this.usuario.horario, this.usuario.carrera)
        .subscribe(
          (clases: any[]) => {
            console.log('Clases recibidas desde Firestore:', clases); // Verifica los datos recibidos
            this.clases = clases; // Asigna las clases filtradas
          },
          (error) => {
            console.error('Error al cargar clases:', error);
          }
        );
    } else {
      console.warn('Horario o carrera no definidos para el usuario');
    }
  }

  //mensaje de alerta para ver si esta todo correcto
  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }
}
