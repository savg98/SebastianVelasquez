import { Component, OnInit, HostListener } from '@angular/core';
import { FinancialProductsData as Product } from '../../interfaces/financial-products-interface';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import {financialProductsService} from '../../services/financial-products.service'

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
  selectedProduct: Product | null = null;

  constructor(private router:Router, private modalService: ModalService, private financialProductsService: financialProductsService ) { }

  ngOnInit(): void {
    this.filterProducts();
    this.loadProducts();
  }

  loadProducts(): void {
    this.financialProductsService.getFinancialProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data; 
        this.filterProducts(); 
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
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

  toggleMenu(product: Product): void {
    this.selectedProduct = this.selectedProduct === product ? null : product;
  }

  closeMenu(): void {
    this.selectedProduct = null;
  }

  editProduct(product: Product): void {
    this.router.navigate(['/registrationForm'], { queryParams: { id: product.id } });
  }
  
  deleteProduct(product: Product): void {
    this.closeMenu();
    this.modalService.openModal(product.name, () => {
      this.financialProductsService.deleteFinancialProduct(product.id).subscribe({
        next: () => {
          this.allProducts = this.allProducts.filter(p => p.id !== product.id);
          this.filterProducts();
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
        }
      });
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = (event.target as HTMLElement).closest('.actions');
    if (!clickedInside) {
      this.closeMenu();
    }
  }
}
