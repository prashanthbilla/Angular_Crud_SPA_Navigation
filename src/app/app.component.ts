import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/product';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Angular_new_CRUD';

  products!: Product[];
  product!: Product;
  response!: any;
  result: any;
  results: any;

  constructor(private dialog:MatDialog, private api:ApiService){

  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
        width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllProducts();
      }
    })
  }

  editProduct(row: any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllProducts();
      }
    })
  }

  getProduct(id:number){
    this.api.getProduct(id).subscribe(data=>{
      console.log(data);
    })
  }

  getAllProducts(){
    this.api.getProducts().subscribe(data => {
      this.products = data;
    });
}

deleteProduct(id: number){
  this.results=window.confirm("Do you want to delete the Product ?");
  if(this.results){
  this.api.deleteProduct(id)
  .subscribe({
    next:(resp)=>{
        alert("Product deleted successfully");
        this.getAllProducts();
    }, error:()=>{
      alert("Product not deleted....")
    }
  })
}else{
  alert("Product not deleted....");
}
}

}
