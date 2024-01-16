import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeguridadService } from 'src/app/admin/seguridad/seguridad.service';
import { ANSList, empresaANS } from 'src/app/system-models/empresaSistena';
import { DepartmentService } from '../../department.service';

@Component({
  selector: 'app-from-ans',
  templateUrl: './from-ans.component.html',
  styleUrls: ['./from-ans.component.sass']
})
export class FromANSComponent implements OnInit {
  ansForm: FormGroup;
  empresaANS: empresaANS = {
    id: 0,
    idEmpresa: 0,
    idTipoIncidencia: 0,
    tiempoMaximoAtencion: 0,
    usuarioNotificación: 0,
    esActivo: 1
  };
  txtButton:string='';
  tipoServicios: any[]=[];
  usuarios: any[]=[];
  listANS:empresaANS[]=[];
  listANSGrilla:ANSList[]=[];
  ANS :ANSList ={
    Empresa: '',
    TipoIncidencia: '',
    Usuario: '',
    tiempoMaximoAtencion: 0
  }
  constructor(public dialogRef: MatDialogRef<FromANSComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private seguridadService : SeguridadService,
    public departmentService: DepartmentService,) { 
      //////////console.log("data", data)
      this.LoadData();
      this.ansForm = this.createContactForm();       
    }
  createContactForm(): FormGroup<any> {
    return this.fb.group({
      servicio:['', Validators.required],
      tiempoMaximoAtencion:['', Validators.required],
      usuarios:['', Validators.required]
    })
  }   
  
  
  ngOnInit(): void {
    ////////////console.log("listANS",this.listANS)
  
  }
  LoadData() {
    this.listANSGrilla=[];
    this.seguridadService.sp_getANSByIdEmpresa(this.data.id).subscribe(res =>{
      this.seguridadService.getParameterDetails(9).subscribe(res =>{
        this.tipoServicios = res;
        this.seguridadService.getUsuariosByEmpresa(1).subscribe(res =>{
          this.usuarios = res.objModel;

          this.listANS.forEach(element => {
            //////////console.log("?");
            this.ANS ={
              Empresa: '',
              TipoIncidencia: '',
              Usuario: '',
              tiempoMaximoAtencion: 0
            }
            let razonSocial = this.data.razonSocial;
            this.ANS.Empresa = razonSocial;
            this.ANS.tiempoMaximoAtencion = element.tiempoMaximoAtencion
            let tipo = this.tipoServicios.filter( x => x.valorEntero == element.idTipoIncidencia)
            this.ANS.TipoIncidencia = tipo[0].nombre;
            
            let usuario = this.usuarios.filter( x => x.id == element.usuarioNotificación)
            this.ANS.Usuario = usuario[0].nombres +' '+usuario[0].apellidos;

            this.listANSGrilla.push(this.ANS);
          });

        })
      })
      //////////console.log("res",res.objModel)
      if(res.objModel.length <0){
        
        
        this.txtButton ='Actualizar';
      }else{
        this.txtButton ='Guardar';
        this.listANS = res.objModel;          
        this.ansForm = this.createContactForm();
      }
      
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void{    
    ////////console.log(this.txtButton);
    //////////console.log(this.ansForm.value)
    //////////console.log(this.data.tipoServicio)
    if(this.txtButton == 'Actualizar'){

      if(this.ansForm.value.servicio !== this.data.tipoServicio){
        this.data.tipoServicio=this.ansForm.value.servicio;
        this.departmentService.updateDepartment(this.data).subscribe(res =>{
          
        })
        
      }
      this.empresaANS.idTipoIncidencia =this.ansForm.value.servicio;
      this.empresaANS.tiempoMaximoAtencion = Number(this.ansForm.value.tiempoMaximoAtencion);
      this.empresaANS.usuarioNotificación = this.ansForm.value.usuarios;
      this.seguridadService.updateEmpresaANS(this.empresaANS).subscribe(res=>{
        this.dialogRef.close(1);
      })

    }else{
      if(this.ansForm.value.servicio !== this.data.tipoServicio){
        this.data.tipoServicio=this.ansForm.value.servicio;
        this.departmentService.updateDepartment(this.data).subscribe(res =>{
          this.dialogRef.close(1);
        })      

      }
      this.empresaANS.idEmpresa = this.data.id;
      this.empresaANS.idTipoIncidencia =this.ansForm.value.servicio;
      this.empresaANS.tiempoMaximoAtencion = Number(this.ansForm.value.tiempoMaximoAtencion);
      this.empresaANS.usuarioNotificación = this.ansForm.value.usuarios;
      //////////console.log("insert",this.empresaANS)
      this.seguridadService.insertEmpresaANS(this.empresaANS).subscribe(res=>{
        this.LoadData();
        this.dialogRef.close(1);
      })
    }

  }
 
}