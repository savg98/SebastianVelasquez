import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  isModalOpen: boolean = false;
  productName: string = '';

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.modalState$.subscribe(state => {
      this.isModalOpen = state;
    });
    this.modalService.productName$.subscribe(name => {
      this.productName = name;
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }

  confirmDelete() {
    this.modalService.confirm(); 
  }
}
