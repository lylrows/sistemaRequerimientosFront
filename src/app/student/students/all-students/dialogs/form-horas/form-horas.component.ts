import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { incidenciaObj } from 'src/app/system-models/incidencia';
import { StudentsService } from '../../students.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-horas',
  templateUrl: './form-horas.component.html',
  styleUrls: ['./form-horas.component.sass']
})
export class FormHorasComponent implements OnInit {
  horasForm: FormGroup;
  incidenciaObj:incidenciaObj ={
    id: 0,
    idTicket:0,
    idEmpSist: 0,
    idUsuarioRegistro: 0,
    idTipoIncidencia: 0,
    idSubtipoIncidencia: 0,
    idTipificacion: 0,
    nombre: '',
    fechaRegistro: '',
    idPrioridad: 0,
    idEstado: 0,
    fechaAtencion: undefined,
    calificacionIncidente: 0,
    cumplioANS: 0,
    horasEstimadas: 0,
    horasEjecutadas: 0,
    idUsuarioActualiza: 0,
    fechaActualiza: '',
    esActivo: 0
  };
  constructor(public dialogRef: MatDialogRef<FormHorasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private StudentsService : StudentsService,
    private snackBar: MatSnackBar) { 
      this.LoadParameters();
      this.horasForm = this.createHorasForm();
      ////console.log("dataInc:", data)
    }
  LoadParameters() {
    this.StudentsService.getIncidencia(this.data.idIncidencia).subscribe(res =>{
      ////console.log("incidenciaObj:", res.objModel);
      this.incidenciaObj = res.objModel;
      this.horasForm = this.createHorasForm();
    })
  }
  createHorasForm(): FormGroup<any> {
    return this.fb.group({
      horasEstimadas : [this.incidenciaObj.horasEstimadas, Validators.required],
      horasEjecutadas : [this.incidenciaObj.horasEjecutadas, Validators.required,]
    })
  }

  ngOnInit(): void {
  }
  actualizarHoras(){
    let form = this.horasForm.value;
    this.incidenciaObj.horasEstimadas = form.horasEstimadas;
      this.incidenciaObj.horasEjecutadas = form.horasEjecutadas;
      ////console.log("IncUpdate", this.incidenciaObj)
      this.StudentsService.updateIncidencias(this.incidenciaObj).subscribe(res =>{
        if(res.objModel){
          this.dialogRef.close(1);
        }
      }) 
    //////console.log("form:",this.horasForm.value)    
    // if(form.horasEjecutadas > form. horasEstimadas){
    //   this.snackBar.open('Las horas ejecutadas deben ser menores o iguales a las horas estimadas.', '', {
    //     duration: 8000,
    //     verticalPosition: 'bottom',
    //     horizontalPosition: 'center',
    //     panelClass: 'snackbar-danger',
    //   });
    //   return;
    // }else{
    //   this.incidenciaObj.horasEstimadas = form.horasEstimadas;
    //   this.incidenciaObj.horasEjecutadas = form.horasEjecutadas;
    //   ////console.log("IncUpdate", this.incidenciaObj)
    //   this.StudentsService.updateIncidencias(this.incidenciaObj).subscribe(res =>{
    //     if(res.objModel){
    //       this.dialogRef.close(1);
    //     }
    //   })      
    // }    
  }
  cancelar(){
    this.dialogRef.close();
  } 
  
}
