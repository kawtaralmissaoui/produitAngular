import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productFormGroup! : FormGroup;
  constructor(private fb : FormBuilder,
    private prodService : ProductsService) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      price : this.fb.control(null, [Validators.required, Validators.min(200)]),
      promotion : this.fb.control(false, [Validators.required]),
    })
  }

  public handleAddProduct(){
    let product = this.productFormGroup.value;
    this.prodService.addNewProduct(product).subscribe({
      next : (data)=>{
        alert("Product added success")
        this.productFormGroup.reset();
      },error(err) {
        console.log("error")
      },
    })

  }

  getErroMessage(fiels: string, error: any) :string{
    if(error['required']){
      return fiels +"is Required";
    }
    else if(error["minlenght"]){
      return fiels+" should have at least "+error["minlenght"]["requiredLenght"]+" caractéres"
    }else return "";
  }


}
