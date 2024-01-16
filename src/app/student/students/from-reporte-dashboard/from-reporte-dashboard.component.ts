import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as shape from 'd3-shape';
import { EChartsOption } from 'echarts';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexStroke,
  ApexLegend,
  ApexMarkers,
  ApexGrid,
  ApexFill,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';
import { dashSoporteReporte } from 'src/app/system-models/incidencia';
import { StudentsService } from '../all-students/students.service';

@Component({
  selector: 'app-from-reporte-dashboard',
  templateUrl: './from-reporte-dashboard.component.html',
  styleUrls: ['./from-reporte-dashboard.component.sass']
})
export class FromReporteDashboardComponent implements OnInit {
soporteDash: dashSoporteReporte={
  idUsuarioAsignado: 0,
  mesInicio: 0,
  mesFin: 0
}
filterFormsSoporte: FormGroup;
  serie: any[]=[];
  multi: any;
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
  series: any;
  constructor(
    public studentsService: StudentsService,
    private fb: FormBuilder,
  ) { 
    this.filterFormsSoporte = this.createFilterForms();
  }

  ngOnInit(): void {
     
  }
  createFilterForms(): FormGroup<any> {
    return this.fb.group({
       mesIni: [''],
       anho: [''],
       idEmpresa: [''],
      mesFin:['']
    })
  }
  
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
  };
  gradient = true;
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  linexAxisLabel = 'Fechas';
  lineyAxisLabel = 'Horas';
  shapeChartCurve = shape.curveBasis;
  autoScale = true;
  timeline = true;
  dashReporte(){
    let users = JSON.parse(localStorage.getItem('currentUser'));
    this.soporteDash.idUsuarioAsignado=users.id;
    this.soporteDash.mesInicio=this.filterFormsSoporte.value.mesIni;
    this.soporteDash.mesFin=this.filterFormsSoporte.value.mesFin;
    ////console.log("dato",this.soporteDash);
    this.studentsService.getFactorRendimientoAsignado(this.soporteDash).subscribe( res =>{
      
      this.serie.push(res.objModel);
      this.series = res.objModel;
      //console.log("data",this.serie)
      this.multi = this.series;
    })
  
  this.serie[0];
  [
      {
        name: 'sigma',
        series: [
          {
            name: '22-01',
            value: 20,
          },
          {
            name: '22-02',
            value: 20,
          },
          {
            name: '22-03',
            value: 20,
          },
          {
            name: '22-04',
            value: 20,
          },
        ],
      },
      {
        name: 'Usadas',
        series: [
          {
            name: '22-01',
            value: 26,
          },
          {
            name: '22-02',
            value: 38.5,
          },
          {
            name: '22-03',
            value: 58,
          },
          {
            name: '22-04',
            value: 36,
          },
        ],
      },
      {
        name: 'Cambio de datos',
        series: [
          {
            name: '22-01',
            value: 20,
          },
          {
            name: '22-02',
            value: 20,
          },
          {
            name: '22-03',
            value: 22,
          },
          {
            name: '22-04',
            value: 20,
          },
        ],
      },
      {
        name: 'Disponibles',
        series: [
          {
            name: '22-01',
            value: 10,
          },
          {
            name: '22-02',
            value: 8,
          },
          {
            name: '22-03',
            value: 9,
          },
          {
            name: '22-04',
            value: 6,
          },
        ],
      },
    ];
  
  }
  
  

}
