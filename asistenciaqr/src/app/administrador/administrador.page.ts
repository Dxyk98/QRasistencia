import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

interface Persona {
  name: string;
  age: string;
  carrera: string;
  identificador: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {
  constructor(private storageservice: StorageService) {}
  personas: Persona[] = [];

  async ngOnInit() {
    await this.storageservice.init();
    await this.listar();
  }

  async listar() {
    this.personas = (await this.storageservice.obtenerDatos('personas')) || [];
  }
}
