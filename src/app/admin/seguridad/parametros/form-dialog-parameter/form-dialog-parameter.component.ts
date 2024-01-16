import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { parametro } from 'src/app/system-models/parametros';
import { SeguridadService } from '../../seguridad.service';

@Component({
  selector: 'app-form-dialog-parameter',
  templateUrl: './form-dialog-parameter.component.html',
  styleUrls: ['./form-dialog-parameter.component.sass']
})
export class FormDialogParameterComponent implements OnInit {
  dialogTitle: string;
  accion: string;
  _parametro : parametro;
  parametroForm: FormGroup;  
  constructor(public dialogRef: MatDialogRef<FormDialogParameterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private seguridadService : SeguridadService,) {
      this.accion = data.accion;
      if (this.accion === 'editar') {        
        this.dialogTitle = 'Parámetro: '+data.parametro.codigo +' - '+data.parametro.nombre;
        this._parametro = data.parametro;
      } else {
        this.dialogTitle = 'Nuevo Parámetro';
        this._parametro = { 
          id: 0,
          codigo: '',
          nombre: '',
          esActivo: 1
        };
      }
      this.parametroForm = this.createContactForm();
     }
  createContactForm(): FormGroup<any> {
    return this.fb.group({
      id : [this._parametro.id],
      codigo : [this._parametro.codigo, [Validators.required]],
      nombre : [this._parametro.nombre, [Validators.required]],
      esActivo : [this._parametro.esActivo, [Validators.required]],
    })
  }

  ngOnInit(): void {
    ////////////console.log("data: ", this.data)
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    ////////////console.log("par: ",this.parametroForm.getRawValue());
    let parameto :parametro= this.parametroForm.getRawValue();
    parameto.esActivo = Number(this.parametroForm.getRawValue().esActivo)
    parameto.codigo = this.parametroForm.getRawValue().codigo.toString().toUpperCase();
    if(this.accion == 'editar'){
      this.seguridadService.updateParametro(parameto).subscribe(res =>{
        this.onNoClick();
      })
    }else{
      this.seguridadService.insertParametro(parameto).subscribe(res =>{
        this.onNoClick();
      })
    }
    

  }
}
