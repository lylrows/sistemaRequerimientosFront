import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-archivo',
  templateUrl: './add-archivo.component.html',
  styleUrls: ['./add-archivo.component.sass']
})
export class AddArchivoComponent implements OnInit {
  stdForm: UntypedFormGroup
  breadscrums = [
    {
      title: 'Agregar Archivo',
      items: ['Archivo'],
      active: 'Agregar Archivo',
    },
  ];
  constructor(public dialogRef: MatDialogRef<AddArchivoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }
  onSubmit() {
    //////////console.log('Form Value', this.stdForm.value);
  }
  confirmAdd(){

  }
  onNoClick(){
    this.dialogRef.close();
  }

}
