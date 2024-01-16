import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-form-imagen-detail',
  templateUrl: './form-imagen-detail.component.html',
  styleUrls: ['./form-imagen-detail.component.sass']
})
export class FormImagenDetailComponent implements OnInit {
  listImg: any= [];
  listImg1: any=[];
  constructor(public dialogRef: MatDialogRef<FormImagenDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private sanitizer: DomSanitizer) { 
    //////////console.log("data",data);
    this.listImg.push(data.img);
    this.listImg1.push(data.pp);
    //////////console.log("img",this.listImg);
    }
  

  ngOnInit(): void {
  }
  extraerBase64 = async ($event: any) => new Promise((resolve, reject)=>{
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base:null
        });
      };
      }catch (e){
      return null;
      }
  })

}
