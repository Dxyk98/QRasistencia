import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  datos: any[] = [];
  dato: any = {};
  private storage: Storage | null = null;
  constructor() {}
}
