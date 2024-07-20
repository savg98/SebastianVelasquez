import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = new BehaviorSubject<boolean>(false);
  private productName = new BehaviorSubject<string>('');
  private onConfirm: (() => void) | null = null;

  modalState$ = this.modalState.asObservable();
  productName$ = this.productName.asObservable();

  openModal(name: string, onConfirm: () => void) {
    this.productName.next(name);
    this.modalState.next(true);
    this.onConfirm = onConfirm;
  }

  closeModal() {
    this.modalState.next(false);
    this.productName.next('');
    this.onConfirm = null; 
  }

  confirm() {
    if (this.onConfirm) {
      this.onConfirm();
    }
    this.closeModal();
  }
}
