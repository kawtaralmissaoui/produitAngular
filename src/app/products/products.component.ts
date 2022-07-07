import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { AuthenticationService } from '../services/authentication.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products! : Array<any>;
  currentPage : number=0;
  pageSize :number=5;
  totalPages : number=0;
  errorMessage! : String;
  searchFormGroup! : FormGroup;
  currentAction : string="all";
  constructor(
    private productService : ProductsService,
    private fb : FormBuilder,
    private router:Router,
    public authService :AuthenticationService) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control(null)
    })
    this.handleGetAllProduct();
  }

  public handleSearchProducts(){
    this.currentPage = 0;
    this.currentAction="search";
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProduct(keyword, this.currentPage, this.pageSize).subscribe({
      next : (data)=>{
        this.products = data.products;
        this.totalPages = data.totalPage;
      },
      error : (err)=>{
        this.errorMessage=err;
      }
    });
  }

  public handleGetAllProduct(){
    this.productService.getPageProducts(this.currentPage, this.pageSize).subscribe({
      next : (data)=>{
        this.products = data.products;
        this.totalPages = data.totalPage;
        console.log("this.totalPages",this.totalPages)
      },
      error : (err)=>{
        this.errorMessage=err;
      }
    });
  }

  public goToPage(i : number){
    this.currentPage = i;
    if(this.currentAction == "all")
      this.handleGetAllProduct();
    else
      this.handleSearchProducts();
  }

  public handleDeleteProduct(p: Product){
    let conf = confirm("Are you sure ?");
    if(conf == false) return ;
    this.productService.deleteProduct(p.id).subscribe({
      next : (data)=>{
        //this.handleGetAllProduct();
        let index = this.products.indexOf(p);
        this.products.splice(index, 1);
      },
      error : (err)=>{
        this.errorMessage=err;
      }
    });
  }

  public handleSetPromotion(p :Product){
    let promo = p.promotion
    this.productService.setPromotion(p.id).subscribe({
      next : (data)=>{
        p.promotion = !promo
      },
      error : (err)=>{
        this.errorMessage=err;
      }
    })
  }

  public handleNewProduct(){
    this.router.navigateByUrl("/admin/newProduct");
  }

  public handleEditProduct(p :Product){
    this.router.navigateByUrl("/admin/editProduct/"+p.id);
  }
}
