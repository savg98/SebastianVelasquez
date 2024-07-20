import { Injectable } from '@angular/core';
import { EnvironmentDev } from '../environments/environment-dev.enum';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FinancialProductsData, FinancialProductsList, FinancialProductsResponse, FinancialProductsUpdateData, FinancialProductsUpdateSuccess, FinancialProductsError, FinancialProductsDeleteSuccess } from '../interfaces/financial-products-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class financialProductsService {
  url: string = EnvironmentDev.URL;

  constructor(private http: HttpClient) { }
  
  getFinancialProducts(): Observable<FinancialProductsList>{
    return this.http.get(`${this.url}/bp/products`) as Observable<FinancialProductsList>;
  }

  createFinancialProduct(financialProductReq: FinancialProductsData): Observable<FinancialProductsResponse> {
    return this.http.post(`${this.url}/bp/products`, financialProductReq) as Observable<FinancialProductsResponse>;
  }

  updateFinancialProduct(id: string, financialProductReq: FinancialProductsUpdateData): Observable<FinancialProductsUpdateSuccess> {
    return this.http.put<FinancialProductsUpdateSuccess>(`${this.url}/bp/products/${id}`, financialProductReq);
  }

  deleteFinancialProduct(id: string): Observable<FinancialProductsDeleteSuccess> {
    return this.http.delete<FinancialProductsDeleteSuccess>(`${this.url}/bp/products/${id}`);
  }

  getFinancialProductById(id: string): Observable<FinancialProductsData> {
    return this.http.get<FinancialProductsData>(`${this.url}/bp/products/${id}`);
  }
  

}
