import { Component, OnInit } from '@angular/core';
import { FinancialProductsData as Product } from '../../interfaces/financial-products-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financial-products',
  templateUrl: './financial-products.component.html',
  styleUrls: ['./financial-products.component.scss']
})
export class FinancialProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  allProducts: Product[] = [];
  selectedPage: number = 1;
  pageSize: number = 5;
  totalPages: number[] = [];
  selectedProductId: string | null = null;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.products = [
      {
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        name: 'Nombre del Producto',
        description: 'Tarjeta de crédito',
        date_release: new Date('01-01-2024'),
        date_revision: new Date('06-01-2024'),
        id: '1'
      },
      {
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        name: 'Tarjeta Visa',
        description: 'Tarjeta de crédito',
        date_release: new Date('01-01-2024'),
        date_revision: new Date('06-01-2024'),
        id: '2'
      },
      {
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        name: 'Nombre del Producto',
        description: 'Tarjeta de crédito',
        date_release: new Date('01-01-2024'),
        date_revision: new Date('06-01-2024'),
        id: '3'
      },
      {
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        name: 'Nombre del Producto',
        description: 'Tarjeta de crédito',
        date_release: new Date('01-01-2024'),
        date_revision: new Date('06-01-2024'),
        id: '4'
      },
      {
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        name: 'Nombre del Producto',
        description: 'Tarjeta de crédito',
        date_release: new Date('01-01-2024'),
        date_revision: new Date('06-01-2024'),
        id: '4'
      },
      {
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        name: 'Nombre del Producto',
        description: 'Tarjeta de crédito',
        date_release: new Date('01-01-2024'),
        date_revision: new Date('06-01-2024'),
        id: '4'
      },
    ];
    this.allProducts = this.products;
    this.filterProducts();
  }

  filterProducts(): void {
    this.filteredProducts = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.updateTotalPages();
    this.paginate();
  }

  addProduct(): void {
    this.router.navigate(['/registrationForm']); 
  }

  changePage(page: number): void {
    this.selectedPage = page;
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.selectedPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  updateTotalPages(): void {
    const totalProducts = this.filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  updatePageSize(): void {
    this.selectedPage = 1;
    this.updateTotalPages();
    this.paginate();
  }
}
