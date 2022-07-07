import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId! : string;
  product! : Product;
  productFormGroup! : FormGroup;
  constructor(private route : ActivatedRoute,
    private productService : ProductsService,
    private fb : FormBuilder,
    ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe({
      next : (product)=>{
        this.product = product;
        this.productFormGroup = this.fb.group({
          name : this.fb.control(this.product.name, [Validators.required, Validators.minLength(4)]),
          price : this.fb.control(this.product.price, [Validators.required, Validators.min(200)]),
          promotion : this.fb.control(this.product.promotion, [Validators.required]),
        })
      },
      error :(err)=>{

      }
    })
  }

  public handleEditProduct(){
    let p = this.productFormGroup.value;
    p.id = this.product.id;
    this.productService.updateProduct(p).subscribe({
      next : (product)=>{
        alert("Product updated")
      },
      error :(err)=>{

      }
    })

  }

}
