import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StudentAttendanceService } from './attendance.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudentAttendanceComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  prueba: any []=[];
  prueba1: any []=[];
  prueba2: any []=[];
  breadscrums = [
    {
      title: 'Reporte',
      items: ['Incidencias'],
      active: 'Reportes',
    },
  ];
  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Address>>;
  dataSource: MatTableDataSource<User>;
  usersData: User[] = [];
  columnsToDisplay = ['ID', 'Sistema', 'Usuario', 'Tipo_Incidencia', 'Sub_Tipo', 'Nombre_Incidencia','Fecha_Registro','Prioridad', 'Estado','Fecha_Atención'];
  innerDisplayedColumns = ['Usuario', 'Fecha', 'Comentario'];
  
  expandedElement: User | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public studentAttendanceService: StudentAttendanceService,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef
  ) {
    super();
  }
  
  ngOnInit() {
    this.loadData();
    USERS.forEach(user => {
      if (user.addresses && Array.isArray(user.addresses) && user.addresses.length) {
        this.usersData = [...this.usersData, {...user, addresses: new MatTableDataSource(user.addresses)}];
      } else {
        this.usersData = [...this.usersData, user];
      }
    });
    this.dataSource = new MatTableDataSource(this.usersData);
    this.dataSource.sort = this.sort;
    this.img()
  }
    toggleRow(element: User) {
      element.addresses && (element.addresses as MatTableDataSource<Address>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
      this.cd.detectChanges();
      this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Address>).sort = this.innerSort.toArray()[index]);
    }

    applyFilter(filterValue: string) {
      this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Address>).filter = filterValue.trim().toLowerCase());
    }


  refresh() {
    this.loadData();
  }
  

  exportarReporte(){

  }


  public loadData() {
   
  }
  img(): void { 
    this.prueba.push(USERS);
    //////////console.log("we",this.prueba);
    for(let i=0;i<this.prueba.length;i++){
      //////////console.log("users",this.prueba[i]);
      this.prueba1.push(this.prueba[i]);
      for(let a=0; a<this.prueba1.length;a++){
        
        this.prueba2.push(this.prueba1[a]);
        //////////console.log("que bota",this.prueba2);
        for(let e=0;e<this.prueba2[a].length;e++){
          //////////console.log("duda",this.prueba2[e]);
        }
      }
      // for(let a=0;a<this.prueba[i].addresses.length ;a++){
      // ////////////console.log("que botara comentario",this.prueba[i].lstComentarios[a].comentario); 
      //   this.prueba1.push(this.prueba[i].addresses[a].Imagen_Usuario);
      //   //////////console.log("que saco",this.prueba1);
     
      // }
      
    }

  }
  
  // context menu
  
}

export interface User {
    ID: number;
    Sistema: string;//nombreSistema
    Usuario: string;//"usuarioRegistro": 
    Tipo_Incidencia: string;//"tipoIncidencia": 
    Sub_Tipo: string;//"subtipoIncidencia": 
    Nombre_Incidencia: string;//"nombreIncidencia": 
    Fecha_Registro: string;//"fechaRegistro": 
    Prioridad: string;//"prioridad": 
    Estado: string;//"estado": 
    Fecha_Atención: string;//"fechaAtencion": 
    addresses?: Address[] | MatTableDataSource<Address>;
}

export interface Address {
  Usuario : string;
  Imagen_Usuario: string;
  Fecha : string;
  Comentario: string;
}

export interface UserDataSource {
    id: number;
    idEmpSist: string;
    idUsuarioRegistro: string;
    idTipoIncidencia: string;
    idSubtipoIncidencia: string;
    nombre: string;
    fechaRegistro: string;
    idPrioridad: string;
    idEstado: string;
    fechaAtencion: string;
  addresses?: MatTableDataSource<Address>;
}

const USERS: User[] = [
  {
    ID: 1,
    Sistema: "Mi sistema",
    Usuario:  "Walter Atuncar",
    Tipo_Incidencia:  "Software",
    Sub_Tipo: "Instalación",
    Nombre_Incidencia:  "Fallo de descarga",
    Fecha_Registro: "15-08-2022",
    Prioridad:  "Alta",
    Estado: "Pendiente",
    Fecha_Atención: "31-08-2022",
    addresses: [
      {
        Usuario: "Walter Atuncar",
        Imagen_Usuario: "https://www.pchardwarepro.com/wp-content/uploads/2019/06/this-site-cant-be-reached.jpg",
        Fecha:  "12-11-2022",
        Comentario: "Se realizo un mapeo del sistema"
      },
      {
        Usuario: "Walter Atuncar",
        Imagen_Usuario: "https://www.lawebdelprogramador.com/usr/164000/164995/530fb3ed2a8b2-error1.jpg",
        Fecha:  "12-11-2022",
        Comentario: "Fallo de logueo"
      }
    ]
  },
  {
    ID: 1,
    Sistema: "System data",
    Usuario: "Josselin Calderon",
    Tipo_Incidencia: "Hardware",
    Sub_Tipo : "Instalación",
    Nombre_Incidencia: "No se instalo correctamente la imagen ISO",
    Fecha_Registro: "02-09-2022",
    Prioridad: "Media",
    Estado: "Pendiente",
    Fecha_Atención:  "17-09-2022",
    addresses: [
      {
        Usuario: "Josselin Calderon",
        Imagen_Usuario: "hola",
        Fecha:  "12-11-2022",
        Comentario: "Fallo de la imagen ISO"
      },
      {
        Usuario: "Josselin Calderon",
        Imagen_Usuario: "hola",
        Fecha:  "12-11-2022",
        Comentario: "Se relentiza al ingresar a los programas"
      }
    ]
  },
  {
    ID: 1,
    Sistema: "Sistema gestión de proyectos",
    Usuario: "Jose Alberto",
    Tipo_Incidencia: "Software",
    Sub_Tipo : "Funcionalidad",
    Nombre_Incidencia: "Fallo de carga de archivos",
    Fecha_Registro: "10-10-2022",
    Prioridad: "Alta",
    Estado: "Pendiente",
    Fecha_Atención: "20-10-2022",
    addresses: [
      {
        Usuario: "Jose Alberto",
        Imagen_Usuario: "hola",
        Fecha:  "12-11-2022",
        Comentario: "No carga los archivos"
      },
      {
        Usuario: "Jose Alberto",
        Imagen_Usuario: "hola",
        Fecha:  "12-11-2022",
        Comentario: "No se visualiza las imagenes cargadas"
      }
    ]
  }
];
