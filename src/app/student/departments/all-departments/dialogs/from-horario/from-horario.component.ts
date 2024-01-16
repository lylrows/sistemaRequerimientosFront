import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeguridadService } from 'src/app/admin/seguridad/seguridad.service';
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
  constructor(public dialogRef: MatDialogRef<FromHorarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private seguridadService : SeguridadService,) { 
      ////////////console.log("data", data)
    }
    systemList: any[]=[{
      "id":1,
      "nombreSistema":"Lunes",
      "checked":false
    },
    {
      "id":2,
      "nombreSistema":"Martes",
      "checked":false
    },
    {
      "id":3,
      "nombreSistema":"Miercoles",
      "checked":false
    },
    {
      "id":4,
      "nombreSistema":"Jueves",
      "checked":false
    },
    {
      "id":5,
      "nombreSistema":"Viernes",
      "checked":false
    },
    {
      "id":6,
      "nombreSistema":"Sabado",
      "checked":false
    }
  ]


  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void{    
    ////////////console.log("list: ");

  }
}
