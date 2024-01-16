import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-nivel-soporte',
  templateUrl: './form-nivel-soporte.component.html',
  styleUrls: ['./form-nivel-soporte.component.sass']
})
export class FormNivelSoporteComponent implements OnInit {
  nivelForm: FormGroup;
  constructor( public dialogRef: MatDialogRef<FormNivelSoporteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,) { 
      //////////console.log("dataSis", data)
      this.nivelForm = this.fb.group({
        idNivelSoporte:['', [Validators.required]]
      })
    }
  
  ngOnInit(): void {
  }
  public confirmAdd(): void{
    this.dialogRef.close(this.nivelForm.value.idNivelSoporte);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
