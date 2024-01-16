import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { menu } from 'src/app/system-models/perfiles';
import { SeguridadService } from '../../seguridad.service';


@Component({
  selector: 'app-form-dialog-perfiles',
  templateUrl: './form-dialog-perfiles.component.html',
  styleUrls: ['./form-dialog-perfiles.component.sass']
})
export class FormDialogPerfilesComponent implements OnInit {
  dialogTitle: string;
  accion: string;
  _menu : menu;
  menuForm: FormGroup;
  Perfiles: any;
  constructor(public dialogRef: MatDialogRef<FormDialogPerfilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private seguridadService : SeguridadService,) {
      this.accion = data.accion;
      if (this.accion === 'editar') {
        this.dialogTitle = 'Menu: '+data.menu.title 
        +' - '+data.menu.moduleName ;
        this._menu = data.menu;
      } else {
        this.dialogTitle = 'Nuevo Perfil';
        this._menu = { 
          id: 0,
          path: "",
          title: "",
          moduleName: "",
          iconType: "",
          icon: "",
          class: "",
          groupTitle: 1,
          badge: null,
          badgeClass: null,
          rol: "",
          parentField: 1,
          isSubMenu: null,
          idRole: 1,
          esActivo: 1
        };
      }
      this.menuForm = this.createContactForm();
   }
   createContactForm(): FormGroup<any> {
    return this.fb.group({
      id : [this._menu.id],
      path : [this._menu.path],
      title : [this._menu.title],
      moduleName : [this._menu.moduleName],
      iconType : [this._menu.iconType],
      icon : [this._menu.icon],
      class : [this._menu.class],
      groupTitle : [this._menu.groupTitle, [Validators.required]],
      badge: [this._menu.badge],
      badgeClass: [this._menu.badgeClass],
      rol : [this._menu.rol],
      parentField: [this._menu.parentField], 
      isSubMenu: [this._menu.isSubMenu, [Validators.required]],
      idRole: [this._menu.idRole, [Validators.required]],
      esActivo : [this._menu.esActivo, [Validators.required]],
    })
  }
  ngOnInit(): void {
    this.LoadPerfiles();
    ////////////console.log("data: ", this.data)
  }
  LoadPerfiles() {
    this.seguridadService.getParameterDetails(2).subscribe(res =>{
      this.Perfiles = res;
    })
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    ////////////console.log("par: ",this.menuForm.getRawValue());
    let menu :menu= this.menuForm.getRawValue();
    menu.esActivo = Number(this.menuForm.getRawValue().esActivo)
    ////////////console.log("dudas: ",this.menuForm.getRawValue());
     if(this.accion == 'editar'){
       this.seguridadService.updatePerfiles(menu).subscribe(res =>{
         this.onNoClick();
       })
     }else{
       this.seguridadService.insertPerfiles(menu).subscribe(res =>{
         this.onNoClick();
       })
     }
    

  }
}
