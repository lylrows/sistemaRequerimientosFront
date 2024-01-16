import { Component, OnInit, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as shape from 'd3-shape';
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
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { FormClientePassComponent } from './form-cliente-pass/form-cliente-pass.component';
import { MatDialog } from '@angular/material/dialog';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import Swal from 'sweetalert2';
import { IncideciaService } from '../students/about-student/incidencia.service';
import { dashboard, dashboardAns, dashboardEmp, dashboardPendiente, dashboardPendienteGerente, dashboardSistema, dashSoporte, fecha, fechaNombre, fechaNombreobj, objPersona, series, tipif } from 'src/app/system-models/acceso';
import { StudentsService } from '../students/all-students/students.service';
import { elementAt } from 'rxjs';
import { dateToString } from 'datapipe-js/dist/utils';

export type avgLecChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

export type pieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public avgLecChartOptions: Partial<avgLecChartOptions>;
  public pieChartOptions: Partial<pieChartOptions>;
  public graph_line_chart: Partial<EChartsOption>;
  public bar_chart: Partial<EChartsOption>;
  public bar_chart1: Partial<EChartsOption>;
  public graph_line_chartCuarto: Partial<EChartsOption>;
  public graph_line_chart1: Partial<EChartsOption>;
  public graph_line_chart_sistema: Partial<EChartsOption>;
  data_rangoFechas: any []=[];
  filterForms:FormGroup;
  filterForms2: FormGroup;
  filterForms3: FormGroup;
  filterforms4: FormGroup;
  filterFormsSis: FormGroup;
  legendPosition = 'right';
  

  

  gaugeValue: number;
  //gaugeValue = 28.3;
  gaugeSize = 100;
  guageThick = 8;
  guageType1 = 'full';
  guageType2 = 'semi';
  guageType3 = 'arch';
  breadscrums = [
    {
      title: 'Dashboard',
      items: ['Cliente'],
      active: 'Dashboard',
    },
  ];
  user: any;
  // vaericle bar chart start
  vbarxAxisLabel = 'Country';
  vbaryAxisLabel = 'Sales';
  // horizontal bar chart start
  hbarxAxisLabel = 'Sales';
  hbaryAxisLabel = 'Country';
  // area chart
  areaxAxisLabel = 'Year';
  areayAxisLabel = 'Sales';
  
  _cambioPersona: objPersona ={
    id: 0,
    idPerfil: 0,
    idEmpresa: 0,
    nombres: '',
    apellidos: '',
    email: '',
    tipoDocumento: 0,
    nroDocumento: '',
    direccion: '',
    telefono: '',
    celular: '',
    img: '',
    esActivo: 0,
    primeraVez: 0
  }
  dash: dashboard={
    anho: 0,
    mes: 0,
    id_usuario: 0,
    rol: 0
  }
  dashSystem: dashboardSistema={
    anho: 0,
    mes: 0,
    id_usuario: 0,
    rol: ''
  }
  dashboardEmp_ : dashboardEmp={
    anho: 0,
    mes: 0,
    id_empresa: 0,
    rol: 0
  }
  dashAns: dashboardAns={
    idEmpresa: 0,
    fechaInicio: new Date(),
    fechaFin: new Date()
  }
  dashPendiente: dashboardPendiente={
    anio: 0,
    mes: 0,
    idTipificacion: '',
    id_usuario: 0,
    rol: 0
  }
  tipifica: tipif []=[];
  tipifi: tipif={
    value: 0,
    text: ''
  }
  dashGerente: dashboardPendienteGerente={
    anio: 0,
    mes: 0,
    idTipificacion: '',
    id_empresa: 0,
    id_rol: 0
  }
  series_: series []=[]
  _seriesPrueba: any []=[];
  _seriesANS: any []=[];
  _seriesPendientes: any []=[];
  legends: string []=[];
  legendsANS: string []=[];
  legendsPendiente: string []=[];

  _series: any []=[
    {
      name: '12-01-12-07',
      type: 'bar',
      data: [22, 54, 37, 23, 25.6, 76],
      // markLine: {
      //   data: [
      //     {
      //       type: 'average',
      //     },
      //   ],
      // },
    },

    {
      name: '12-08-12-14',
      type: 'bar',
      data: [35, 45, 47, 10, 35, 70],
      // markLine: {
      //   data: [
      //     {
      //       type: 'average',
      //     },
      //   ],
      // },
    },
    {
      name: '12-15-12-21',
      type: 'bar',
      data: [50, 50, 47, 20, 35, 70],
      // markLine: {
      //   data: [
      //     {
      //       type: 'average',
      //     },
      //   ],
      // },
    },
    {
      name: '12-22-12-28',
      type: 'bar',
      data: [50, 50, 47, 20, 35, 70],
      // markLine: {
      //   data: [
      //     {
      //       type: 'average',
      //     },
      //   ],
      // },
    },
    
  ];
  fechas: fecha []=[];

  estados: any ;
  Listestados: any []=[];
  ListSistema: any []=[];
  listCliente: any []=[];
  incidenciaListaAux: any []=[];
  fechaini: any;
  tipificaciones: any;
  fechafinal: any;
  Idper: any;
  role: any;
  Tipf: string [];
  captura: any;
  rangoFecha: any[]=[];
  conteo: any[]=[];
  lista: any [];
  primerRango: any []=[];
  fechasSer: fechaNombre []=[];
  fechaprueba: fechaNombreobj[]=[];
  nombreTip: any []=[];
  nombretipi: any[]=[];
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
  tiempo: any []=[];
  toppingList: any[] = 
  [
    { value: 95, text: 'Cambio' },
    { value: 96, text: 'Consulta' },
    { value: 97, text: 'Envío Acsel-e' },
    { value: 98, text: 'Error de usuario' },
    { value: 99, text: 'Incidente' },
    { value: 100, text: 'TI Crecer' },
    { value: 101, text: 'Nuevo Requerimiento' }
  ];
    //'Cambio ', 'Consulta', 'Envío Acsel-e', 'Error de usuario', 'Incidente', 'TI Crecer','Nuevo Requerimiento'];
  
  barChartOptions: any;//{ scaleShowVerticalLines: boolean; responsive: boolean; legend: { display: boolean; labels: { fontColor: string; }; }; scales: { xAxes: { ticks: { fontFamily: string; fontColor: string; }; }[]; yAxes: { ticks: { beginAtZero: boolean; fontFamily: string; fontColor: string; }; }[]; }; };
  barChartLabels: string[];
  barChartType: string;
  barChartLegend: boolean;
  barChartData: any[];//{ data: number[]; label: string; }[];
  barChartColors: Array<any>;//{ backgroundColor: string; borderColor: string; pointBackgroundColor: string; pointBorderColor: string; pointHoverBackgroundColor: string; pointHoverBorderColor: string; }[];
  _serieANS: any []=[];
  _seriePendiente: any []=[];
  legendsTipif: any[]=[];
  tipificacion: any[]=[];
  legendSistema: any []=[];
  legendSistemas: any []=[];
  _serieSistema: any []=[];
  Incidentes: any;
  tipoIncidentes: any;
  tipo: any []=[];
  system: any;
  legendsSystem: any []=[];
  sistemasAll: any []=[];
  seriesSystem: any[]=[];
  meses_: any[]=[];
  polarAreaChartType: string;
  polarChartOptions: { animation: boolean; responsive: boolean; legend: { display: boolean; labels: { fontColor: string; }; }; };
  ploarChartColors: { backgroundColor: string[]; }[];
  polarAreaLegend: boolean;
  polarAreaChartLabels: any;
  polarAreaChartData: any[];
  dashSoporte: dashSoporte={
    id_usuario: 0,
    rol: ''
  }
  semanasEst: any;
  conteoSistema: any[]=[];
  conteoSistemaEstado: any[]=[];
  data: any[]=[];
  estadosCliente: any;
  conteoEstados: any[]=[];
  estadosAll: any[]=[];
  contadores: any;
  dia: any []=[];
  semana: any[]=[];
  mes: any[]=[];
  anho: any[]=[];
  porcentajeDia: number;
  diaPor: any []=[];
  parrafo: any []=[];
  parrafoMayor: any[]=[];
  porcentajeSem: number;
  semanaPor: any[]=[];
  parrafoSemana: any[]=[];
  parrafoMayorSemana: any[]=[];
  porcentajeMes: number;
  mesPor: any[]=[];
  parrafoMes: any[]=[];
  parrafoMayorMes: any[]=[];
  porcentajeAnho: number;
  anhoPor: any[]=[];
  parrafoAnho: any[]=[];
  parrafoMayorAnho: any[]=[];
  listTipEmpresa: any;
  listTipoTickets: any;
  today : any = new Date();
  sevenDaysAgo: any;
  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    public IncideciaService_ : IncideciaService,
    public studentsServ : StudentsService,
    private miDatePipe: DatePipe) {
      super();
    this.user= JSON.parse(localStorage.getItem('currentUser'));
    ////////////////console.log("user", this.user)
    this.filterForms = this.filterFormCreate();
    this.filterForms2 = this.busquedaSemanal();
    this.filterForms3 = this.createFilterFormsANS();
    this.filterforms4 = this.createSolicitudes();
    this.filterFormsSis = this.createSistema();
    
  }
  createSistema(): FormGroup<any> {
    return this.fb.group({
      anho:[''],
      mes: [''],
    })
  }
  createSolicitudes(): FormGroup<any> {
    return this.fb.group({
      anho:[''],
      mesSol: [''],
      tipif:[''],
    })
  }
  createFilterFormsANS(): FormGroup<any> {
    return this.fb.group({
      anho:[''],
      mesIniANS: [''],
      mesFinANS:[''],
    })
  }
  busquedaSemanal(): FormGroup<any> {
    return this.fb.group({
      fechainiSe: [''],
      fechafinSe:['']
    })
  }
  filterFormCreate(): FormGroup<any> {
    return this.fb.group({
      fechaini: [''],
      fechafin:['']
    })
  }
  ngOnInit() {
    this.sevenDaysAgo = new Date();
    this.sevenDaysAgo.setDate(this.today.getDate() - 6 )
    this.chart1();
    this.chart2();
    this.chartCinco();
    this.conteoClienteByTickets();
    this.dashSemanasByEstado()
    this.conteoPorcentaje();
    //this.chartConteoSistema();
    //this.horasSistema();
    //this.solicitudesPendientes();
    this.TodoCtrl();
    //this.mesesControl();
    //this.searchPendientes();
    //this.chart4();
    this.studentsServ.getParameterDetail(10).subscribe( res => {      
      this.Incidentes = res;
      this.tipoIncidentes = this.Incidentes.filter( x => x.idParametroPadre == -1);
      for(let i=0; i<this.tipoIncidentes.length;i++){
        this.tipo.push(this.tipoIncidentes[i].nombre);
      }
      
      //////////console.log("tipo",this.tipo);
    }) 
    
    let primera = Number(JSON.parse(localStorage.getItem('currentUser')).primeraVez);
    //////////////console.log("primera",primera);
    if(primera == 0){
      this.actualizaContra();
    } 
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.studentsServ.getListTipificaciones(user.idEmpresa).subscribe(res=>{
      this.listTipEmpresa = res.objModel.listTipificacion;
      this.listTipoTickets = res.objModel.listTipoIncidencias;
      ////console.log("tipificaciones empresa",this.listTipEmpresa);
      for (const element of this.listTipEmpresa) {
        let tipif: tipif={
          value: 0,
          text: ''
        }
         tipif.value =element.idTipificacion;
         tipif.text =element.nombre;
        this.tipifica.push(tipif);
        this.nombretipi.push(element.nombre)
        
      }
      ////console.log("tipificaciones nombre",this.nombretipi);
    })
    this.studentsServ.getParameterDetail(15).subscribe( res => {
      ////////////////console.log("res",res);
      this.tipificaciones = res;
       let tipificaciones = res;
      ////////////console.log("tipificaciones",this.tipificaciones);
      // for(let i=0; i<this.tipificaciones.length;i++){
     
      //   this.nombretipi.push(this.tipificaciones[i].nombre)
      // }
      // for (const element of tipificaciones) {
      //   let tipif: tipif={
      //     value: 0,
      //     text: ''
      //   }
      //    tipif.value =element.id;
      //    tipif.text =element.nombre;
      //   this.tipifica.push(tipif);
        
        
      // }
    })
  }  
  conteoPorcentaje() {
    let data = JSON.parse(localStorage.getItem('currentUser'));
    this.dashSoporte.id_usuario=data.id;
    this.dashSoporte.rol=data.role;
    this.studentsServ.getConteoPorcentaje(this.dashSoporte).subscribe(res=>{
      ////////console.log("primerDahs",res.objModel);
      this.contadores = res.objModel
      ////console.log("conteoPor",this.contadores);
      this.dia.push(this.contadores.conteo[0]);
      this.semana.push(this.contadores.conteo[1]);
      this.mes.push(this.contadores.conteo[2]);
      this.anho.push(this.contadores.conteo[3]);
      
      if(this.contadores.porcentaje[0]<0){
        //////console.log("dato",this.contadores.porcentaje[0])
        this.porcentajeDia = this.contadores.porcentaje[0]*-1;
        this.diaPor.push(this.porcentajeDia);
        this.parrafo.push("menos que el día anterior");
      }else if(this.contadores.porcentaje[0]>100){
        //////console.log("dato",this.contadores.porcentaje[0])
        this.diaPor.push(100);
        this.parrafoMayor.push("Mas de");
        this.parrafo.push("mas que el día anterior");
      }else{
        //////console.log("dato",this.contadores.porcentaje[0])
        this.diaPor.push(this.contadores.porcentaje[0]);
        this.parrafo.push("mas que el día anterior");
      }

      if(this.contadores.porcentaje[1]<0){
        this.porcentajeSem = this.contadores.porcentaje[1]*-1;
        this.semanaPor.push(this.porcentajeSem);
        this.parrafoSemana.push("menos que la semana anterior");
      }else if(this.contadores.porcentaje[1]>100){
        this.semanaPor.push(100);
        this.parrafoMayorSemana.push("Mas de");
        this.parrafoSemana.push("mas que la semana anterior");
      }else{
        this.semanaPor.push(this.contadores.porcentaje[1]);
        this.parrafoSemana.push("mas que la semana anterior");
      }

      if(this.contadores.porcentaje[2]<0){
        this.porcentajeMes = this.contadores.porcentaje[2]*-1;
        this.mesPor.push(this.porcentajeMes);
        this.parrafoMes.push("menos que el mes anterior");
      }else if(this.contadores.porcentaje[2]>100){
        this.mesPor.push(100);
        this.parrafoMayorMes.push( "Mas de");
        this.parrafoMes.push("mas que el mes anterior");
      }else{
        this.mesPor.push(this.contadores.porcentaje[2]);
        this.parrafoMes.push("mas que el mes anterior");
      }

      if(this.contadores.porcentaje[3]<0){
        this.porcentajeAnho = this.contadores.porcentaje[3]*-1;
        this.anhoPor.push(this.porcentajeAnho);
        this.parrafoAnho.push("menos que el año anterior");
      }else if(this.contadores.porcentaje[3]>100){
        this.anhoPor.push(100);
        this.parrafoMayorAnho.push("Mas de");
        this.parrafoAnho.push("mas que el año anterior");
      }else{
        this.anhoPor.push(this.contadores.porcentaje[3]);
        this.parrafoAnho.push("mas que el año anterior");
      }
      
      // this.semanaPor.push(this.contadores.porcentaje[1]);
      // this.mesPor.push(this.contadores.porcentaje[2]);
      // this.anhoPor.push(this.contadores.porcentaje[3]);


      // ////////console.log("dia Porcentaje",this.diaPor);
      // ////////console.log("semana Porcentaje",this.semana);
      // ////////console.log("mes Porcentaje",this.mesPor);
      // ////////console.log("año Porcentaje",this.anhoPor);
    })
  }
  conteoClienteByTickets() {
    let data = JSON.parse(localStorage.getItem('currentUser'));
    this.dashSoporte.id_usuario=data.id;
    this.dashSoporte.rol=data.role;
    this.studentsServ.getConteoByEstados(this.dashSoporte).subscribe(res=>{
      this.estadosCliente = res.objModel
      ////console.log("SegundoDahs",this.estadosCliente);
      for(let i=0; i<this.estadosCliente.conteo.length; i++){
        this.conteoEstados.push(this.estadosCliente.conteo[i])
      }
      for(let i=0; i<this.estadosCliente.estados.length; i++){
        this.estadosAll.push(this.estadosCliente.estados[i])
      }
      this.conteoCliente();
      //////////console.log("conteo",this.conteoEstados)
    })
    
  }
  dashSemanasByEstado(){
    let data = JSON.parse(localStorage.getItem('currentUser'));
    this.dashSoporte.id_usuario=data.id;
    this.dashSoporte.rol=data.role;
    this.studentsServ.getSemanasByEstadoCliente(this.dashSoporte).subscribe(res=>{
      ////////console.log("tercer dash",res.objModel);
      this.semanasEst = res.objModel;
      ////console.log("ultimo dash",this.semanasEst);
      
      for(let i=0; i<this.semanasEst.data.length; i++){
        this.conteoSistema.push(this.semanasEst.data[i])
      }
      for(let i=0; i<this.semanasEst.series.length; i++){
        this.conteoSistemaEstado.push(this.semanasEst.series[i].name)
        this.data.push(this.semanasEst.series[i]);
      }

      ////////console.log("leyenda",this.conteoSistema);
      ////////console.log("sistema",this.conteoSistemaEstado);
      ////////console.log("series",this.data);
      this.chartConteoSistema();
    })
  }
  // mesesControl(){
  //   var max = new Date().getMonth(),
    
  //   min = max ,
  //   max = max +1;

  // for (var i = min; i <= max; i++) {
  //   this.meses_.push({
  //     "id": i
  //   });
  // }
  // let abc = new Date();
  // //////console.log("mes",abc)
  // //////console.log("meses",this.meses_)
  // }
  
  TodoCtrl() {
     var max = new Date().getFullYear(),
       min = max - 1,
       max = max;
  
     for (var i = min; i <= max; i++) {
       this.tiempo.push({
         "id": i
       });
     }
     ////////////console.log("años",this.tiempo);
  
   }
  actualizaContra() {
    let data = JSON.parse(localStorage.getItem('currentUser'));
    const dialogRef = this.dialog.open(FormClientePassComponent, {
      data: data,
      
    });
    
    this.subs.sink = dialogRef.afterClosed().subscribe((result) =>{
      
       if (result === 1){
         Swal.fire({
           position: 'center',
           icon: 'success',
           title: 'Éxito',
           text:'Se actualizó el registro con éxito.',
           showConfirmButton: true,
         });
       }else if (result === 2){
         Swal.fire({
           position: 'center',
           icon: 'success',
           title: 'Éxito',
           text:'Se creó la contraseña con éxito. para el usuario: '+data.email,
           showConfirmButton: true,
         });
       }
     })
  }
  estadosList(){
    this.studentsServ.getParameterDetail(11).subscribe( res => {
      this.estados = res;
      for(let i=0; i<this.estados.length;i++){
        ////////////////console.log("estados",this.estados[i].nombre);
        this.Listestados.push(this.estados[i].nombre);
        //////////////console.log("los estados",this.Listestados);
      }
      //////////////console.log("los estados",this.Listestados);
    })
    let users= JSON.parse(localStorage.getItem('currentUser'));
    this.studentsServ.getNivelSoporteById(users.id).subscribe(res =>{
      let sistemas =res.objModel;
      //////////////console.log("servicio sistemas",sistemas);
      for(let i=0; i<sistemas.length;i++){
        this.ListSistema.push(sistemas[i].nombreSistema)
      }
      //this.ListSistema= sistemas.nombreSistema;
      //////////////console.log("sistemas",this.ListSistema);
      
    })
    this.studentsServ.getincidencias(users.role, users.id,2).subscribe(res =>{
      this.incidenciaListaAux=res.objModel;
      //////////////console.log("listaIncidencia",this.incidenciaListaAux);
      for(let i=0; i<this.incidenciaListaAux.length;i++){
        let count =0
        if(this.incidenciaListaAux[i].estado='Pendiente'){
          let abc =count +1;
          
        }
      }
      
    })
  }
  semanasmes = function() {
    var year= this.getFullYear();
    var mes = this.getMonth();
    var primerdia = new Date(year, mes-1, 1);
    var ultimodia  = new Date(year, mes, 0);
    var used         = primerdia.getDay() + ultimodia.getDate();
    return Math.ceil( used / 7);
    
  }

  searchANS(){
    let data = JSON.parse(localStorage.getItem('currentUser'));
    /*this.dashAns.anho= this.filterForms3.value.anho;
    this.dashAns.mesIniANS = this.filterForms3.value.mesIniANS;
    this.dashAns.mesFinANS= this.filterForms3.value.mesFinANS;
    this.dashAns.id_usuario= data.id;
    this.dashAns.rol= data.role;*/
    //////////console.log("dash", this.dashAns );
    this.studentsServ.getCumplimientoANS(this.dashAns).subscribe(res=>{
      this._seriesANS.push(res.objModel);
     
      
       for(let i=0; i<= this._seriesANS.length; i++){
         let abc = this._seriesANS[i].rangoFechas;
         this._serieANS =this._seriesANS[i].series
        for(let j=0; j<abc.length; j++){
          //////////console.log("abc",abc[j]);
          this.legendsANS.push(abc[j]);
        }
       
        this.chart4();
       }
       

      

      // for(let i=0; i<= this._seriesANS.rangoFechas; i++){
      //   const element = this._seriesANS[i].rangoFechas
      //   this.legendsANS.push(element);
      //   //////////console.log("element",element);
      // }
      
      ////////////console.log("leyenda",this.legendsANS);
      
    })
  }
  promedio(event){
    //////////console.log("prom",event);
  }
  
  search(){

    let data = JSON.parse(localStorage.getItem('currentUser'));
    this.dashboardEmp_.anho= this.filterForms.value.fechaini;
    //////////////console.log("fecha que manda",this.dash.fecha_ini);
    this.dashboardEmp_.mes= this.filterForms.value.fechafin;
    this.dashboardEmp_.id_empresa = data.idEmpresa;
    this.dashboardEmp_.rol = data.role;
    ////console.log("dash cliente 2",this.dashboardEmp_);
     this.studentsServ.getatencionSolicitudesByEmp(this.dashboardEmp_).subscribe(res=>{
      this._seriesPrueba = res.objModel;
        ////console.log("data",this._seriesPrueba);
        for(let i=0; i< this._seriesPrueba.length; i++){
          const element = this._seriesPrueba[i]
          this.legends.push(element.name);
        }
        //////////console.log("leyenda",this.legends);
        this.chart3();
     })
     this.legends=[''];
  //}
    
  


    // let data = JSON.parse(localStorage.getItem('currentUser'));
    // this.dash.anho= this.filterForms.value.fechaini;
    // //////////////console.log("fecha que manda",this.dash.fecha_ini);
    // this.dash.mes= this.filterForms.value.fechafin;
    // this.dash.id_usuario = data.idEmpresa;
    // this.dash.rol = data.role;
    // // let date_1: any = this.dash.fecha_ini;
    // // let date_2: any  = this.dash.fecha_fin;
    // // let day_as_milliseconds = 86400000;
    // // let diff_in_millisenconds = date_2 - date_1;
    // // let diff_in_days = diff_in_millisenconds / day_as_milliseconds;
    // // let semanas = diff_in_days / 7;
    //   //////////console.log("dash", this.dash );
    
    //  this.studentsServ.getatencionSolicitudes(this.dash).subscribe(res=>{
    //   this._seriesPrueba = res.objModel;
    //     //////////console.log("data",this._seriesPrueba);
    //     for(let i=0; i< this._seriesPrueba.length; i++){
    //       const element = this._seriesPrueba[i]
    //       this.legends.push(element.name);
    //     }
    //     //////////console.log("leyenda",this.legends);

      
  
    //     this.chart3();
    //  })
    
    //       for(let i =0; i< this.fechas.length; i++){
    //         const element = this.fechas[i];
    //         let data = element.fechaInicio + '-' + element.fechaFin;
    //         this.data_rangoFechas.push(data);
    //       }
    //  for(let i =0; i<this.data_rangoFechas.length;i++ ){
    //   const element = this.data_rangoFechas[i];
    //   let cambio = this.fechaprueba.filter(x=>x.rango == element && x.nombre == 'TI Crecer');
    //   if(cambio == undefined){
    //   this.conteo.push(0);
    //   }else{
    //   let cambioConteo= cambio.length
    //   this.conteo.push(cambioConteo);
    //   } 
    //  }

  }
  searchSistema(){
     let data = JSON.parse(localStorage.getItem('currentUser'));
     this.dash.anho= this.filterForms2.value.fechainiSe;
     this.dash.mes= this.filterForms2.value.fechafinSe;
     this.dash.id_usuario = data.id;
     this.dash.rol = data.role;  
     //////console.log(this.dash);
    this.studentsServ.getTicketSistema(this.dash).subscribe(res =>{
      this.legendSistema.push(res.objModel);
      ////////console.log("ticket Sistema",res.objModel);
      for(let i=0; i< this.legendSistema.length; i++){
        let abc = this.legendSistema[i].data
        this._serieSistema =this.legendSistema[i].series
        for(let j=0; j<abc.length; j++){
          ////////////console.log("abc",abc[j]);
          this.legendSistemas.push(abc[j]);
        }
         for(let a=0; a<this._serieSistema.length; a++){
           let prom = this._serieSistema[a].name;
           this.legendsTipif.push(prom);
         }
         //////////console.log("leyenda",this.legendSistemas);
         //////////console.log("serie",this._serieSistema);
      this.chartSegundo();
      this.legendsTipif = [''];
      this.legendSistemas = [''];
      }
      
      
    })
    
  }
  searchSistemas(){
    let data = JSON.parse(localStorage.getItem('currentUser'));
    this.dashboardEmp_.anho = this.filterFormsSis.value.anho;
    this.dashboardEmp_.mes = this.filterFormsSis.value.mes;
    this.dashboardEmp_.id_empresa = data.idEmpresa;
    this.dashboardEmp_.rol = data.role;
    ////console.log("Dash",this.dashboardEmp_);
    this.studentsServ.getTicketSystem(this.dashboardEmp_).subscribe(res =>{
      this.system =res.objModel;
    ////console.log("system",this.system)
      for(let i=0; i< this.system.series.length; i++){
        const element = this.system.series[i];
        this.legendsSystem.push(element.name);
        
        this.seriesSystem.push(element);
      }
      
      // for(let j=0; j<){
      this.sistemasAll.push(this.system.data)
      
      ////////console.log("element",this.seriesSystem);
      ////////console.log("nom",this.legendsSystem);
      ////////console.log("data",this.sistemasAll);

      this.horasSistema();
      
    })
    this.filterFormsSis.get('anho')?.setValue('');
    this.filterFormsSis.get('mes')?.setValue('');
       this.seriesSystem=[''];
       this.legendsSystem=[''];
      // this.sistemasAll[0]=[''];
  }
  searchPendientes() {
    let data = JSON.parse(localStorage.getItem('currentUser'));
    this.dashGerente.anio = this.filterforms4.value.anho;
    this.dashGerente.mes = this.filterforms4.value.mesSol;
    this.dashGerente.idTipificacion= this.filterforms4.value.tipif;
    this.dashGerente.id_empresa= data.idEmpresa;
    this.dashGerente.id_rol= 0;//data.role;
    ////console.log("dash", this.dashGerente );
    this.studentsServ.getTicketPendientes(this.dashGerente).subscribe(res =>{
      this._seriesPendientes.push(res.objModel);
      ////console.log("pendientes",res.objModel);
      for(let i=0; i<= this._seriesPendientes.length; i++){
        let abc = this._seriesPendientes[i].data;
        this._seriePendiente =this._seriesPendientes[i].series;
       for(let j=0; j<abc.length; j++){
         ////////////console.log("abc",abc[j]);
         this.legendsPendiente.push(abc[j]);
       }
        for(let a=0; a<this._seriePendiente.length; a++){
          let prom = this._seriePendiente[a].name;
          this.legendsTipif.push(prom);
        }
       this.solicitudesPendientes();
       this.legendsPendiente =[''];
       this.legendsTipif=[''];
       this._seriePendiente=[''];
      }
    })
    this.filterforms4.get('anho')?.setValue('');
    this.filterforms4.get('mesSol')?.setValue('');
    this.filterforms4.get('tipif')?.setValue('');
    // let data = JSON.parse(localStorage.getItem('currentUser'));
    // this.dashPendiente.anio = this.filterforms4.value.anho;
    // this.dashPendiente.mes = this.filterforms4.value.mesSol;
    // this.dashPendiente.idTipificacion= this.filterforms4.value.tipif;
    // this.dashPendiente.id_usuario= data.id;
    // this.dashPendiente.rol= 0;//data.role;
    // //////////console.log("dash", this.dashPendiente );
    // this.studentsServ.getTicketPendientes(this.dashPendiente).subscribe(res =>{
    //   this._seriesPendientes.push(res.objModel);
    //   //////console.log("pendientes",res.objModel);
    //   for(let i=0; i<= this._seriesPendientes.length; i++){
    //     let abc = this._seriesPendientes[i].data;
    //     this._seriePendiente =this._seriesPendientes[i].series;
    //    for(let j=0; j<abc.length; j++){
    //      ////////////console.log("abc",abc[j]);
    //      this.legendsPendiente.push(abc[j]);
    //    }
    //     for(let a=0; a<this._seriePendiente.length; a++){
    //       let prom = this._seriePendiente[a].name;
    //       this.legendsTipif.push(prom);
    //     }
        
    //    //////////console.log("element",this.legendsPendiente);
    //    //////////console.log("serie",this._seriePendiente);
    //    this.solicitudesPendientes();
    //    this.legendsPendiente =[''];
    //    this.legendsTipif=[''];
    //    this._seriePendiente=[''];
    //   }
      
    // })
    
    // // this.legendsPendiente=[];
    // //   this._seriePendiente=[];
    // //   this.legendsTipif=[];
    // this.filterforms4.get('anho')?.setValue('');
    // this.filterforms4.get('mesSol')?.setValue('');
    // this.filterforms4.get('tipif')?.setValue('');

  }

  private chart1() {
    this.avgLecChartOptions = {
      // series: [
      //   {
      //     name: 'Nro. Incidencias',
      //     data: [65, 72, 62, 73, 66, 74, 63, 67],
      //   },
      // ],
      chart: {
        height: 350,
        type: 'line',
        foreColor: '#9aa0ac',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
        title: {
          text: 'Meses',
        },
      },
      yaxis: {},
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#35fdd8'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      markers: {
        size: 4,
        colors: ['#FFA41B'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  // quinto dash
  private chart2() {
    this.pieChartOptions = {
      series: [15, 55, 13, 0, 22],
      chart: {
        type: 'donut',
        width: 200,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['Cerradas OK', 'Resueltas', 'Por Resolver', '', 'En Ateción'],
      responsive: [
        {
          breakpoint: 480,
          options: {},
        },
      ],
    };
  }

  //Primer Cuadro
  public chart3 (){
  this.graph_line_chart = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: this.legends,//['12-01-12-07','12-08-12-14','12-15-12-21'],//this.data_rangoFechas,
      textStyle: {
        color: '#9aa0ac',
      },
    },
    toolbox: {
      show: !1,
    },
    xAxis: [
      {
        type: 'category',
        data: this.nombretipi,//['cambio','consulta','Envio-Accel','Error de usuario','Incidente','TI Crecer'],
        axisLabel: {
          fontSize: 8,
          color: '#9aa0ac',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          fontSize: 10,
          color: '#9aa0ac',
        },
      },
    ],
    series: this._seriesPrueba,//this._series,
    
    color: ['#9f78ff', '#32cafe','#c90076','#10e817' ],
  };
}
//Segundo Cuadro
public chartSegundo(){
  this.bar_chart = {
    grid: {
      top: '6',
      right: '0',
      bottom: '17',
      left: '25',
    },
    xAxis: {
      data: this.legendSistemas,//['14-21', '22-27', '28-04', '05-11', '12-18','20-24'],

      axisLabel: {
        fontSize: 10,
        color: '#9aa0ac',
      },
    },
    tooltip: {
      show: true,
      showContent: true,
      alwaysShowContent: false,
      triggerOn: 'mousemove',
      trigger: 'axis',
    },
    yAxis: {
      axisLabel: {
        fontSize: 10,
        color: '#9aa0ac',
      },
    },
    series:this._serieSistema,
    color: ['#A3A09D', '#32cafe','#c90076'],
  };
}

  public chartCinco(){
  this.bar_chart1 = {
    grid: {
      top: '6',
      right: '0',
      bottom: '17',
      left: '25',
    },
    xAxis: {
      data: ['14-20', '21-27', '28-04', '05-11', '12-18'],

      axisLabel: {
        fontSize: 10,
        color: '#9aa0ac',
      },
    },
    tooltip: {
      show: true,
      showContent: true,
      alwaysShowContent: false,
      triggerOn: 'mousemove',
      trigger: 'axis',
    },
    yAxis: {
      axisLabel: {
        fontSize: 10,
        color: '#9aa0ac',
      },
    },
    series: [
      {
        name: 'sipoc',
        type: 'bar',
        data: [13, 14, 10, 16, 11, 13],
      },

      {
        name: 'e-commerce',
        type: 'bar',
        data: [10, 14, 10, 15, 9, 25],
      },
      {
        name: 'sigma',
        type: 'bar',
        data: [15, 14, 10, 20, 18, 25],
      },
    ],
    color: ['#A3A09D', '#32cafe','#c90076'],
  };
}




///Tercer Grafico
  public chart4(){
  this.barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontColor: '#9aa0ac',
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontFamily: 'Poppins',
            fontColor: '#9aa0ac', // Font Color
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontFamily: 'Poppins',
            fontColor: '#9aa0ac', // Font Color
          },
        },
      ],
    },
  };

  this.barChartLabels = this.legendsANS;
  this.barChartType = 'bar';
  this.barChartLegend = true;

  this.barChartData = this._serieANS;

  this.barChartColors = [
    {
      backgroundColor: 'rgba(109, 144, 232, 0.8)',
      borderColor: 'rgba(109, 144, 232,1)',
      pointBackgroundColor: 'rgba(109, 144, 232,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(109, 144, 232,0.8)',
    },
    {
      backgroundColor: 'rgba(255, 140, 96, 0.8)',
      borderColor: 'rgba(255, 140, 96,1)',
      pointBackgroundColor: 'rgba(255, 140, 96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 140, 96,0.8)',
    },
  ];
  }
  ///////////////////////////////////
  public horasSistema(){
    this.graph_line_chart1= {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: this.legendsSystem,//['Redes y comunicaciones', 'Software y Sistemas', 'Hardware y equipos', 'Data y Base de datos', 'Consultas'],
        textStyle: {
          color: '#9aa0ac',
        },
      },
      toolbox: {
        show: !1,
      },
      xAxis: [
        {
          type: 'category',
          data: this.sistemasAll[0],//['Sigma', 'Sipoc' , 'Ecomerce', 'Conciliación'],
          axisLabel: {
            fontSize: 6,
            color: '#9aa0ac',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            fontSize: 10,
            color: '#9aa0ac',
          },
        },
      ],
       series: this.seriesSystem,
     
      color: ['#9f78ff', '#32cafe','#ba3d22','#e38819','#79e619','#2f914c','#2b16e0'],
    };
  }
  
  ////////cuarto cuadro
  public solicitudesPendientes (){
  this.graph_line_chartCuarto = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: this.legendsTipif,
      textStyle: {
        color: '#9aa0ac',
      },
    },
    toolbox: {
      show: !1,
    },
    xAxis: [
      {
        type: 'category',
        data: this.legendsPendiente,
        axisLabel: {
          fontSize: 10,
          color: '#9aa0ac',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          fontSize: 10,
          color: '#9aa0ac',
        },
      },
    ],
     series:this._seriePendiente,
  
    color: ['#9f78ff', '#32cafe','#ba3d22','#e38819','#79e619','#2f914c','#2b16e0'],
  };
}
  ////////////////////
  // public barChartOptions1: any = {
  //   scaleShowVerticalLines: false,
  //   responsive: true,
  //   legend: {
  //     display: true,
  //     labels: {
  //       fontColor: '#9aa0ac',
  //     },
  //   },
  //   scales: {
  //     xAxes: [
  //       {
  //         ticks: {
  //           fontFamily: 'Poppins',
  //           fontColor: '#9aa0ac', // Font Color
  //         },
  //       },
  //     ],
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //           fontFamily: 'Poppins',
  //           fontColor: '#9aa0ac', // Font Color
  //         },
  //       },
  //     ],
  //   },
  // };
  // public barChartLabels1: string[] = [
  //   '2001',
  //   '2002',
  //   '2003',
  //   '2004',
  //   '2005',
  //   '2006',
  //   '2007',
  // ];
  // public barChartType1 = 'bar';
  // public barChartLegend1 = true;

  // public barChartData1: any[] = [
  //   { data: [58, 60, 74, 78, 55, 64, 42], label: 'Series C' },
  //   { data: [30, 45, 51, 22, 79, 35, 82], label: 'Series D' },
  // ];

  // public barChartColors1: Array<any> = [
  //   {
  //     backgroundColor: 'rgba(109, 144, 232, 0.8)',
  //     borderColor: 'rgba(109, 144, 232,1)',
  //     pointBackgroundColor: 'rgba(109, 144, 232,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(109, 144, 232,0.8)',
  //   },
  //   {
  //     backgroundColor: 'rgba(255, 140, 96, 0.8)',
  //     borderColor: 'rgba(255, 140, 96,1)',
  //     pointBackgroundColor: 'rgba(255, 140, 96,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(255, 140, 96,0.8)',
  //   },
  // ];


  ////////////////////////Sexto dash
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
  public multi = [
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
  public chartConteoSistema (){
    this.graph_line_chart_sistema = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: this.conteoSistemaEstado,//['atendido','conforme','pendiente'],//
        textStyle: {
          color: '#9aa0ac',
        },
      },
      toolbox: {
        show: !1,
      },
      xAxis: [
        {
          type: 'category',
          data: this.conteoSistema,//['sigma','sipoc'],//
          axisLabel: {
            fontSize: 8,
            color: '#9aa0ac',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            fontSize: 10,
            color: '#9aa0ac',
          },
        },
      ],
      series:this.data ,
    //   [
    //     {
    //     name: 'atendido',
    //     type: 'bar',
    //     data: [35, 45],
        
    //   },
    //   {
    //     name: 'conforme',
    //     type: 'bar',
    //     data: [35, 45],
        
    //   },
    //   {
    //     name: 'pendiente',
    //     type: 'bar',
    //     data: [35, 45],
        
    //   },
    // ],
      
      color: ['#9f78ff', '#32cafe','#c90076','#10e817' ],
    };
  }
    
  
  /////////////////////////
  public conteoCliente(){
    this.polarAreaChartLabels = this.estadosAll,
    
    this.polarAreaChartData= this.conteoEstados;
    this.polarAreaLegend = true;
    this.ploarChartColors= [
      {
        backgroundColor: ['#60A3F6', '#7C59E7', '#DD6811', '#5BCFA5'],
      },
    ];
  
    this.polarAreaChartType = 'polarArea';
    this.polarChartOptions = {
      animation: false,
      responsive: true,
      legend: {
        display: true,
        labels: {
          fontColor: '#9aa0ac',
        },
      },
    };
  }

}
