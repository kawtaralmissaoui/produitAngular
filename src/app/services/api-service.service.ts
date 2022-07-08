import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  localhost = "http://localhost:8083/";

  addProduct(product:Product){
    return this.http.post(this.localhost+'/produits', product);
  }

  getAllProduct(){
    return this.http.get(this.localhost+'/produits');
  }

  ProductById(id:any){
    return this.http.get(this.localhost+'/produits/'+id);
  }

  deleteProduct(id:any){
    return this.http.delete(this.localhost+'/produits/'+id);
  }

  updateProduct(id:any){
    return this.http.put(this.localhost+'/produits/'+id);
  }
}
