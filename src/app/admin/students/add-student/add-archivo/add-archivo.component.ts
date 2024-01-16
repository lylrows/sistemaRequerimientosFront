import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-archivo',
  templateUrl: './add-archivo.component.html',
  styleUrls: ['./add-archivo.component.sass']
})
export class AddArchivoComponent implements OnInit {
  stdForm: FormGroup
  breadscrums = [
    {
      title: 'Agregar Archivo',
      items: ['Archivo'],
      active: 'Agregar Archivo',
    },
  ];
  constructor(public dialogRef: MatDialogRef<AddArchivoComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) { 
    this.stdForm = this.createContactForm();
  }
  createContactForm(): FormGroup<any> {
    return this.fb.group({
      uploadFile:['']
    })
  }

  ngOnInit(): void {
  }
  
  confirmAdd(){

  }
  onNoClick(){
    this.dialogRef.close();
  }

}
