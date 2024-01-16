import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CredencialesUsuaroBE } from '../../system-models/credenciales'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  idPerfil: number = 1;
  credenciales : CredencialesUsuaroBE = {
    usuario: '',
    contrasenia: '',
    idPerfil: 0
  };
  title:string='';
  icon:any='warning';
  showCloseButton:boolean=true;
  showCancelButton:boolean=false;
  text:string='';
  confirmButtonText:string='<i class="fa fa-thumbs-up"></i> Ok!';
  confirmButtonAriaLabel:string='Confirmado!'
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {    
    this.authForm = this.formBuilder.group({
      username: ['admin@efitec.pe', Validators.required],
      password: ['admin@123', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.idPerfil =1;
    this.authForm.get('username').setValue('admin@efitec.pe');
    this.authForm.get('password').setValue('admin@123');
  }
  teacherSet() {
    this.idPerfil =2;
    this.authForm.get('username').setValue('cliente@efitec.pe');
    this.authForm.get('password').setValue('cliente@123');
  }
  studentSet() {
    this.idPerfil =3;
    this.authForm.get('username').setValue('soporte@efitec.pe');
    this.authForm.get('password').setValue('soporte@123');
  }
  onSubmit() {
    this.credenciales.usuario = this.f.username.value;
    this.credenciales.contrasenia = this.f.password.value;
    this.credenciales.idPerfil = this.idPerfil;
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Nombre de usuario y contraseña no válidos!';
      return;
    } else {
      this.subs.sink = this.authService
        .login(this.credenciales)
        .subscribe(
          (res) => {
            if (res.objModel.id >0) {
              //////////////console.log("res",res)
              setTimeout(() => {
                const role = this.authService.currentUserValue.role;
                if (role === Role.All || role === Role.Admin) {
                  this.router.navigate(['/admin/tableros/dashboard']);
                } else if (role === Role.Cliente) {
                  this.router.navigate(['/cliente/dashboard']);
                } else if (role === Role.Soporte) {
                  this.router.navigate(['/soporte/dashboard']);
                } else {
                  this.router.navigate(['/inicio/login']);
                }
                //this.loading = false;
              }, 1000);
            } else {
              this.prepareAlert(res);
              this.loading = false;
              this.error = 'Login no válido';
            }
          },
          (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          }
        );
    }
  }
  prepareAlert(res: any) {
    //////////////console.log("id",res)
    switch (res.objModel.id) {
      case -1:
        {
          this.title='Bloqueado';
          this.text='Ha superado el número de intentos fallidos, comuniquese con mesa de ayuda';
          this.icon='error';
        }
      break;
      case -2:
          {
            this.title='Fallido';
            this.text='Usuario ó contraseña incorrecta, le quedan: '+ (5 - res.objModel.intentosFallidos) +' intentos.';
            this.icon='error';
          }
      break;
      case -3:
        {
          this.title='No Encontrado';
          this.text='Usuario no se encuentra registrado, comníquese con mesa de ayuda.';
          this.icon='warning';
        }
      break;
      case -4:
        {
          this.title='Bloqueo';
          this.text='El número de intentos ha sido superado, se ha bloqueado su usuario, comníquese con mesa de ayuda.';
          this.icon='error';         
        }
      break;
    
      default:
        break;
    }
    this.showAlert();
  }
  showAlert() {
    Swal.fire({
      title:this.title,
      icon:this.icon,
      text:this.text,
      showCloseButton:this.showCloseButton,
      confirmButtonText:this.confirmButtonText,
      confirmButtonAriaLabel:this.confirmButtonAriaLabel
    });
  }
}
