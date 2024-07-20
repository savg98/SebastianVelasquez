import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); 
  });

  describe('openModal', () => {
    it('should open the modal and set product name', () => {
      const productName = 'Test Product';
      const callback = jasmine.createSpy('onConfirm');

      service.openModal(productName, callback);

      service.modalState$.subscribe(state => {
        expect(state).toBeTrue(); 
      });

      service.productName$.subscribe(name => {
        expect(name).toBe(productName);
      });

      expect(service['onConfirm']).toBe(callback); 
    });
  });

  describe('closeModal', () => {
    it('should close the modal and clear product name', () => {
      service.closeModal();

      service.modalState$.subscribe(state => {
        expect(state).toBeFalse(); 
      });

      service.productName$.subscribe(name => {
        expect(name).toBe(''); 
      });

      expect(service['onConfirm']).toBeNull();
    });
  });

  describe('confirm', () => {
    it('should call onConfirm and close the modal', () => {
      const callback = jasmine.createSpy('onConfirm');
      service.openModal('Test Product', callback);
      
      service.confirm();

      expect(callback).toHaveBeenCalled();
      service.modalState$.subscribe(state => {
        expect(state).toBeFalse(); 
      });

      service.productName$.subscribe(name => {
        expect(name).toBe('');
      });
      
      expect(service['onConfirm']).toBeNull();
    });

    it('should not throw error if onConfirm is not set', () => {
      service.closeModal(); 
      expect(() => service.confirm()).not.toThrow(); 
    });
  });
});
