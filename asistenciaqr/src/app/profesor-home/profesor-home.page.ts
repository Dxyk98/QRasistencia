import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-profesor-home',
  templateUrl: './profesor-home.page.html',
  styleUrls: ['./profesor-home.page.scss'],
})
export class ProfesorHomePage implements OnInit {
  isMobile: boolean = false;
  qrData: string = '';
  createdCode: string = '';
  claseHoy: any; // Propiedad para almacenar la clase de hoy
  claseForm: FormGroup;
  carreras: string[] = [
    'Ingeniería Informatica',
    'Tecnico Informatico',
    'Medicina',
    'Derecho',
    'Arquitectura',
    'Administración',
  ];
  horario: string[] = ['Diurno', 'Vespertino'];
  diaSemana: string[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  usuario: any = { nombre: '' }; //variable para almacenar nombre de usuario
  profesores: any[] = []; //variable para almacenar a profesores.
  clases: any[] = []; //variable para almacenar las clases

  constructor(
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private store: StoreService
  ) {
    this.claseForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      carreraClase: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required],
      diurnoVespertino: ['', Validators.required],
      dias: ['', Validators.required],
      profesor: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
    this.loadProfesores();
    this.loadClasses();
    this.auth.getCurrentUser().subscribe((user) => {
      if (user) {
        this.store.getUserData(user.uid).subscribe((userData: any) => {
          this.usuario.nombre = userData?.nombre || 'Usuario'; // Asigna el nombre o un valor por defecto
        });
      } else {
        this.usuario.nombre = 'Invitado';
      }
    });
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  setQrData(clases: any) {
    this.qrData = clases.id; // Set the selected class's ID as QR data
    this.generateQrCode(); // Generate the QR code based on the selected class's ID
    this.setOpen(true); // Open the modal
  }

  generateQrCode() {
    if (this.qrData) {
      this.createdCode = this.qrData; // Generate the QR code with the QR data
    } else {
      console.error('QR data is not set. Please select a class.');
    }
  }

  //Modal crear clase
  isCrearModalOpen = false;
  setOpenCrear(isOpen: boolean) {
    this.isCrearModalOpen = isOpen;
  }

  // Modal QR
  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  loadProfesores() {
    this.store.getProfesores().subscribe(
      (data) => {
        this.profesores = data;
        console.log('Profesores cargados:', this.profesores);
      },
      (error) => {
        console.error('Error al cargar los profesores:', error);
      }
    );
  }

  async guardarClase() {
    if (this.claseForm.valid) {
      const data = this.claseForm.value;
      try {
        const now = new Date();
        const classId = now.toISOString();

        const classData = {
          ...data,
          id: classId,
          createAt: now,
        };

        const uid = data.profesor;
        await this.store.saveClassData(uid, classData);
        this.claseForm.reset();
        this.mostrarMensaje('Clase creada exitosamente.');
      } catch (error) {
        console.log(error);
        this.mostrarMensaje('Ocurrio un error');
      }
    } else {
      this.mostrarMensaje('Por favor complete todos los campos correctamente.');
    }
  }

  loadClasses() {
    this.store.getAllClasses().subscribe(
      (data) => {
        this.clases = data;
        console.log('Clases cargadas:', this.clases);
      },
      (error) => {
        console.error('Error al cargar las clases:', error);
      }
    );
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }
}
