import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})


export class DialogComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private api:ApiService,@Inject(MAT_DIALOG_DATA) public editData:any, private dialogRef:MatDialogRef<DialogComponent>) { }
  productForm!:FormGroup;
  actionBtn:string="Save"
  freshnessList=["Brand New","Second Hand","Refurbished"];

  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required]
    });


    // console.log(this.editData);
    if(this.editData)
    {
      this.actionBtn="Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
      
    }
  }



  addProduct(){
    //console.log(this.productForm.value);
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value).
                                                   subscribe
                                                   ({
                                                      next:(res)=>{
                                                        alert("Product Added");
                                                        this.productForm.reset();
                                                        this.dialogRef.close('Save');                                                      },
                                                      error:()=>{
                                                        alert("Error While Adding the Product");
                                                      }
                                                   })
    }
  }



}


