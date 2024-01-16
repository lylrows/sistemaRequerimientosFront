import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  authForm: UntypedFormGroup;
  validaForm : UntypedFormGroup;
  actualizaForm : UntypedFormGroup;
  submitted = false;
  returnUrl: string;
  boolRestablece:boolean=false;
  boolValidaCodigo:boolean=false;
  boolContrasenia:boolean=false
  email: string ='';
  tipoInput:any ='password'
  title:string='';
  icon:any='warning';
  showCloseButton:boolean=true;
  showCancelButton:boolean=false;
  text:string='';
  confirmButtonText:string='<i class="fa fa-cog fa-fw"></i> Ok!';
  confirmButtonAriaLabel:string='Confirmado!'
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
    this.validaForm= this.formBuilder.group({
      codigo: [
        '',
        [Validators.required,  Validators.minLength(5)],
      ],
    }); 
    this.actualizaForm = this.formBuilder.group({
      contrasenia: [
        '',
        [Validators.required,  Validators.minLength(5)],
      ],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      this.authService.generadorCodigo(this.authForm.value.email).subscribe(res =>{
        if(res.objModel.fueExitoso){
          this.boolRestablece = true;
          this.boolValidaCodigo = true;
          ////////////console.log("authForm", this.authForm.value)
          this.email = this.authForm.value.email;
        }else{
          this.title='Error';
          this.text='Ha ocurrido un error con el envío de correo, verifique e intente nuevamente';
          this.icon='error';
          this.showAlert();
          return;
        }
      })
      

      //this.router.navigate(['/tableros/dashborad']);
    }
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
  onSubmitValida(){
    let codigo = this.validaForm.value.codigo;
    this.authService.validarCodigo(codigo, this.email).subscribe(res =>{
      if(res.objModel){
        this.boolValidaCodigo = false;
        this.boolContrasenia = true;
      }else{
        this.title='Error';
        this.text='El código ingresado no es correcto, verifique e intente nuevamente';
        this.icon='error';
        this.showAlert();
        return;
      }
    })
  }
  onSubmitActualiza(){
    let contrasenia = this.actualizaForm.value.contrasenia
    this.authService.actualizaContrasenia(contrasenia, this.email).subscribe(res =>{
      if(res.objModel){
        this.title='Éxito';
        this.text='Su contrasela fué actualizada con éxito';
        this.icon='success';
        this.showAlert();
        this.router.navigate(['/inicio/login']);
      }
    })
    ////////////console.log("actualizaForm", this.actualizaForm.value)
    
  }
  changueInput(){
    if(this.tipoInput == 'password'){
      this,this.tipoInput = 'text';
    }else{
      this,this.tipoInput = 'password';
    }
  }
}
