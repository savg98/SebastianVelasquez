import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = new BehaviorSubject<boolean>(false);
  private productName = new BehaviorSubject<string>('');

  modalState$ = this.modalState.asObservable();
  productName$ = this.productName.asObservable();

  openModal(name: string) {
    this.productName.next(name);
    this.modalState.next(true);
  }

  closeModal() {
    this.modalState.next(false);
    this.productName.next('');
  }
}
