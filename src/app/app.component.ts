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
  response!:any;
  result:any;
  results:any;

  constructor(private dialog:MatDialog, private api:ApiService){

  }
  ngOnInit(): void {
    this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        width:'30'
      },
    });
  }

  getAllProducts(){
    this.api.getProducts().subscribe(data => {
      this.products = data;
      console.log(this.products)
    });
}
}
