import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/product';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  product1!: Product;
  actionBtn: string="Save";

  freshnessList =["Brand New", "Second Hand", "Refurbished"]
  productForm !: FormGroup;
  constructor(private formBuilder:FormBuilder,
     private api:ApiService, 
     @Inject(MAT_DIALOG_DATA) public editData:number=0,
     private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      productName: ['',Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });
  
    if(this.editData){
      this.api.getProduct(this.editData).subscribe(data=>{
        this.product1=data;
        this.actionBtn="Update";
        this.productForm.controls['productName'].setValue(this.product1.productName);
        this.productForm.controls['category'].setValue(this.product1.category);
        this.productForm.controls['freshness'].setValue(this.product1.freshness);
        this.productForm.controls['date'].setValue(this.product1.date);
        this.productForm.controls['price'].setValue(this.product1.price);
        this.productForm.controls['comment'].setValue(this.product1.comment);
      })
    }
    }


  addProduct(){
    if(this.actionBtn==="Update"){
      this.updateProduct();
    }
    else if(this.actionBtn==="Save"){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(resp)=>{
            alert("Product Added Successfully");
            this.productForm.reset();
            this.dialogRef.close('save');
          }, error:()=>{
            alert("Product Not Added, Error Occured");
          }
        })
      }
    }
  }

  updateProduct(){
    this.api.updateProduct(this.productForm.value,this.product1.id)
    .subscribe({
      next:(resp)=>{
        alert("Product Updated Successfully");
        this.productForm.reset();
            this.dialogRef.close('update');
      }, error: (err)=>{
        alert("Error while updating the product")

      }
    })
  }
}
