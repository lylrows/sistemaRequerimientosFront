import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { parametro, parametroDetalle } from 'src/app/system-models/parametros';
import { SeguridadService } from '../../seguridad.service';

@Component({
  selector: 'app-form-dialog-parameter-detail',
  templateUrl: './form-dialog-parameter-detail.component.html',
  styleUrls: ['./form-dialog-parameter-detail.component.sass']
})
export class FormDialogParameterDetailComponent implements OnInit {
  dialogTitle: string;
  accion: string;
  _parametro : parametroDetalle;
  parametroDetForm: FormGroup;
  parametrosList: parametro[];
  parametrosPadres: parametroDetalle[] = [];
  constructor(public dialogRef: MatDialogRef<FormDialogParameterDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private seguridadService : SeguridadService,) {
      //////////console.log("data:", data)
      this.accion = data.accion;
      if (this.accion === 'editar') {
        this.dialogTitle = 'Parámetro: '+data.parametro.codigo;
        this._parametro = data.parametro;        
      }else{
        this.dialogTitle = 'Nuevo Parámetro';
        this._parametro ={
          id: 0,
          idParametro:data.parametro,
          codigo: '',
          nombre: '',
          valor: '',
          valorEntero:0,
          valorAuxiliar: '',
          idParametroPadre:-1,
          esActivo: 0
        }
      }
      let event ={"value":0};
        event.value = this._parametro.idParametro;
        this.onChangeParametro(event);
      this.parametroDetForm = this.createContactForm();
      this.loadParameter();
     }
  loadParameter() {
    this.seguridadService.getParameters().subscribe(res =>{
      this.parametrosList = res.objModel;     
      ////////////console.log("res", res.objModel)     
    })
  }
  createContactForm(): FormGroup<any> {
    return this.fb.group({
      id : [this._parametro.id],
      idParametro : [this._parametro.idParametro],
      codigo : [this._parametro.codigo, [Validators.required]],
      nombre : [this._parametro.nombre, [Validators.required]],
      valor : [this._parametro.valor],
      valorEntero : [this._parametro.valorEntero],
      valorAuxiliar : [this._parametro.valorAuxiliar],
      idParametroPadre:[this._parametro.idParametroPadre],
      esActivo : [this._parametro.esActivo, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  submit(){

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    let parameto :parametroDetalle= this.parametroDetForm.getRawValue();
    parameto.esActivo = Number(this.parametroDetForm.getRawValue().esActivo)
    parameto.codigo = this.parametroDetForm.getRawValue().codigo.toString().toUpperCase();
    ////////////console.log("dataRow: ", parameto)
    if(this.accion == 'editar'){
      this.seguridadService.updateParametroDetalle(parameto).subscribe(res =>{
        this.onNoClick();
      })
    }else{
      this.seguridadService.insertParametroDetalle(parameto).subscribe(res =>{
        this.onNoClick();
      })
    }
  }
  onChangeParametro(event){    
    this.seguridadService.getParameterDetails(event.value).subscribe( res =>{
      this.parametrosPadres = res.filter( x => x.idParametroPadre == -1);
      //////////console.log("change", this.parametrosPadres)
    })
  }
}
