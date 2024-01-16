import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { constante } from 'src/app/system-models/constantes';
import { SeguridadService } from '../../seguridad.service';

@Component({
  selector: 'app-form-dialog-constantes',
  templateUrl: './form-dialog-constantes.component.html',
  styleUrls: ['./form-dialog-constantes.component.sass']
})
export class FormDialogConstantesComponent implements OnInit {
  dialogTitle: string;
  accion: string;
  _constante : constante;
  constanteForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<FormDialogConstantesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private seguridadService : SeguridadService,) {
      this.accion = data.accion;
      if (this.accion === 'editar') {
        this.dialogTitle = 'Constante: '+data.constante.codigo +' - '+data.constante.nombre +' - '+data.constante.valor;
        this._constante = data.constante;
      } else {
        this.dialogTitle = 'Nueva Constante';
        this._constante = { 
          id: 0,
          codigo: '',
          nombre: '',
          valor: 0,
          fechaRegistro: new Date(),
          esActivo: 1
        };
      }
      this.constanteForm = this.createContactForm();
   }
   createContactForm(): FormGroup<any> {
    return this.fb.group({
      id : [this._constante.id],
      codigo : [this._constante.codigo, [Validators.required]],
      nombre : [this._constante.nombre, [Validators.required]],
      valor : [this._constante.valor, [Validators.required]],
      fechaRegistro: [this._constante.fechaRegistro],
      esActivo : [this._constante.esActivo, [Validators.required]],
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
    //////////////console.log("par: ",this.constanteForm.getRawValue());
    let constante :constante= this.constanteForm.getRawValue();
    //////////////console.log("constante: ",constante);    
    constante.esActivo = Number(this.constanteForm.getRawValue().esActivo);
    constante.codigo = this.constanteForm.getRawValue().codigo.toString().toUpperCase();
    if(this.accion == 'editar'){      
      this.seguridadService.updateConstantes(constante).subscribe(res =>{
        this.onNoClick();
      })
    }else{
      this.seguridadService.insertConstantes(constante).subscribe(res =>{
        this.onNoClick();
      })
    }
    

  }
}
