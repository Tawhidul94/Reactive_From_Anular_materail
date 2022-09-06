import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ["New Brand","Second Hand","Refurbished"];

  productFrom !: FormGroup
  actionBtn : string = "Save ";

  constructor(private formbuilder : FormBuilder,private api :ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dailogref : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productFrom = this.formbuilder.group({
      productName : ['',[Validators.required]],
      category : ['',[Validators.required]],
      date : ['',[Validators.required]],
      freshness : ['',[Validators.required]],
      price : ['',[Validators.required]],
      comment : ['',[Validators.required]],

    })
    if(this.editData){
      this.actionBtn = "Update";
      this.productFrom.controls['productName'].setValue(this.editData.productName);
      this.productFrom.controls['category'].setValue(this.editData.category);
      this.productFrom.controls['date'].setValue(this.editData.date);
      this.productFrom.controls['freshness'].setValue(this.editData.freshness);
      this.productFrom.controls['price'].setValue(this.editData.price);
      this.productFrom.controls['comment'].setValue(this.editData.comment);

    }
  }

  

  addProduct(){
    if(!this.editData){
      if(this.productFrom.valid){
        this.api.postProduct(this.productFrom.value).subscribe((res)=>{
         alert("Product Added Successfully");
         this.productFrom.reset();
         this.dailogref.close('save');
        })
      } else {
       alert("Please fill all the fields");
      }
    }else{
      this.updateProduct();
    }
  }

  updateProduct(){
      this.api.putProduct(this.productFrom.value,this.editData.id).subscribe((res)=>{
       alert("Product Updated Successfully");
       this.productFrom.reset();
       this.dailogref.close('update');
      }
      
      )
  }

}
