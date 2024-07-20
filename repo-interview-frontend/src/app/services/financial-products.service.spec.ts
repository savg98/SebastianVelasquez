import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { financialProductsService } from './financial-products.service';
import { FinancialProductsData, FinancialProductsList, FinancialProductsResponse, FinancialProductsUpdateData, FinancialProductsUpdateSuccess, FinancialProductsDeleteSuccess } from '../interfaces/financial-products-interface';
import { EnvironmentDev } from '../environments/environment-dev.enum';

describe('FinancialProductsService', () => {
  let service: financialProductsService;
  let httpMock: HttpTestingController;
  const apiUrl = EnvironmentDev.URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [financialProductsService]
    });
    service = TestBed.inject(financialProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFinancialProducts', () => {
    it('should retrieve all financial products', () => {
      const dummyProducts: FinancialProductsList = {
        data: [
          { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: new Date('2024-01-01'), date_revision: new Date('2024-01-02') },
          { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2.png', date_release: new Date('2024-02-01'), date_revision: new Date('2024-02-02') }
        ]
      };

      service.getFinancialProducts().subscribe(products => {
        expect(products).toEqual(dummyProducts);
      });

      const req = httpMock.expectOne(`${apiUrl}/bp/products`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyProducts);
    });
  });

  describe('createFinancialProduct', () => {
    it('should create a new financial product', () => {
      const newProduct: FinancialProductsData = {
        id: '3',
        name: 'Product 3',
        description: 'Description 3',
        logo: 'logo3.png',
        date_release: new Date('2024-03-01'),
        date_revision: new Date('2024-03-02')
      };
      const response: FinancialProductsResponse = {
        message: 'Product created successfully',
        data: newProduct
      };

      service.createFinancialProduct(newProduct).subscribe(res => {
        expect(res).toEqual(response);
      });

      const req = httpMock.expectOne(`${apiUrl}/bp/products`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newProduct);
      req.flush(response);
    });
  });

  describe('updateFinancialProduct', () => {
    it('should update a financial product', () => {
      const id = '123';
      const updateData: FinancialProductsUpdateData = {
        name: 'Updated Product',
        description: 'Updated Description',
        logo: 'updated-logo.png',
        date_release: new Date('2024-04-01'),
        date_revision: new Date('2024-04-02')
      };
      const response: FinancialProductsUpdateSuccess = {
        message: 'Product updated successfully',
        data: updateData
      };

      service.updateFinancialProduct(id, updateData).subscribe(res => {
        expect(res).toEqual(response);
      });

      const req = httpMock.expectOne(`${apiUrl}/bp/products/${id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updateData);
      req.flush(response);
    });
  });

  describe('deleteFinancialProduct', () => {
    it('should delete a financial product', () => {
      const id = '123';
      const response: FinancialProductsDeleteSuccess = {
        message: 'Product deleted successfully'
      };

      service.deleteFinancialProduct(id).subscribe(res => {
        expect(res).toEqual(response);
      });

      const req = httpMock.expectOne(`${apiUrl}/bp/products/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(response);
    });
  });

  describe('getFinancialProductById', () => {
    it('should retrieve a financial product by id', () => {
      const id = '123';
      const product: FinancialProductsData = {
        id: '123',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'logo1.png',
        date_release: new Date('2024-01-01'),
        date_revision: new Date('2024-01-02')
      };

      service.getFinancialProductById(id).subscribe(prod => {
        expect(prod).toEqual(product);
      });

      const req = httpMock.expectOne(`${apiUrl}/bp/products/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(product);
    });
  });
});
