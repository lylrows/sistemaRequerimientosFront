import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeguridadService } from 'src/app/admin/seguridad/seguridad.service';
import { empresaANS } from 'src/app/system-models/empresaSistena';
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
  tipoServicios: any;
  usuarios: any;
  constructor(public dialogRef: MatDialogRef<FromANSComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private seguridadService : SeguridadService,
    public departmentService: DepartmentService,) { 
      ////////////console.log("data", data)
      this.LoadData();
      this.ansForm = this.createContactForm();
      this.seguridadService.sp_getANSByIdEmpresa(this.data.id).subscribe(res =>{
        this.seguridadService.getParameterDetails(5).subscribe(res =>{
          this.tipoServicios = res;
        })
        this.seguridadService.getUsuariosByEmpresa(1).subscribe(res =>{
          ////////////console.log("per:", res.objModel)
          this.usuarios = res.objModel;
        })
        if(res.objModel != null){
          this.empresaANS = res.objModel;
          ////////////console.log("res", res.objModel)
          this.ansForm = this.createContactForm();
          this.txtButton ='Actualizar';
        }else{
          this.txtButton ='Guardar';
        }
        ////////////console.log("ans:", this.empresaANS)
      })
      
    }
  createContactForm(): FormGroup<any> {
    return this.fb.group({
      servicio:[this.data.tipoServicio, Validators.required],
      tiempoMaximoAtencion:[this.empresaANS.tiempoMaximoAtencion, Validators.required],
      usuarios:[this.empresaANS.usuarioNotificación, Validators.required]
    })
  }   
  
  
  ngOnInit(): void {
    
  }
  LoadData() {
  
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void{    
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

      })

    }else{
      if(this.ansForm.value.servicio !== this.data.tipoServicio){
        this.data.tipoServicio=this.ansForm.value.servicio;
        this.departmentService.updateDepartment(this.data).subscribe(res =>{
          
        })      

      }
      this.empresaANS.idEmpresa = this.data.id;
      this.empresaANS.idTipoIncidencia =this.ansForm.value.servicio;
      this.empresaANS.tiempoMaximoAtencion = Number(this.ansForm.value.tiempoMaximoAtencion);
      this.empresaANS.usuarioNotificación = this.ansForm.value.usuarios;
      ////////////console.log("insert",this.empresaANS)
      this.seguridadService.insertEmpresaANS(this.empresaANS).subscribe(res=>{

      })
    }

  }
 
}