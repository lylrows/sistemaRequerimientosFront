import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EChartsOption } from 'echarts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { dashboard, dashboardAns, dashboardEmp, dashboardPendiente, dashboardPendienteGerente, dashboardSistema, dashSoporte, objestado, objPersona, tipif } from 'src/app/system-models/acceso';
import { generete } from 'src/app/system-models/deleteObj';
import { PorcentajeCumplimientoDTO } from 'src/app/system-models/incidencia';
import Swal from 'sweetalert2';
import { IncideciaService } from '../students/about-student/incidencia.service';
import { StudentsService } from '../students/all-students/students.service';
import { FormDashboardComponent } from './form-dashboard/form-dashboard.component';

export type barChartOptions = {
  series: ApexAxisChartSeries;
  series1:ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

export type areaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public graph_line_chart: Partial<EChartsOption>;
  public graph_line_chart_Gerente: Partial<EChartsOption>;
  public barChartOptions: Partial<barChartOptions>;
  public graph_line_chart_cliente: Partial<EChartsOption>;
  public graph_line_chart_soporte: Partial<EChartsOption>;
  public graph_line_chart1: Partial<EChartsOption>;
  public graph_line_chartCuarto: Partial<EChartsOption>;
  public bar_chart: Partial<EChartsOption>;
  public areaChartOptions: Partial<areaChartOptions>;
  //filterForms3: FormGroup;

  breadscrums = [
    {
      title: 'Dashboard',
      items: ['Soporte'],
      active: 'Dashboard',
    },
  ];
  dash: dashboard={
    anho: 0,
    mes: 0,
    id_usuario: 0,
    rol: 0
  }
  dashboardEmp_ : dashboardEmp={
    anho: 0,
    mes: 0,
    id_empresa: 0,
    rol: 0
  }
  dashSystem: dashboardSistema={
    anho: 0,
    mes: 0,
    id_usuario: 0,
    rol: ''
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
  dashGerente: dashboardPendienteGerente={
    anio: 0,
    mes: 0,
    idTipificacion: '',
    id_empresa: 0,
    id_rol: 0
  }
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

  PorcentajeCumplimientoList:PorcentajeCumplimientoDTO[] = [];
  PorcentajeCumplimiento:PorcentajeCumplimientoDTO={
    mesNumero: 0,
    mes: '',
    anio: 0,
    numeroTickets: 0,
    cumplenANS: 0,
    noCumplenANS: 0,
    descartados: 0,
    porcentajeCumplimiento: 0,
    empresa: ''
  }

  legendsSystem: any []=[];
  tiempo: any []=[];
sistemasAll: any []=[];
  seriesSystem: any[]=[];

legends: string []=[];
nombretipi: any[]=[];
_seriesPrueba: any []=[];
  _seriePendiente: any []=[];
  legendsTipif: any[]=[];
  tipificacion: any[]=[];
  legendSistema: any []=[];
  legendSistemas: any []=[];
  _serieSistema: any []=[];
  contadores: any;
  dia: any[]=[];
  semana: any[]=[];
  filterForms:FormGroup;
  filterForms2: FormGroup;
  filterForms3: FormGroup;
  filterforms4: FormGroup;
  filterFormsSis: FormGroup;
  mes: any[]=[];
  anho: any[]=[];
  diaPor: any[]=[];
  mesPor: any[]=[];
  anhoPor: any[]=[];
  semanaPor: any[]=[];
  estadosSoporte: any;
  conteoEstados: any[]=[];
  polarAreaChartLabels: any;
  polarAreaLegend: boolean;
  estadosAll: any[]=[];
  polarAreaChartData: any[];
  ploarChartColors: any[];
  polarAreaChartType: string;
  polarChartOptions: any;
  semanasEst: any;
  conteoSistema: any[]=[];
  conteoSistemaEstado: any[]=[];
  data: any[]=[];
  porcentaje: number;
  parrafo: any[]=[];
  parrafoMayor: any[]=[];
  parrafoSemana: string []=[];
  parrafoMayorSemana: string[]=[];
  parrafoMes: string[]=[];
  parrafoMayorMes: string[]=[];
  parrafoAnho: string[]=[];
  parrafoMayorAnho: string[]=[];
  tipifica: any []=[];
  porcentajeDia: number;
  porcentajeSem: number;
  porcentajeMes: number;
  porcentajeAnho: number;
  users: any;
  legendsPendiente: string []=[];
  system: any;
  _seriesPendientes: any []=[];
  tipificaciones: any;
  sistemasList: any[]=[];
  conteoSistemaEstadoGerente: any []=[];
  conteoSistemaGerente: any[]=[];
  dataGerente: any[]=[];
  conteoEstadosGerente: any []=[];
  estadosAllGerente: any[]=[];
  polarAreaChartLabels1: any[];
  polarAreaChartData1: any[];
  filterFormsSoporte: FormGroup;
  sistemasListSoporte: any[]=[];
  idSoporte: any;
  diaGerente: any[]=[];
  semanaGerente: any[]=[];
  mesGerente: any[]=[];
  anhoGerente: any[]=[];
  porcentajeDiaGerente: number;
  diaPorGerente: any[]=[];
  parrafoGerente: any[]=[];
  parrafoMayorGerente: any[]=[];
  porcentajeSemGerente: number;
  semanaPorGerente: any[]=[];
  parrafoSemanaGerente: any[]=[];
  parrafoMayorSemanaGerente: any[]=[];
  porcentajeMesGerente: number;
  mesPorGerente: any[]=[];
  parrafoMesGerente: any[]=[];
  parrafoMayorMesGerente: any[]=[];
  porcentajeAnhoGerente: number;
  anhoPorGerente: any[]=[];
  parrafoAnhoGerente: any[]=[];
  parrafoMayorAnhoGerente: any[]=[];
  idEmpresaCliente: any;
  sistemasListSoporteCliente: any[]=[];
  listTipEmpresa: any;
  listTipoTickets: any;
  barChartOptions1: any;//{ scaleShowVerticalLines: boolean; responsive: boolean; legend: { display: boolean; labels: { fontColor: string; }; }; scales: { xAxes: { ticks: { fontFamily: string; fontColor: string; }; }[]; yAxes: { ticks: { beginAtZero: boolean; fontFamily: string; fontColor: string; }; }[]; }; };
  barChartLabels: string[];
  barChartType: string;
  barChartLegend: boolean;
  barChartData: any[];//{ data: number[]; label: string; }[];
  barChartColors: Array<any>;
  legendsANS: string[] = [
    'Alta',
    'Urgente',
    'Media',
    'Baja',
  ];
  _serieANS: any[] = [];
  inicio: any;
  fin: any;
  gaugeValue: number;
  gaugeSize: number;
  guageType1: string;
  guageThick: number;
  activa: boolean = true;
  maxDateInicio = new Date;
  maxDateFin = new Date;
  mesObj: any = { value: 0, text: '' };
    constructor(public dialog: MatDialog,
    public IncideciaService_ : IncideciaService,
    public studentsServ : StudentsService,
    private fb: FormBuilder,
    ) {super();
      this.users= JSON.parse(localStorage.getItem('currentUser'));
      this.filterForms = this.filterFormCreate();
      this.filterForms2 = this.busquedaSemanal();
      this.filterForms3 = this.createFilterFormsANS();
      this.filterforms4 = this.createSolicitudes();
      this.filterFormsSis = this.createSistema();
      this.filterFormsSoporte = this.createFilterForms();
    
    }
    createFilterForms(): FormGroup<any> {
      return this.fb.group({
        idEmpresa: [-1],
        idEstado: [-1],
        idSistema: [-1]
      })
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
        idEmpresa:['', Validators.required],
        fechaInicio: ['', Validators.required],
        fechaFin:['', Validators.required],
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

  // Doughnut chart start
  public doughnutChartLabels: string[] = [
    'Development',
    'Java Classes',
    'Painting ',
    'Geography Class',
  ];
  public doughnutChartData: number[] = [32, 25, 20, 23];
  public doughnutChartColors: any[] = [
    {
      backgroundColor: ['#5A5FAF', '#F7BF31', '#EA6E6C', '#28BDB8'],
    },
  ];
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
  _objestado: objestado={
    id: 0,
    idParametro: 0,
    codigo: '',
    nombre: '',
    valor: '',
    valorEntero: 0,
    valorAuxiliar: '',
    idParametroPadre: 0,
    esActivo: 0
  }
  dashSoporte: dashSoporte={
    id_usuario: 0,
    rol: ''
  }

  public doughnutChartType = 'doughnut';
  estados: any ;
  Listestados: any []=[];
  ListSistema: any []=[];
  incidenciaListaAux: any []=[];
  public doughnutChartOptions: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 70,
    legend: {
      display: false,
    },
  };

  // Doughnut chart end
 
  ngOnInit() {
    this.searchSoporte();
    this.chart1();
    this.chart2();
    this.estadosList();
    this.dashConteoPor();
    this.dashSemanasByEstado();
    this.dashTicketByEstado();
    //this.dashGerenteFlor();
    this.TodoCtrl();
    
    let primera = Number(JSON.parse(localStorage.getItem('currentUser')).primeraVez);
    //////////////console.log("primera",primera);
    if(primera == 0){
      this.actualizaContra();
    }
    
    this.studentsServ.getParameterDetail(15).subscribe( res => {
      //////////////////console.log("res",res);
      this.tipificaciones = res;
       let tipificaciones = res;
     
      
    })
    this.studentsServ.obtenerEmpresaCliente().subscribe(resEmpre=>{
      //this.sistemasList
       let abc=resEmpre.objModel;
      for (const element of abc) {
        let empre :generete={
          idEmpresa: 0,
          razonSocial: ''
        }
        empre.idEmpresa= element.id;
        empre.razonSocial= element.razonSocial;
        this.sistemasList.push(empre);
      }
      ////////console.log("lista",this.sistemasList);
    })
    this.studentsServ.obtenerSoporteGerente().subscribe(resSopo=>{
      //this.sistemasList
       let abc=resSopo.objModel;
      for (const element of abc) {
        let sopor :generete={
          idEmpresa: 0,
          razonSocial: ''
        }
        sopor.idEmpresa= element.idusuario;
        sopor.razonSocial= element.nombre;
        this.sistemasListSoporte.push(sopor);
      }
      ////////console.log("lista",this.sistemasList);
    })
    this.studentsServ.obtenerEmpresaCliente().subscribe(respon=>{
      // let abc=respon.objModel;
      // //////console.log("abc",abc)
      // for (const element of abc) {
      //   let sopor :generete={
      //     idEmpresa: 0,
      //     razonSocial: ''
      //   }
      //   sopor.idEmpresa= element.idUsuario;
      //   sopor.razonSocial= element.razonSocial;
         this.sistemasListSoporteCliente= respon.objModel;
      // }
    })
    //////console.log("empresas",this.sistemasListSoporteCliente);
  }
  selectSoporte(event){
    ////////console.log("event",event.value);
    
    
      this.idSoporte = event.value;
    
    }
    searchANS(){
      /*let data = JSON.parse(localStorage.getItem('currentUser'));
      this.dashAns.anho= this.filterForms3.value.anho;
      this.dashAns.mesIniANS = this.filterForms3.value.mesIniANS;
      this.dashAns.mesFinANS= this.filterForms3.value.mesFinANS;
      this.dashAns.id_usuario= data.id;
      this.dashAns.rol= data.role;
      this.inicio = this.filterForms3.value.mesIniANS;
      this.fin = this.filterForms3.value.mesFinANS;*/
      this.dashAns = this.filterForms3.value;
      //console.log("form", this.filterForms3.value)
      this._serieANS = [];
      //////////console.log("dash", this.dashAns );
      this.studentsServ.getCumplimientoANS(this.dashAns).subscribe(res=>{
        res.objModel.forEach(element => {
          this._serieANS.push(element)
        });       
        ////console.log("res", res.objModel)
        this.chart_Soporte();
         this.studentsServ.getPorcentajeCumplimiento(this.dashAns).subscribe( res =>{
           this.PorcentajeCumplimientoList = res.objModel;
           const fechaFin = new Date(this.dashAns.fechaFin);
          const mesNumero = fechaFin.getMonth() + 1;
          this.mesObj = this.meses.filter( x => x.value == mesNumero)[0];
          //console.log("mes", this.mesObj.text)          
          this.PorcentajeCumplimiento = this.PorcentajeCumplimientoList.filter( x => x.mesNumero == mesNumero)[0];
          //console.log("PorcentajeCumplimiento", this.PorcentajeCumplimiento)
          this.activa = false;
          this.gaugeValue = this.PorcentajeCumplimiento.porcentajeCumplimiento;
          this.gaugeSize = 150;
          this.guageType1 = 'full';
          this.guageThick = 8;
         })
         
        
        
      })
    }
    searchSoporte(){
      ////////console.log("event",this.idSoporte);
      let data = JSON.parse(localStorage.getItem('currentUser'));
      if(this.idSoporte==-1 || this.idSoporte== null){
        this.conteoGerente();
        this.dashGerenteFlor();
        this.dashSemanasByEstadoGerente();
       
      }else{
        this.conteoSoporteId();
        this.dashTicketByEstadoById();
        this.dashSemanasByEstadoGerenteById();
        
      }
    }
  conteoSoporteId(){
    

    let data = JSON.parse(localStorage.getItem('currentUser'));
    this.dashSoporte.id_usuario=this.idSoporte;
      this.dashSoporte.rol=data.role;
      //////console.log("dash",this.dashSoporte);
      this.studentsServ.getTicketBySoporte(this.dashSoporte).subscribe(res=>{
      //////console.log("primerDahs",res.objModel);
      this.contadores = res.objModel
      this.diaGerente.push(this.contadores.conteo[0]);
      this.semanaGerente.push(this.contadores.conteo[1]);
      this.mesGerente.push(this.contadores.conteo[2]);
      this.anhoGerente.push(this.contadores.conteo[3]);
      
      if(this.contadores.porcentaje[0]<0){
        ////////console.log("dato",this.contadores.porcentaje[0])
        this.porcentajeDiaGerente = this.contadores.porcentaje[0]*-1;
        this.diaPorGerente.push(this.porcentajeDiaGerente);
        this.parrafoGerente.push("menos que el día anterior");
      }else if(this.contadores.porcentaje[0]>100){
        ////////console.log("dato",this.contadores.porcentaje[0])
        this.diaPorGerente.push(100);
        this.parrafoMayorGerente.push("Mas de");
        this.parrafoGerente.push("mas que el día anterior");
      }else{
        ////////console.log("dato",this.contadores.porcentaje[0])
        this.diaPorGerente.push(this.contadores.porcentaje[0]);
        this.parrafoGerente.push("mas que el día anterior");
      }

      if(this.contadores.porcentaje[1]<0){
        this.porcentajeSemGerente = this.contadores.porcentaje[1]*-1;
        this.semanaPorGerente.push(this.porcentajeSemGerente);
        this.parrafoSemanaGerente.push("menos que la semana anterior");
      }else if(this.contadores.porcentaje[1]>100){
        this.semanaPorGerente.push(100);
        this.parrafoMayorSemanaGerente.push("Mas de");
        this.parrafoSemanaGerente.push("mas que la semana anterior");
      }else{
        this.semanaPorGerente.push(this.contadores.porcentaje[1]);
        this.parrafoSemanaGerente.push("mas que la semana anterior");
      }

      if(this.contadores.porcentaje[2]<0){
        this.porcentajeMesGerente = this.contadores.porcentaje[2]*-1;
        this.mesPorGerente.push(this.porcentajeMes);
        this.parrafoMesGerente.push("menos que el mes anterior");
      }else if(this.contadores.porcentaje[2]>100){
        this.mesPorGerente.push(100);
        this.parrafoMayorMesGerente.push( "Mas de");
        this.parrafoMesGerente.push("mas que el mes anterior");
      }else{
        this.mesPorGerente.push(this.contadores.porcentaje[2]);
        this.parrafoMesGerente.push("mas que el mes anterior");
      }

      if(this.contadores.porcentaje[3]<0){
        this.porcentajeAnhoGerente = this.contadores.porcentaje[3]*-1;
        this.anhoPorGerente.push(this.porcentajeAnhoGerente);
        this.parrafoAnhoGerente.push("menos que el año anterior");
      }else if(this.contadores.porcentaje[3]>100){
        this.anhoPorGerente.push(100);
        this.parrafoMayorAnhoGerente.push("Mas de");
        this.parrafoAnhoGerente.push("mas que el año anterior");
      }else{
        this.anhoPorGerente.push(this.contadores.porcentaje[3]);
        this.parrafoAnhoGerente.push("mas que el año anterior");
      }
      
    })
//     this.diaGerente=[''];
//     this.semanaGerente=[''];
//     this.mesGerente=[''];
//     this.anhoGerente=[''];
 

//  this.parrafoAnhoGerente=[''];
//    this.anhoPorGerente=[''];
//    this.parrafoMayorAnhoGerente=[''];

   
//    this.parrafoMesGerente=[''];
//    this.mesPorGerente=[''];
//    this.parrafoMayorMesGerente=[''];

//    this.parrafoSemanaGerente=[''];
//    this.semanaPorGerente=[''];
//    this.parrafoMayorSemanaGerente=[''];


//    this.parrafoGerente=[''];
//    this.diaPorGerente=[''];
//    this.parrafoMayorGerente=[''];

      
  }
  dashTicketByEstadoById(){
    let data = JSON.parse(localStorage.getItem('currentUser'));
    this.dashSoporte.id_usuario=this.idSoporte;
    this.dashSoporte.rol=data.role;
    this.studentsServ.getTicketByEstado(this.dashSoporte).subscribe(res=>{
      this.estadosSoporte = res.objModel
      ////////////console.log("SegundoDahs",this.estadosSoporte);
      for(let i=0; i<this.estadosSoporte.conteo.length; i++){
        this.conteoEstadosGerente.push(this.estadosSoporte.conteo[i])
      }
      for(let i=0; i<this.estadosSoporte.estados.length; i++){
        this.estadosAllGerente.push(this.estadosSoporte.estados[i])
      }
      this.conteoSoporteGerente();
      ////////////console.log("conteo",this.conteoEstados)
    })
    this.conteoEstadosGerente=[''];
    this.estadosAllGerente=[''];
  }
  dashSemanasByEstadoGerenteById(){
    let data = JSON.parse(localStorage.getItem('currentUser'));
    this.dashSoporte.id_usuario=this.idSoporte;
    this.dashSoporte.rol=data.role;
    this.studentsServ.getSemanasByEstado(this.dashSoporte).subscribe(res=>{
      //////////console.log("tercer dash",res.objModel);
      this.semanasEst = res.objModel;
      for(let i=0; i<this.semanasEst.data.length; i++){
        this.conteoSistemaGerente.push(this.semanasEst.data[i])
      }
      for(let i=0; i<this.semanasEst.series.length; i++){
        this.conteoSistemaEstado.push(this.semanasEst.series[i].name)
        this.dataGerente.push(this.semanasEst.series[i]);
      }

       this.chart3();
     })
     this.conteoSistemaGerente=[''];
     this.dataGerente=[''];
  }
  
  conteoGerente(){
    this.studentsServ.getTicketBySoporteGerente().subscribe(res=>{
      
      //////console.log("prueba generente",res.objModel);
      this.contadores = res.objModel
      this.diaGerente.push(this.contadores.conteo[0]);
      this.semanaGerente.push(this.contadores.conteo[1]);
      this.mesGerente.push(this.contadores.conteo[2]);
      this.anhoGerente.push(this.contadores.conteo[3]);
      
      if(this.contadores.porcentaje[0]<0){
        ////////console.log("dato",this.contadores.porcentaje[0])
        this.porcentajeDiaGerente = this.contadores.porcentaje[0]*-1;
        this.diaPorGerente.push(this.porcentajeDiaGerente);
        this.parrafoGerente.push("menos que el día anterior");
      }else if(this.contadores.porcentaje[0]>100){
        ////////console.log("dato",this.contadores.porcentaje[0])
        this.diaPorGerente.push(100);
        this.parrafoMayorGerente.push("Mas de");
        this.parrafoGerente.push("mas que el día anterior");
      }else{
        ////////console.log("dato",this.contadores.porcentaje[0])
        this.diaPorGerente.push(this.contadores.porcentaje[0]);
        this.parrafoGerente.push("mas que el día anterior");
      }

      if(this.contadores.porcentaje[1]<0){
        this.porcentajeSemGerente = this.contadores.porcentaje[1]*-1;
        this.semanaPorGerente.push(this.porcentajeSemGerente);
        this.parrafoSemanaGerente.push("menos que la semana anterior");
      }else if(this.contadores.porcentaje[1]>100){
        this.semanaPorGerente.push(100);
        this.parrafoMayorSemanaGerente.push("Mas de");
        this.parrafoSemanaGerente.push("mas que la semana anterior");
      }else{
        this.semanaPorGerente.push(this.contadores.porcentaje[1]);
        this.parrafoSemanaGerente.push("mas que la semana anterior");
      }

      if(this.contadores.porcentaje[2]<0){
        this.porcentajeMesGerente = this.contadores.porcentaje[2]*-1;
        this.mesPorGerente.push(this.porcentajeMes);
        this.parrafoMesGerente.push("menos que el mes anterior");
      }else if(this.contadores.porcentaje[2]>100){
        this.mesPorGerente.push(100);
        this.parrafoMayorMesGerente.push( "Mas de");
        this.parrafoMesGerente.push("mas que el mes anterior");
      }else{
        this.mesPorGerente.push(this.contadores.porcentaje[2]);
        this.parrafoMesGerente.push("mas que el mes anterior");
      }

      if(this.contadores.porcentaje[3]<0){
        this.porcentajeAnhoGerente = this.contadores.porcentaje[3]*-1;
        this.anhoPorGerente.push(this.porcentajeAnhoGerente);
        this.parrafoAnhoGerente.push("menos que el año anterior");
      }else if(this.contadores.porcentaje[3]>100){
        this.anhoPorGerente.push(100);
        this.parrafoMayorAnhoGerente.push("Mas de");
        this.parrafoAnhoGerente.push("mas que el año anterior");
      }else{
        this.anhoPorGerente.push(this.contadores.porcentaje[3]);
        this.parrafoAnhoGerente.push("mas que el año anterior");
      }
      
    })
    // this.diaGerente[0]=[''];
    //   this.semanaGerente[1]=[''];
    //   this.mesGerente[2]=[''];
    //   this.anhoGerente[3]=[''];

    //   this.parrafoAnhoGerente=[''];
    //   this.anhoPorGerente=[''];
    //   this.parrafoMayorAnhoGerente=[''];

      
    //   this.parrafoMesGerente=[''];
    //   this.mesPorGerente=[''];
    //   this.parrafoMayorMesGerente=[''];

    //   this.parrafoSemanaGerente=[''];
    //   this.semanaPorGerente=[''];
    //   this.parrafoMayorSemanaGerente=[''];


    //   this.parrafoGerente=[''];
    //   this.diaPorGerente=[''];
    //   this.parrafoMayorGerente=[''];
    
  }
  
  
  selectEmpresa(event){
    //////console.log("evento",event.value);
    this.idEmpresaCliente=event.value;
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.studentsServ.getListTipificaciones(this.idEmpresaCliente).subscribe(res=>{
      this.listTipEmpresa = res.objModel.listTipificacion;
      this.listTipoTickets = res.objModel.listTipoIncidencias;
      //console.log("tipificaciones",this.listTipEmpresa);


      for (const element of this.listTipEmpresa) {
        let tipif: tipif={
          value: 0,
          text: ''
        }
         tipif.value =element.idTipificacion;
         tipif.text =element.nombre;
         ////console.log("tipificaciones",tipif)
        this.tipifica.push(tipif);
        this.nombretipi.push(element.nombre)
        
      }
      ////console.log("tipificaciones nombre",this.nombretipi);
      ////console.log("tipificaciones",this.tipifica);
    })
    this.tipifica=[''];
  }
  search(){
 
    
      let data = JSON.parse(localStorage.getItem('currentUser'));
      this.dashboardEmp_.anho= this.filterForms.value.fechaini;
      ////////////////console.log("fecha que manda",this.dash.fecha_ini);
      this.dashboardEmp_.mes= this.filterForms.value.fechafin;
      this.dashboardEmp_.id_empresa = this.idEmpresaCliente;
      this.dashboardEmp_.rol = data.role;
      ////console.log("dash cliente 2",this.dashboardEmp_);
       this.studentsServ.getatencionSolicitudesByEmp(this.dashboardEmp_).subscribe(res=>{
        this._seriesPrueba = res.objModel;
          ////console.log("data",this._seriesPrueba);
          for(let i=0; i< this._seriesPrueba.length; i++){
            const element = this._seriesPrueba[i]
            this.legends.push(element.name);
          }
          ////////////console.log("leyenda",this.legends);
          this.chart_Cliente();
          this.nombretipi=[''];
          
       })
       this.legends=[''];
       
    //}
      
    

  }
  TodoCtrl() {
    var max = new Date().getFullYear(),
      min = max - 1,
      max = max;
 
    for (var i = min; i <= max; i++) {
      this.tiempo.push({
        "id": i
      });
    }
    //////////////console.log("años",this.tiempo);
 
  }
  ///Segundo dash gerente efitec
  searchSistema(){
    if(this.idEmpresaCliente ==-1){
      let data = JSON.parse(localStorage.getItem('currentUser'));
      this.dash.anho= this.filterForms2.value.fechainiSe;
      this.dash.mes= this.filterForms2.value.fechafinSe;
      this.dash.id_usuario = this.idEmpresaCliente;
      this.dash.rol = data.role;  
      //////console.log("segundo dash 1",this.dashboardEmp_);
     this.studentsServ.getTicketSistema(this.dash).subscribe(res =>{
       this.legendSistema.push(res.objModel);
       //////console.log("ticket Sistema1",res.objModel);
       for(let i=0; i< this.legendSistema.length; i++){
         let abc = this.legendSistema[i].data
         this._serieSistema =this.legendSistema[i].series
         for(let j=0; j<abc.length; j++){
           //////////////console.log("abc",abc[j]);
           this.legendSistemas.push(abc[j]);
         }
          for(let a=0; a<this._serieSistema.length; a++){
            let prom = this._serieSistema[a].name;
            this.legendsTipif.push(prom);
          }
          ////////////console.log("leyenda",this.legendSistemas);
          ////////////console.log("serie",this._serieSistema);
       this.chartSegundo();
       this.legendsTipif = [''];
       this.legendSistemas = [''];
       }
       
       
     })
    }else{
      let data = JSON.parse(localStorage.getItem('currentUser'));
      this.dashboardEmp_.anho= this.filterForms2.value.fechainiSe;
      this.dashboardEmp_.mes= this.filterForms2.value.fechafinSe;
      this.dashboardEmp_.id_empresa = this.idEmpresaCliente;
      this.dashboardEmp_.rol = data.role;  
      //////console.log("segundo dash 2",this.dashboardEmp_);
     this.studentsServ.getTicketSistemaByGerente(this.dashboardEmp_).subscribe(res =>{
       this.legendSistema.push(res.objModel);
       //////console.log("ticket Sistema",res.objModel);
       for(let i=0; i< this.legendSistema.length; i++){
         let abc = this.legendSistema[i].data
         this._serieSistema =this.legendSistema[i].series
         for(let j=0; j<abc.length; j++){
           //////////////console.log("abc",abc[j]);
           this.legendSistemas.push(abc[j]);
         }
          for(let a=0; a<this._serieSistema.length; a++){
            let prom = this._serieSistema[a].name;
            this.legendsTipif.push(prom);
          }
          ////////////console.log("leyenda",this.legendSistemas);
          ////////////console.log("serie",this._serieSistema);
       this.chartSegundo();
       this.legendsTipif = [''];
       this.legendSistemas = [''];
       }
       
       
     })
    }
    
   
 }
  searchPendientes() {

    let data = JSON.parse(localStorage.getItem('currentUser'));
    this.dashGerente.anio = this.filterforms4.value.anho;
    this.dashGerente.mes = this.filterforms4.value.mesSol;
    this.dashGerente.idTipificacion= this.filterforms4.value.tipif;
    this.dashGerente.id_empresa= this.idEmpresaCliente;
    this.dashGerente.id_rol= 0;//data.role;
    //////console.log("dash", this.dashGerente );
    this.studentsServ.getTicketPendientes(this.dashGerente).subscribe(res =>{
      this._seriesPendientes.push(res.objModel);
      ////////console.log("pendientes",res.objModel);
      for(let i=0; i<= this._seriesPendientes.length; i++){
        let abc = this._seriesPendientes[i].data;
        this._seriePendiente =this._seriesPendientes[i].series;
       for(let j=0; j<abc.length; j++){
         //////////////console.log("abc",abc[j]);
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
       //this.tipifica=[''];
      }
    })
    this.filterforms4.get('anho')?.setValue('');
    this.filterforms4.get('mesSol')?.setValue('');
    this.filterforms4.get('tipif')?.setValue('');
  }
  searchSistemas(){
    let data = JSON.parse(localStorage.getItem('currentUser'));
    this.dashSystem.anho = this.filterFormsSis.value.anho;
    this.dashSystem.mes = this.filterFormsSis.value.mes;
    this.dashSystem.id_usuario = this.idEmpresaCliente;
    this.dashSystem.rol = data.role;
    ////////////console.log("Dash",this.dashSystem);
    this.studentsServ.getTicketSystem(this.dashSystem).subscribe(res =>{
      this.system =res.objModel;
      //////////console.log("system",this.system)
      for(let i=0; i< this.system.series.length; i++){
        const element = this.system.series[i];
        this.legendsSystem.push(element.name);
        
        this.seriesSystem.push(element);
      }
      
      // for(let j=0; j<){
      this.sistemasAll.push(this.system.data)
      
      //////////console.log("element",this.seriesSystem);
      //////////console.log("nom",this.legendsSystem);
      //////////console.log("data",this.sistemasAll);

      this.horasSistema();
      
    })
    this.filterFormsSis.get('anho')?.setValue('');
    this.filterFormsSis.get('mes')?.setValue('');
       this.seriesSystem=[''];
       this.legendsSystem=[''];
      // this.sistemasAll[0]=[''];
  }
  dashConteoPor(){
    let data = JSON.parse(localStorage.getItem('currentUser'));
    this.dashSoporte.id_usuario=data.id;
    this.dashSoporte.rol=data.role;
    this.studentsServ.getTicketBySoporte(this.dashSoporte).subscribe(res=>{
      //////console.log("primerDahs",res.objModel);
      this.contadores = res.objModel
      this.dia.push(this.contadores.conteo[0]);
      this.semana.push(this.contadores.conteo[1]);
      this.mes.push(this.contadores.conteo[2]);
      this.anho.push(this.contadores.conteo[3]);
      
      if(this.contadores.porcentaje[0]<0){
        ////////console.log("dato",this.contadores.porcentaje[0])
        this.porcentajeDia = this.contadores.porcentaje[0]*-1;
        this.diaPor.push(this.porcentajeDia);
        this.parrafo.push("menos que el día anterior");
      }else if(this.contadores.porcentaje[0]>100){
        ////////console.log("dato",this.contadores.porcentaje[0])
        this.diaPor.push(100);
        this.parrafoMayor.push("Mas de");
        this.parrafo.push("mas que el día anterior");
      }else{
        ////////console.log("dato",this.contadores.porcentaje[0])
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
      
    })
  }
  
  dashGerenteFlor(){
    this.studentsServ.getTicketByEstadoGerente().subscribe(res=>{
      this.estadosSoporte = res.objModel
      ////////////console.log("SegundoDahs",this.estadosSoporte);
      for(let i=0; i<this.estadosSoporte.conteo.length; i++){
        this.conteoEstadosGerente.push(this.estadosSoporte.conteo[i])
      }
      for(let i=0; i<this.estadosSoporte.estados.length; i++){
        this.estadosAllGerente.push(this.estadosSoporte.estados[i])
      }
      this.conteoSoporteGerente()
      ////////////console.log("conteo",this.conteoEstados)
    })
    this.conteoEstadosGerente=[''];
    this.estadosAllGerente=[''];
  }
  dashTicketByEstado(){
   
     let data = JSON.parse(localStorage.getItem('currentUser'));
    this.dashSoporte.id_usuario=data.id;
    this.dashSoporte.rol=data.role;
    this.studentsServ.getTicketByEstado(this.dashSoporte).subscribe(res=>{
      this.estadosSoporte = res.objModel
      //////console.log("SegundoDahs",this.estadosSoporte);
      for(let i=0; i<this.estadosSoporte.conteo.length; i++){
        this.conteoEstados.push(this.estadosSoporte.conteo[i])
      }
      for(let i=0; i<this.estadosSoporte.estados.length; i++){
        this.estadosAll.push(this.estadosSoporte.estados[i])
      }
      this.conteoSoporte()
      ////////////console.log("conteo",this.conteoEstados)
    })
    
  }
  
  dashSemanasByEstadoGerente(){
    this.studentsServ.getSemanasByEstadoGerente().subscribe(res=>{
      //////////console.log("tercer dash",res.objModel);
      this.semanasEst = res.objModel;
      for(let i=0; i<this.semanasEst.data.length; i++){
        this.conteoSistemaGerente.push(this.semanasEst.data[i])
      }
      for(let i=0; i<this.semanasEst.series.length; i++){
        this.conteoSistemaEstadoGerente.push(this.semanasEst.series[i].name)
        this.dataGerente.push(this.semanasEst.series[i]);
      }

      this.chart3();
    })
    this.conteoSistemaGerente=[''];
     this.dataGerente=[''];
  }
  dashSemanasByEstado(){
    let data = JSON.parse(localStorage.getItem('currentUser'));
    this.dashSoporte.id_usuario=data.id;
    this.dashSoporte.rol=data.role;
    this.studentsServ.getSemanasByEstado(this.dashSoporte).subscribe(res=>{
      //console.log("Ticket por sistema",res.objModel);
      this.semanasEst = res.objModel;
      for(let i=0; i<this.semanasEst.data.length; i++){
        this.conteoSistema.push(this.semanasEst.data[i])
      }
      for(let i=0; i<this.semanasEst.series.length; i++){
        this.conteoSistemaEstado.push(this.semanasEst.series[i].name)
        this.data.push(this.semanasEst.series[i]);
      }

       this.chartSoporteGerente();
     })
    
  }
  actualizaContra() {
    let data = JSON.parse(localStorage.getItem('currentUser'));
    const dialogRef = this.dialog.open(FormDashboardComponent, {
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

  private chart1() {
    this.areaChartOptions = {

      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#F77A9A', '#A054F7'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          'test 1',
          'test 2',
          'test 3',
          'test 4',
          'test 5',
          'test 6',
          'test 7',
        ],
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
      },
    };
  }

  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: 'Physics',
          // name1: 'new 1',
          data: [55, 55, 41, 67, 22, 43],
          //data1: [14, 25, 41, 67, 22, 43],
          
        },
        // {
        //   name: 'Computer',
        //   data: [13, 23, 20, 8, 13, 27],
        // },
        // {
        //   name: 'Management',
        //   data: [11, 17, 15, 15, 21, 14],
        // },
        // {
        //   name: 'Mathes',
        //   data: [21, 7, 25, 13, 22, 8],
        // },
      ],
      
      // series1: [
      //   {
      //     name: 'new1',
      //     data: [60, 45, 41, 67, 22, 43],
          
      //   },

      // ],
      chart: {
        type: 'bar',
        height: 330,
        foreColor: '#9aa0ac',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'category',
        categories: ['21-22', '23-24', '25-26', '27-28', '29-30', '31-01'],
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1,
        colors: ['#25B9C1', '#4B4BCB', '#EA9022', '#9E9E9E'],
      },
    };
    
  }

  estadosList(){
    this.studentsServ.getParameterDetail(11).subscribe( res => {
      this.estados = res;
      ////////////console.log("estados",this.estados);
      for(let i=0; i<this.estados.length;i++){
        
        this.Listestados.push(this.estados[i].nombre);
        
      }
      ////////////console.log("los estados",this.Listestados);
    })
     let users= JSON.parse(localStorage.getItem('currentUser'));
     this.studentsServ.getNivelSoporteById(users.id).subscribe(res =>{
       let sistemas =res.objModel;
      
       for(let i=0; i<sistemas.length;i++){
         this.ListSistema.push(sistemas[i].nombreSistema)
       }
       ////////////console.log("sistema",this.ListSistema)
     })
     this.studentsServ.getincidencias(users.role, users.id,2).subscribe(res =>{
       this.incidenciaListaAux=res.objModel;
      
       for(let i=0; i<this.incidenciaListaAux.length;i++){
        
         let count =0
         if(this.incidenciaListaAux[i].estado='Pendiente'){
           let abc =count +1;
          
         }
       }
      
     })
  }

  public chart3 (){
  this.graph_line_chart = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: this.conteoSistemaEstadoGerente,//['atendido','conforme','pendiente'],//this.data_rangoFechas,
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
        data: this.conteoSistemaGerente,//['sigma','sipoc'todo sistema],
        axisLabel: {
          fontSize: 7,
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
    series:this.dataGerente ,//this._series,
    
    color: ['#9f78ff', '#32cafe','#c90076','#10e817' ],
  };
}
  

/////////////////////////
public conteoSoporte(){
  this.polarAreaChartLabels = this.estadosAll,//this.conteoEstados;
  // : string[] = [
  //   'Pendiente',
  //   'Atendido',
  //   'Observado',
  //   'Conforme',
  // ];
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


////////////////////////////SOPORTE GERENTE/////////////////////////////
public conteoSoporteGerente(){
  this.polarAreaChartLabels1 = this.estadosAllGerente,//this.conteoEstados;
  // : string[] = [
  //   'Pendiente',
  //   'Atendido',
  //   'Observado',
  //   'Conforme',
  // ];
  this.polarAreaChartData1= this.conteoEstadosGerente;
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
public chartSoporteGerente (){
  this.graph_line_chart_Gerente = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: this.conteoSistemaEstado,//['atendido','conforme','pendiente'],//this.data_rangoFechas,
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
        data: this.conteoSistema,//['sigma','sipoc'todo sistema],
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
    series:this.data ,//this._series,
    
    color: ['#9f78ff', '#32cafe','#c90076','#10e817' ],
  };
}

// dash de cliente
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
public chart4(){
  this.barChartOptions1 = {
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
public chart_Cliente (){
  this.graph_line_chart_cliente = {
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
public chart_Soporte (){
    this.graph_line_chart_soporte = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Total Tickets','No cumplió','Cumplió','Decartado'],
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
          data: this.legendsANS,
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
      series: this._serieANS,//this._series,
      
      color: ['#9f78ff', '#32cafe','#c90076','#10e817' ],
    };
  }
  onChangeFechaInicio(){
    let fechaInicio = this.filterForms3.get('fechaInicio')?.value;
    //console.log("fechaInicio", fechaInicio)
  }
}
