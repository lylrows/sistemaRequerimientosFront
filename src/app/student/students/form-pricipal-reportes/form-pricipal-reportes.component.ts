import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { beforeRead } from '@popperjs/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { reporteDash } from 'src/app/system-models/deleteObj';
import { DepartmentService } from '../../departments/all-departments/department.service';
import { StudentsService } from '../all-students/students.service';
export interface PeriodicElement1 {
  position: string;
  position1: string;
  sistema1: number;
  sistema2: number;
  sistema3: number;
  sistema4: number;
  sistema5: number;
  sistema6: number;
  total: number;
  sistemaUno: number;
  sistemaDos: number;
  sistemaTres: number;
  sistemaCuatro: number;
  sistemaCinco: number;
  sistemaSeis: number;
  totalS: number;
  sistema21: number;
  sistema22: number;
  sistema23: number;
  sistema24: number;
  sistema25: number;
  sistema26: number;
  total2: number;
  sistema31: number;
  sistema32: number;
  sistema33: number;
  sistema34: number;
  sistema35: number;
  sistema36: number;
  total3: number;
  total4:number;

}
const ELEMENT_DAT: PeriodicElement1[] = [
  {position: 'Enero',position1: 'tickets', sistema1: 1, sistema2: 1, sistema3: 1,sistema4:4,sistema5:5,sistema6:6,total:19,
  sistemaUno:1,sistemaDos:1,sistemaTres:1,sistemaCuatro:1,sistemaCinco:1,sistemaSeis:1,totalS:3,sistema21:1,sistema22:1,sistema23:1,sistema24:1
,sistema25:1,sistema26:1,total2:6,sistema31:1,sistema32:1,sistema33:1,sistema34:1,sistema35:1,sistema36:1,total3:1,total4:15},
  {position: 'Enero',position1: 'Hrs Usadas', sistema1: 1, sistema2: 1, sistema3: 1,sistema4:4,sistema5:5,sistema6:6,total:19,
  sistemaUno:1,sistemaDos:1,sistemaTres:1,sistemaCuatro:1,sistemaCinco:1,sistemaSeis:1,totalS:3,sistema21:1,sistema22:1,sistema23:1,sistema24:1
  ,sistema25:1,sistema26:1,total2:6,sistema31:1,sistema32:1,sistema33:1,sistema34:1,sistema35:1,sistema36:1,total3:1,total4:15},
  {position: 'Febrero',position1: 'tickets', sistema1: 1, sistema2: 4, sistema3: 1,sistema4:4,sistema5:5,sistema6:6,total:19,
  sistemaUno:1,sistemaDos:1,sistemaTres:1,sistemaCuatro:1,sistemaCinco:1,sistemaSeis:1,totalS:3,sistema21:1,sistema22:1,sistema23:1,sistema24:1
  ,sistema25:1,sistema26:1,total2:6,sistema31:1,sistema32:1,sistema33:1,sistema34:1,sistema35:1,sistema36:1,total3:1,total4:15},
  {position: 'Febrero',position1: 'Hrs Usadas', sistema1: 1, sistema2: 6, sistema3: 1,sistema4:4,sistema5:5,sistema6:6,total:19,
  sistemaUno:1,sistemaDos:1,sistemaTres:1,sistemaCuatro:1,sistemaCinco:1,sistemaSeis:1,totalS:3,sistema21:1,sistema22:1,sistema23:1,sistema24:1
  ,sistema25:1,sistema26:1,total2:6,sistema31:1,sistema32:1,sistema33:1,sistema34:1,sistema35:1,sistema36:1,total3:1,total4:15},

];
@Component({
  selector: 'app-form-pricipal-reportes',
  templateUrl: './form-pricipal-reportes.component.html',
  styleUrls: ['./form-pricipal-reportes.component.sass']
})
export class FormPricipalReportesComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [ 'date','indicador', 'mejoras', 'soporte', 'errores','garantia','total'];
  displayedColumns1: string[] = ['date', 'indicador', 'commerce', 'sigma','sipoc','total','commerceS','sigmaS','sipocS'
  ,'totalSs', 'commerceE', 'sigmaE','sipocE','totalE', 'commerceG', 'sigmaG','sipocG','totalG','totalAll'];
  //dataSource = ELEMENT_DATATwo;
  displayedColumns2: string[] = ['positionA','position1', 'sistema1', 'sistema2', 'sistema3', 'sistema4',
   'sistema5', 'sistema6','total'
,'sistemaUno', 'sistemaDos', 'sistemaTres', 'sistemaCuatro',
'sistemaCinco', 'sistemaSeis','totalS','sistema21', 'sistema22', 'sistema23', 'sistema24',
'sistema25', 'sistema26','total2','sistema31', 'sistema32', 'sistema33', 'sistema34',
'sistema35', 'sistema36','total3','total4'];
  dataSourceTree = ELEMENT_DAT;
  prueba:boolean = true;
  conteo =4;
  dataSourceTwo = DATO;
  sistemasListSoporteCliente: any[]=[];
  filterFormsSoporte: FormGroup;
  spanningColumns = ['priority', 'status', 'date','indicador'];
  reporteDash_ : reporteDash={
    idEmpresa: 0,
    mesInicio: 0,
    mesFin: 0,
    anio: 0
  }
  spans = [];
  tiempo: any []=[];
  meses = [
    { value: 1, text: 'Enero' },
    { value: 2, text: 'Febrero' },
    { value: 3, text: 'Marzo' },
    { value: 4, text: 'Abril' },
    { value: 5, text: 'Mayo' },
    { value: 6, text: 'Junio' },
    { value: 7, text: 'Julio' },
    { value: 8, text: 'Agosto' },
    { value: 9, text: 'Setiembre' },
    { value: 10, text: 'Octubre' },
    { value: 11, text: 'Noviembre' },
    { value: 12, text: 'Diciembre' }
  ];
  data: any;
  dataSource: any;
  sistemas: any;
  contador: any;
  sisUno: any;
  sisDos: any;
  sisTres: any;
  sisCuatro: any;
  sisCinco: any;
  sisSeis: any;
  sisSiete: any;
  sisUno1: any;
  sisDos2: any;
  sisTres3: any;
  sisCuatro4: any;
  sisCinco5: any;
  sisSeis6: any;
  sisSiete7: any;
  constructor(public studentsServ : StudentsService,
    private fb: FormBuilder,) {
    super();
    // this.cacheSpan('priority', d => d.priority);
    // this.cacheSpan('status', d => d.priority + d.status);
    // this.cacheSpan('dateCreated', d => d.priority + d.status + d.dateCreated);
    this.cacheSpan('date', d => d.date);
    this.cacheSpan1('positionA', d => d.position);
    this.filterFormsSoporte = this.createFilterForms();
  }
  
  ngOnInit(): void {
    this.studentsServ.obtenerEmpresaCliente().subscribe(respon=>{
         this.sistemasListSoporteCliente= respon.objModel;
    });
    this.TodoCtrls();

  }
  createFilterForms(): FormGroup<any> {
    return this.fb.group({
       mesIni: [''],
       anho: [''],
       idEmpresa: [''],
      mesFin:['']
    })
  }
  buscar(){
    this.prueba=false;
    let users = JSON.parse(localStorage.getItem('currentUser'));
    this.reporteDash_.idEmpresa = this.filterFormsSoporte.value.idEmpresa;
    this.reporteDash_.anio = this.filterFormsSoporte.value.anho;
    this.reporteDash_.mesInicio = this.filterFormsSoporte.value.mesIni;
    this.reporteDash_.mesFin = this.filterFormsSoporte.value.mesFin;
    ////console.log("busqueda",this.reporteDash_);
    this.studentsServ.getReporteTipif(this.reporteDash_).subscribe(res=>{
      this.data = res.objModel;
      this.dataSource = this.data;
    })
    this.studentsServ.getSistemasByEmpresa(this.filterFormsSoporte.value.idEmpresa).subscribe(res=>{
      this.sistemas = res.objModel;
      //console.log("sistema",this.sistemas);
      this.contador= this.sistemas.length +1;
      for(let i =0; i<this.sistemas.length;i++){
        ////console.log("Nombre sistemas",this.sistemas[i].nombreSistema)
        this.sisUno=1;//this.sistemas[0].nombreSistema;
        this.sisDos=2;//this.sistemas[1].nombreSistema;
        this.sisTres=3;//this.sistemas[2].nombreSistema;
        this.sisCuatro=4;//this.sistemas[3].nombreSistema;
        this.sisCinco=5;//this.sistemas[4].nombreSistema;
        this.sisSeis=6;//this.sistemas[5].nombreSistema;
        this.sisSiete=7;//this.sistemas[6].nombreSistema;

        this.sisUno1=this.sistemas[0].nombreSistema;
        this.sisDos2=this.sistemas[1].nombreSistema;
        this.sisTres3=this.sistemas[2].nombreSistema;
        this.sisCuatro4=this.sistemas[3].nombreSistema;
        this.sisCinco5=this.sistemas[4].nombreSistema;
        this.sisSeis6=this.sistemas[5].nombreSistema;
        this.sisSiete7=this.sistemas[6].nombreSistema;
        
      }
      //console.log("primer sistema",this.sisUno)
      //console.log("segundo sistema",this.sisDos)
      //console.log("tercer sistema",this.sisTres)
      //console.log("cuarto sistema",this.sisCuatro)
      //console.log("quinto sistema",this.sisCinco)
      //console.log("sexto sistema",this.sisSeis)
      ////console.log("septimo sistema",this.sisSiete)
      //this.contador= this.sistemas.length +1;
      //console.log("conteo",this.contador)

    })
  }
  TodoCtrls() {
    var max = new Date().getFullYear(),
      min = max - 1,
      max = max;
 
    for (var i = min; i <= max; i++) {
      this.tiempo.push({
        "id": i
      });
    }
    //console.log("años",this.tiempo);
 
  }
  selectEmpresa(event){

  }

  /**
   * Evaluated and store an evaluation of the rowspan for each row.
   * The key determines the column it affects, and the accessor determines the
   * value that should be checked for spanning.
   */
  cacheSpan(key, accessor) {
    for (let i = 0; i < DATA.length;) {
      let currentValue = accessor(DATA[i]);
      let count = 1;

      // Iterate through the remaining rows to see how many match
      // the current value as retrieved through the accessor.
      for (let j = i + 1; j < DATA.length; j++) {        
        if (currentValue != accessor(DATA[j])) {
          break;
        }

        count++;
      } 

      if (!this.spans[i]) {
        this.spans[i] = {};
      }

      // Store the number of similar values that were found (the span)
      // and skip i to the next unique row.
      this.spans[i][key] = count;
      i += count;
    }
  }
  cacheSpan1(key, accessor) {
    for (let i = 0; i < ELEMENT_DAT.length;) {
      let currentValue = accessor(ELEMENT_DAT[i]);
      let count = 1;

      // Iterate through the remaining rows to see how many match
      // the current value as retrieved through the accessor.
      for (let j = i + 1; j < ELEMENT_DAT.length; j++) {        
        if (currentValue != accessor(ELEMENT_DAT[j])) {
          break;
        }

        count++;
      } 

      if (!this.spans[i]) {
        this.spans[i] = {};
      }

      // Store the number of similar values that were found (the span)
      // and skip i to the next unique row.
      this.spans[i][key] = count;
      i += count;
    }
  }

  getRowSpan(col, index) {
    return this.spans[index] && this.spans[index][col];
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  //indicador: string;
  weight: number;
  symbol: string;
}
export interface PeriodicElementOne {
  name: string;
  position: number;
  indicador1: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

const DATA = [
  { date: '12/12/12', incicador:'Tickets',mejoras: 545, soporte: 45, errores: 12, garantia: 4,total: 18},
  { date: '12/12/12', incicador:'Hrs Usadas',mejoras: 546, soporte: 455, errores: 12, garantia: 4,total: 18},
  { date: '11/12/12', incicador:'Tickets',mejoras: 545, soporte: 45, errores: 45, garantia: 4,total: 18},
  { date: '11/12/12', incicador:'Hrs Usadas',mejoras: 545, soporte: 45, errores: 12, garantia: 4,total: 18},
  { date: '12/12/12', incicador:'Tickets',mejoras: 545, soporte: 45, errores: 45, garantia: 4,total: 18},
  { date: '12/12/12', incicador:'Hrs Usadas',mejoras: 545, soporte: 45, errores: 12, garantia: 4,total: 18},

]
const DATOS =[]
const DATO = [
  { date: '12/12/12', incicador:'Tickets',commerce: 1, sigma: 2, sipoc: 3,total:6,commerceS: 1, sigmasS: 4, sipocS: 7,totalS:12,commerceE: 1, sigmaE: 2, sipocE: 3,totalE:6,commerceG: 1, sigmaG: 2, sipocG: 3,totalG:6,totalAll:30 },
  { date: '12/12/12', incicador:'Hrs Usadas',commerce: 3, sigma: 2, sipoc: 1,total:6,commerceS: 7, sigmasS: 4, sipocS: 1,totalS:12,commerceE: 1, sigmaE: 2, sipocE: 3,totalE:6,commerceG: 1, sigmaG: 2, sipocG: 3,totalG:6,totalAll:30 },
  { date: '11/12/12', incicador:'Tickets',commerce: 3, sigma: 2, sipoc: 1,total:6,commerceS: 1, sigmasS: 4, sipocS: 7,totalS:12,commerceE: 1, sigmaE: 2, sipocE: 3,totalE:6,commerceG: 1, sigmaG: 2, sipocG: 3,totalG:6,totalAll:30 },
  { date: '11/12/12', incicador:'Hrs Usadas',commerce: 1, sigma: 2, sipoc: 3,total:6,commerceS: 7, sigmasS: 4, sipocS: 1,totalS:12,commerceE: 1, sigmaE: 2, sipocE: 3,totalE:6,commerceG: 1, sigmaG: 2, sipocG: 3,totalG:6 ,totalAll:30},
  { date: '12/12/12', incicador:'Tickets',commerce: 1, sigma: 2, sipoc: 3,total:6,commerceS: 1, sigmasS: 4, sipocS: 7,totalS:12,commerceE: 1, sigmaE: 2, sipocE: 3,totalE:6,commerceG: 1, sigmaG: 2, sipocG: 3,totalG:6 ,totalAll:30},
  { date: '12/12/12', incicador:'Hrs Usadas',commerce: 3, sigma: 2, sipoc: 1,total:6,commerceS: 7, sigmasS: 4, sipocS: 1,totalS:12,commerceE: 1, sigmaE: 2, sipocE: 3,totalE:6,commerceG: 1, sigmaG: 2, sipocG: 3,totalG:6 ,totalAll:30},

]

const ELEMENT_DATATwo: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
]


