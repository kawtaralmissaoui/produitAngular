import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products! : Array<Product>;
  pageProducts! : Array<PageProduct>;
  constructor() {
    this.products=[
      {id:UUID.UUID(), name:"computer", price: 6500, promotion: true},
      {id:UUID.UUID(), name:"printer", price: 5000, promotion: false},
      {id:UUID.UUID(), name:"smart phone", price: 2000, promotion: true},
    ];

    for(let i=0;i<10;i++){
      this.products.push({id:UUID.UUID(), name:"computer", price: 6500, promotion: true});
      this.products.push({id:UUID.UUID(), name:"printer", price: 5000, promotion: false});
      this.products.push({id:UUID.UUID(), name:"computer", price: 6500, promotion: true});
    }
  }

  public getAllProducts() :Observable<Product[]>{
    return of(this.products);
  }

  public getPageProducts(page : number, size : number) :Observable<PageProduct>{
    let index = page*size;
    let totalPage = ~~(this.products.length/size);
    if(this.products.length % size !=0)
      totalPage++;
    let pageProducts = this.products.slice(index, index+size);
    return of({page:page, size:size, totalPage:totalPage, products:pageProducts});

  }

  public deleteProduct(id:string) :Observable<boolean>{
    this.products = this.products.filter(p=>p.id!=id);
    return of(true);
  }

  public setPromotion(id:string) :Observable<boolean>{
    let product = this.products.find(p=>p.id==id)
    if(product !=undefined){
      product.promotion = !product.promotion
      return of(true)
    }else{
      return throwError(()=>new Error('Product not found'))
    }
  }

  public searchProduct(keyword:string, page:number, size:number) : Observable<PageProduct>{
    let result = this.products.filter(p=>p.name.includes(keyword))
    let index = page*size;
    let totalPage = ~~(result.length/size);
    if(this.products.length % size !=0)
      totalPage++;
    let pageProducts = result.slice(index, index+size);
    return of({page:page, size:size, totalPage:totalPage, products:pageProducts});
  }

  public addNewProduct(product : Product) : Observable<Product>{
    product.id = UUID.UUID();
    this.products.push(product);
    return of(product);
  }

  public getProductById(id :string) : Observable<Product>{
    let product = this.products.find(p=> p.id == id);
    if(product == undefined)
      return throwError (()=>new Error("Product not found"));
    return of(product);
  }

  public updateProduct(product : Product) : Observable<Product>{
    this.products = this.products.map(p=>(p.id == product.id)?product:p);
    return of(product);
  }
}
