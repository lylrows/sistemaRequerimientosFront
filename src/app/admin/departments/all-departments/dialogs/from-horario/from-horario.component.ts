import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeguridadService } from 'src/app/admin/seguridad/seguridad.service';
import { Dia, empresaHorarios, horarioEmpresaListDTO } from 'src/app/system-models/empresaSistena';
@Component({
  selector: 'app-from-horario',
  templateUrl: './from-horario.component.html',
  styleUrls: ['./from-horario.component.sass']
})
export class FromHorarioComponent implements OnInit {

  startDate = new Date(1990, 0, 1);
  date = new UntypedFormControl(new Date());
  serializedDate = new UntypedFormControl(new Date().toISOString());
  minDate: Date;
  maxDate: Date;  

  breadscrums = [
    {
      title: 'Basic',
      items: ['Forms'],
      active: 'Basic',
    },
  ];
  horarioForm: FormGroup;
  _dias : Dia[]=[];
  horarioEmpresa: horarioEmpresaListDTO = {
    dias: this._dias,
    fechaInicio: new Date(),
    fechaFin: new Date(),
    idHorario: 0
  }
  empresaHorarioObj:any={
    id: 0,
    idEmpresa: 0,
    diasAtencion: '',
    fechaInicio: new Date(),
    horaInicio: {},
    fechaFin: new Date(),
    horaFin: {},
    esActivo: 1
  }
  constructor(public dialogRef: MatDialogRef<FromHorarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private seguridadService : SeguridadService,
    private miDatePipe: DatePipe) { 
      ////////////console.log("data", data)
      this.LoadData(data.id);
      this.horarioForm = this.createContactForm();
    }
  LoadData(id: number) {
    this.seguridadService.getHorarioEmpresaList(id).subscribe(res=>{
      this.horarioEmpresa = res.objModel;
      ////////////console.log("horarioEmpresa", this.horarioEmpresa)
      this.horarioForm = this.createContactForm();
    })
  }
  createContactForm(): FormGroup<any> {
    return this.fb.group({
      horaFin:[this.horarioEmpresa.fechaFin],
      horaInicio:[this.horarioEmpresa.fechaInicio],
     
    })
  }
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void{    
    ////////////console.log("form: ", this.horarioForm.value);
    ////////////console.log("horarioEmpresa: ", this.horarioEmpresa.dias);
    this.horarioEmpresa.dias.forEach(element => {
      if(element.checked){
        this.empresaHorarioObj.diasAtencion = this.empresaHorarioObj.diasAtencion + element.dia+';';
      }
    });
    this.empresaHorarioObj.fechaInicio =this.miDatePipe.transform(this.horarioForm.value.horaInicio, 'yyyy-MM-ddTHH:mm:ss');;
    this.empresaHorarioObj.fechaFin = this.miDatePipe.transform(this.horarioForm.value.horaFin, 'yyyy-MM-ddTHH:mm:ss');;
    this.empresaHorarioObj.idEmpresa = this.data.id;
    const fechaFormateada = this.miDatePipe.transform(this.horarioForm.value.horaInicio, 'yyyy-MM-ddTHH:mm:ss');
    ////////////console.log("fechaFormateada", fechaFormateada)
    if(this.horarioEmpresa.idHorario === 0){
      //insert
      ////////////console.log("empresaHorarioObj",this.empresaHorarioObj);
      this.seguridadService.insertEmpresahorario(this.empresaHorarioObj).subscribe(res => {
       this.dialogRef.close(1);
      })
    }else{
      //update
      this.empresaHorarioObj.id = this.horarioEmpresa.idHorario;
      ////////////console.log("empresaHorarioObj",this.empresaHorarioObj);
      this.seguridadService.updateEmpresahorario(this.empresaHorarioObj).subscribe(res => {
       this.dialogRef.close(1);       
      })
    }
  }
  selection(ss, event){
    ////////////console.log("ss", ss)
    ////////////console.log("event", event)
    this.horarioEmpresa.dias.forEach(element => {
      if(ss.dia == element.dia){
        element.checked=event;
      }
    });
  }
}
