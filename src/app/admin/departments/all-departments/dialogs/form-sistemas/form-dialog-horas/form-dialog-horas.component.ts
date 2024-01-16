import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeguridadService } from 'src/app/admin/seguridad/seguridad.service';

@Component({
  selector: 'app-form-dialog-horas',
  templateUrl: './form-dialog-horas.component.html',
  styleUrls: ['./form-dialog-horas.component.sass']
})
export class FormDialogHorasComponent implements OnInit {
  horasForm: FormGroup;
  textMotification: string ='';
  constructor(public dialogRef: MatDialogRef<FormDialogHorasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,    
    private seguridadService : SeguridadService,
    private snackBar: MatSnackBar,) { 
      this.horasForm = this.createContactForm();
    }
  createContactForm(): FormGroup<any> {
    return this.fb.group({
      horas:[''],
      intervaloAtencion:['']
    })
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmAdd(){
    //////////console.log(this.horasForm.value)
    if(this.horasForm.value.horas == 0 || this.horasForm.value.horas == '' || this.horasForm.value.intervaloAtencion == 0 || this.horasForm.value.intervaloAtencion == ''){
      if(Number(this.horasForm.value.horas) == 0 || Number(this.horasForm.value.intervaloAtencion) == 0){
        this.textMotification='Debe ser mayor a cero!!!';

      }
      else if(this.horasForm.value.horas == ''|| this.horasForm.value.intervaloAtencion == '' ){
        this.textMotification='EL valor de horas es requerido!!!';
      }
      this.showNotification(
        'snackbar-danger',
        this.textMotification,
        'bottom',
        'center'
      );
      return;
    }else{
      this.seguridadService.horas =this.horasForm.value.horas;
      this.seguridadService.intervalo= this.horasForm.value.intervaloAtencion;
      this.dialogRef.close(1);
    }
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
